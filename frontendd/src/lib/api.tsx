import axios from "axios";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock?: number | null;
  description?: string | null;
  image?: string | null;
}

const API_URL = "http://127.0.0.1:8000/api/product";

// GET all products
export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

// GET product by ID
export async function fetchProduct(id: number): Promise<Product> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

// Interface untuk input tanpa ID (digunakan saat create)
export interface CreateProductInput {
  name: string;
  price: number;
  stock?: number | null;
  description?: string | null;
  image?: string | null;
}

// POST create new product
export async function createProduct(product: FormData): Promise<Product> {
  const response = await axios.post(API_URL, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

// PUT update product by ID
export async function updateProduct(
  id: number,
  product: Partial<Omit<Product, "id">>
): Promise<Product> {
  const response = await axios.post(`${API_URL}/${id}?_method=PUT`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

// DELETE product by ID
export async function deleteProduct(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}

// ✅ Upload image menggunakan axios
export async function uploadImage(formData: FormData): Promise<string> {
  const response = await axios.post("http://127.0.0.1:8000/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.url; // Pastikan backend mengembalikan { url: "..." }
}
