import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, uploadImage, type CreateProductInput } from "../lib/api";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateProductInput>({
    name: "",
    price: 0,
    stock: undefined,
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = form.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        imageUrl = await uploadImage(formData); // fungsi ini mengembalikan URL dari server
      }

      const newProduct: CreateProductInput = {
        ...form,
        image: imageUrl,
      };

      await createProduct(newProduct);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Gagal menyimpan produk, coba lagi.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk Baru</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Harga"
          value={form.price || ""}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
          min={0}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stok"
          value={form.stock || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min={0}
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div>
          <label className="block mb-1 font-semibold">Upload Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>
    </div>
  );
}
