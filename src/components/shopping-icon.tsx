import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ShoppingIcon() {
  return (
    <Link href={"/cart"}>
      <ShoppingBag />
    </Link>
  );
}
