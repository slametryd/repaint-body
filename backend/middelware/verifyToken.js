import JWT from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Token tidak ditemukan atau format salah" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Simpan semua payload: userId, name, email
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Token tidak valid atau kadaluarsa" });
  }
};
