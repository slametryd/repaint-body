import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const ProductForm = () => {
  const [judul, setJudul] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("picture", picture);

    try {
      await axios.post("http://localhost:5000/api/produk", formData);
      alert("Produk berhasil disimpan!");
      setJudul("");
      setHarga("");
      setDeskripsi("");
      setPicture(null);
      setPreview(null);
    } catch (err) {
      alert("Gagal menyimpan produk");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Konten Utama */}
      <div className="flex-grow">
        <div>
          <h1 className="font-extrabold text-5xl">Admin Form</h1>
        </div>
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Tambah Produk</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Judul Produk"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Harga"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-auto mt-2 rounded border"
              />
            )}
            <button
              type="submit"
              className="bg-[#FD1E0D] text-white px-4 py-2 rounded hover:bg-[#ED1100]"
            >
              Simpan Produk
            </button>
          </form>
        </div>
      </div>

      {/* Footer tetap di bawah */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductForm;
