// /app/products/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams for dynamic routing
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams(); // Accessing params to get dynamic `id`
  const { addToCart } = useCart();

  const productId = params?.id; // Getting the product id from URL params

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          );
          const data = await response.json();
          setProduct(data);
          setLoading(false); // Stop loading once data is fetched
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false); // Stop loading on error
        }
      }
    };

    fetchProduct();
  }, [productId]); // Re-fetch if the `id` changes

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-lg text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain rounded-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-primary">
            {product.title}
          </h1>
          <p className="text-lg font-bold mt-2 text-primary">
            ${product.price}
          </p>
          <p className="text-primary mt-4">{product.description}</p>
          <div className="mt-6 flex gap-4">
            <Button
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
            </Button>
            <Link href="/products">
              <button className="px-6 py-2 bg-secondary text-primary rounded hover:bg-secondary-dark transition-colors">
                Back to Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
