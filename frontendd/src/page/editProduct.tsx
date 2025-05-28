import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api/product";

interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${id}`)
      .then((res) => {
        // Sesuaikan dengan struktur response dari backend (biasanya data ada di res.data.data)
        const data = res.data.data ?? res.data;
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data produk");
        setLoading(false);
      });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? Number(value) // pastikan tipe number untuk price dan stock
          : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/${id}`, product)
      .then(() => {
        alert("Produk berhasil diupdate");
        navigate("/"); // arahkan ke halaman utama setelah berhasil update
      })
      .catch(() => {
        alert("Gagal mengupdate produk");
      });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
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
        URL Gambar
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Produk
      </button>
    </form>
  );
}
