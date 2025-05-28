import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct, type Product } from "../lib/api";

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await deleteProduct(id);
      // refresh data setelah delete berhasil
      await loadProducts();
    } catch {
      alert("Gagal menghapus produk");
    }
  }

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Price (IDR)</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Stock</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Image</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(({ id, name, price, stock, description, image }) => (
            <tr key={id} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{id}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{name}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{stock}</td>
              <td className="px-4 py-2 text-sm text-gray-700 max-w-xs">{description}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <img src={image ?? ""} alt={name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td>
                <div className="px-4 py-2 whitespace-nowrap flex flex-row gap-1">
                  <button onClick={() => handleDelete(id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                  <a href={`/edit/${id}`}>
                    <button className="text-green-600 hover:underline">Edit</button>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <a href="/create">
          <button className="p-2 bg-red-300 rounded-xl">Create</button>
        </a>
      </div>
    </div>
  );
}
