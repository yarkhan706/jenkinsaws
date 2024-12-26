"use client";

import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <div className="text-center text-xl">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded-lg"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Cart
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Checkout
        </button>
      </div>
    </div>
  );
}
