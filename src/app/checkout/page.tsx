'use client';

import { CheckoutForm } from "@/components/checkout-form";
import { OrderSummary } from "@/components/order-summary";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Logo } from "@/components/logo";

export default function CheckoutPage() {
    const { cartCount } = useCart();

    if (cartCount === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                 <header className="border-b">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                        <Logo />
                    </div>
                </header>
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                    <ShoppingCart className="h-24 w-24 text-muted-foreground" />
                    <h1 className="mt-6 text-3xl font-bold">Your cart is empty</h1>
                    <p className="mt-2 text-muted-foreground">
                        You need to add items to your cart before you can check out.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        );
    }
  return (
    <div className="min-h-screen">
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Logo />
            </div>
        </header>
        <main className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <CheckoutForm />
                </div>
                <div>
                    <OrderSummary />
                </div>
            </div>
        </main>
    </div>
  );
}
