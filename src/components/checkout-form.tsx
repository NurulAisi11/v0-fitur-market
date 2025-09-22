'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CreditCard, User, Mail, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Card number must be 16 digits.' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Use MM/YY format.' }),
  cvc: z.string().regex(/^\d{3}$/, { message: 'CVC must be 3 digits.' }),
});

export function CheckoutForm() {
  const { clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitting order:', values);
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    clearCart();
    router.push('/');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Information</h3>
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="John Doe" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="you@example.com" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="123 Main St, Anytown, USA" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Details (Mock)</h3>
                <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="**** **** **** ****" {...field} className="pl-10" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Expiry</FormLabel>
                        <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                        <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
            </div>
            
            <Button type="submit" className="w-full text-lg py-6">
              Pay Now
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
