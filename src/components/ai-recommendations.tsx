'use client';

import { getPersonalizedRecommendations, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-product-recommendations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

function AiRecommendations() {
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const result = await getPersonalizedRecommendations({
          userHistory: 'viewed office chairs, searched for ergonomic furniture and 4k monitors',
        });
        setRecommendations(result);
      } catch (error) {
        console.error('Failed to fetch AI recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16">
        <div className="space-y-4 mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-1 w-full md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-9 w-32" />
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!recommendations || recommendations.products.length === 0) {
    return null; // Don't render anything if there are no recommendations
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Just For You</h2>
        <p className="text-muted-foreground">
          AI-powered recommendations based on your activity.
        </p>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendations.products.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint="ai generated"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold mb-1">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                    {/* In a real app, this button would be a client component using the cart context */}
                    <Button size="sm" disabled> 
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default AiRecommendations;
