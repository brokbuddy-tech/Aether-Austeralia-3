'use server';
/**
 * @fileOverview An AI agent that parses natural language property search queries into structured data.
 *
 * - aiPoweredPropertySearch - A function that handles the AI-powered property search process.
 * - AiPoweredPropertySearchInput - The input type for the aiPoweredPropertySearch function.
 * - AiPoweredPropertySearchOutput - The return type for the aiPoweredPropertySearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredPropertySearchInputSchema = z.object({
  query: z.string().describe('The natural language query for property search, e.g., "Modern 3-bed home with a pool in Noosa".'),
});
export type AiPoweredPropertySearchInput = z.infer<typeof AiPoweredPropertySearchInputSchema>;

const AiPoweredPropertySearchOutputSchema = z.object({
  location: z.string().optional().describe('The geographical location extracted from the query.'),
  propertyType: z.string().optional().describe('The type of property, e.g., "house", "apartment", "land".'),
  bedrooms: z.number().int().optional().describe('The number of bedrooms requested.'),
  bathrooms: z.number().int().optional().describe('The number of bathrooms requested.'),
  parking: z.number().int().optional().describe('The number of parking spaces requested.'),
  minPrice: z.number().optional().describe('The minimum price for the property.'),
  maxPrice: z.number().optional().describe('The maximum price for the property.'),
  amenities: z.array(z.string()).optional().describe('A list of desired amenities, e.g., "pool", "garage", "balcony".'),
  keywords: z.array(z.string()).optional().describe('Additional keywords or styles, e.g., "modern", "hamptons".'),
});
export type AiPoweredPropertySearchOutput = z.infer<typeof AiPoweredPropertySearchOutputSchema>;

export async function aiPoweredPropertySearch(input: AiPoweredPropertySearchInput): Promise<AiPoweredPropertySearchOutput> {
  return aiPoweredPropertySearchFlow(input);
}

const propertySearchPrompt = ai.definePrompt({
  name: 'propertySearchPrompt',
  input: {schema: AiPoweredPropertySearchInputSchema},
  output: {schema: AiPoweredPropertySearchOutputSchema},
  prompt: `You are an AI assistant designed to extract structured property search criteria from natural language queries.
  Parse the following user query and output the relevant property search parameters in JSON format. If a parameter is not explicitly mentioned or clearly implied, omit it.
  Assume all monetary values are in AUD.

  User query: {{{query}}}`,
});

const aiPoweredPropertySearchFlow = ai.defineFlow(
  {
    name: 'aiPoweredPropertySearchFlow',
    inputSchema: AiPoweredPropertySearchInputSchema,
    outputSchema: AiPoweredPropertySearchOutputSchema,
  },
  async (input) => {
    const {output} = await propertySearchPrompt(input);
    return output!;
  }
);
