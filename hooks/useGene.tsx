import { useQuery, UseQueryOptions } from '@tanstack/react-query';

/**
 * Shape of the gene details returned by the API.
 */
export interface GeneDetails {
  id: string;
  symbol: string;
  name: string;
}

/**
 * Fetch function to retrieve gene details by symbol.
 */
const fetchGeneDetails = async (symbol: string): Promise<GeneDetails> => {
  if (!symbol) {
    throw new Error('Gene symbol is required');
  }

  const res = await fetch(
    `https://api.neurogenesai.com/api/gene-engine/gene/?symbol=${encodeURIComponent(
      symbol
    )}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch details for gene: ${symbol}`);
  }

  const response = await res.json();
  const gene = response.results?.[0];
  if (!gene) throw new Error(`Gene not found: ${symbol}`);

  return gene;
};

/**
 * Custom React Query hook for fetching gene details by symbol.
 *
 * @param symbol The gene symbol (e.g. "SCN2A").
 * @param options Optional React Query configuration.
 * @returns React Query result including data, status, and error.
 */
export function useGene(
  symbol: string,
  options?: UseQueryOptions<GeneDetails, Error>
) {
  return useQuery<GeneDetails, Error>({
    queryKey: ['gene', symbol], // unique query key
    queryFn: () => fetchGeneDetails(symbol), // fetcher function
    enabled: Boolean(symbol), // only run if symbol is truthy
    staleTime: 1000 * 60 * 5, // cache data for 5 minutes
    retry: 1, // retry once on failure
    ...options,
  });
}
