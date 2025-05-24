import Users from "../models/UserModels.js";
import admin from "../controllers/firebaseAdmin.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { configDotenv } from "dotenv";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"], // Tidak mengirim password dan token
    });
    res.json(users);
  } catch (error) {
    console.error("Error saat getUsers:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data user" });
  }
};

export const Register = async (req, res) => {
  console.log("BODY YANG DITERIMA:", req.body);
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: `Password tidak cocok dengan confirm password` });

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register berhasil" });
  } catch (error) {
    console.error("Error saat register:", error);
    res.status(500).json({ msg: "Gagal melakukan registrasi" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email dan password wajib diisi" });

    const user = await Users.findOne({
      where: { email: email },
    });

    if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });

    if (!user.password)
      return res
        .status(500)
        .json({ msg: "User tidak memiliki password tersimpan" });
    console.log("Password dari input:", password);
    console.log("Password dari DB:", user.password);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const userId = user.id;
    const name = user.name;

    const accessToken = JWT.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    const refreshToken = JWT.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: userId } }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(500).json({ msg: "Gagal login" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204); // Jika tidak ada refresh token

    console.log("Refresh Token:", refreshToken);

    // Cari user berdasarkan refresh token
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      console.log("User dengan refresh token tidak ditemukan");
      return res.sendStatus(204); // Tidak ada user dengan refresh token ini
    }

    // Clear refresh token di database
    await Users.update({ refresh_token: null }, { where: { id: user.id } });

    // Hapus refresh token di cookie
    res.clearCookie("refreshToken");
    return res.sendStatus(200); // Berhasil logout
  } catch (error) {
    console.error("Error saat logout:", error);
    return res.status(500).json({ msg: "Gagal logout" });
  }
};

// GOOlGLE login

export const googleLogin = async (req, res) => {
  const { token } = req.body; // Ambil token dari body request

  if (!token) {
    return res.status(400).json({ msg: "Token is required" }); // Pastikan token ada
  }

  try {
    // Verifikasi ID token menggunakan Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    const { name, email, picture } = decodedToken;

    // Cari atau buat user di database kamu
    let user = await Users.findOne({ where: { email } });

    if (!user) {
      // Jika user tidak ditemukan, buat user baru
      user = await Users.create({
        name,
        email,
        avatar: picture, // Simpan avatar dari Firebase
        password: "", // Kosongkan password karena menggunakan Google login
      });
    }

    // Kirim response ke frontend
    res.status(200).json({ msg: "Login Google berhasil", user });
  } catch (error) {
    console.error("Google login gagal:", error);
    res.status(500).json({ msg: "Gagal login dengan Google" });
  }
};
