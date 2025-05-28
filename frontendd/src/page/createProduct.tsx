import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api/product";

interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
}

export default function CreateProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price.toString());
      formData.append("stock", product.stock.toString());
      formData.append("description", product.description || "");

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Axios POST request langsung di sini
      await axios.post(BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Produk berhasil dibuat");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Gagal membuat produk, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <label className="block mb-2">
        Nama Produk
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Harga (IDR)
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          min={0}
          required
        />
      </label>

      <label className="block mb-2">
        Stok
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          min={0}
          required
        />
      </label>

      <label className="block mb-2">
        Deskripsi
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          rows={4}
        />
      </label>

      <label className="block mb-4">
        Upload Gambar
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full rounded"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Menyimpan..." : "Simpan Produk"}
      </button>
    </form>
  );
}
