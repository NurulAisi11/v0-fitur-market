'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import AiRecommendations from '@/components/ai-recommendations';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow">
        <section className="bg-card py-12 sm:py-16 border-b">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                    Find Your Next Favorite Thing
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:mt-6">
                    Discover a curated selection of high-quality products, from tech gadgets to home decor.
                </p>
            </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-8 sm:py-12">
            <AiRecommendations />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8 sm:py-12">
            <ProductGrid searchTerm={searchTerm} />
        </div>
      </main>
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TradeFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
