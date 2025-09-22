'use client';

import { useCart } from '@/context/cart-context';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export function OrderSummary() {
  const { cartItems, cartTotal } = useCart();

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-md"
                    data-ai-hint={item.imageHint}
                />
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            ))}
        </div>
        <Separator />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Taxes</span>
          <span>Calculated at next step</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
