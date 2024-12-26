"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Set the products data to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6 text-primary">Products</h1>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg bg-card hover:bg-card-hover transition-all"
            >
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-contain rounded-md mb-4"
                />
              </Link>
              <h2 className="text-xl font-semibold text-primary">
                {product.title}
              </h2>
              <p className="text-lg font-bold mt-2 text-primary">
                ${product.price}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="px-4 py-2 bg-primary text-secondary rounded hover:bg-primary-dark transition-colors"
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    });
                  }}
                >
                  Add to Cart
                </button>
                <Link href={`/products/${product.id}`}>
                  <button className="px-4 py-2 bg-secondary text-primary rounded hover:bg-secondary-dark transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
