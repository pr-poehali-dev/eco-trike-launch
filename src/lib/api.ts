const API_URL = 'https://functions.poehali.dev/b75a8978-1f7c-4bd9-9ef6-be18a3632462';

export interface Product {
  id?: number;
  product_id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  in_stock: boolean;
  rating: number;
  reviews: number;
}

export const getProducts = async (category?: string): Promise<Product[]> => {
  const url = category ? `${API_URL}?category=${category}` : API_URL;
  const response = await fetch(url);
  return response.json();
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const response = await fetch(`${API_URL}?id=${id}`);
  if (!response.ok) return null;
  return response.json();
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return getProducts(category);
};
