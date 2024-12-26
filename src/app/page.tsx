import Link from "next/link";
import { Product } from "./products/[id]/page";

export const metadata = {
  title: "Home - E-Store",
};

export default async function Home() {
  // Fetch a few featured products (e.g., the first 4 from Fakestore API)
  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  const featuredProducts = await res.json();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-bg text-foreground flex justify-between items-center mx-5">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to E-Store</h1>
          <p className="text-lg mb-6">
            Shop the latest products at unbeatable prices.
          </p>
        </div>
        <div>
          <Link
            href="/products"
            className="inline-block bg-foreground text-secondary px-6 py-3 rounded shadow"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10">
        <h2 className="text-3xl font-bold mx-5 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product: Product) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-contain mb-4"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-primary">${product.price}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
