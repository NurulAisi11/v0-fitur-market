// src/ai/flows/personalized-product-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized product recommendations based on user browsing history and preferences.
 *
 * - getPersonalizedRecommendations - A function that returns product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userHistory: z
    .string()
    .describe('The user history of the current user, includes browsing history and preferences.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().describe('The product ID.'),
      name: z.string().describe('The product name.'),
      description: z.string().describe('A short product description.'),
      imageUrl: z.string().describe('URL of the product image.'),
      price: z.number().describe('The product price.'),
    })
  ).describe('A list of personalized product recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

const prompt = ai.definePrompt({
    name: 'personalizedRecommendationsPrompt',
    input: {schema: PersonalizedRecommendationsInputSchema},
    output: {schema: PersonalizedRecommendationsOutputSchema},
    system: `You are a product recommendation expert.

  Based on the user history, provide personalized product recommendations.
  If the user history is empty, recommend popular products.

  Consider product name, description, and price when creating the product recommendations.
  All images are publicly accessible via URL.
  `,
    prompt: `User History: {{{userHistory}}}

  Please generate 3 product recommendations.`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
    {
        name: 'personalizedRecommendationsFlow',
        inputSchema: PersonalizedRecommendationsInputSchema,
        outputSchema: PersonalizedRecommendationsOutputSchema,
    },
    async input => {
        const {output} = await prompt(input);
        return output!;
    }
);


export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return await personalizedRecommendationsFlow(input);
}
