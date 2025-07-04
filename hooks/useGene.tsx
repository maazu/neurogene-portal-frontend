import { useQuery } from '@tanstack/react-query';

// Your public-facing type
export interface GeneDetails {
  id: string;
  symbol: string;
  name: string;
}

// Internal type matching exactly what the API returns
interface RawGene {
  id: number;
  symbol: string;
  name: string;
}

interface GeneApiResponse {
  results: RawGene[];
  total: number;
}

export const useGene = (symbol: string) => {
  return useQuery<GeneDetails, Error>({
    queryKey: ['gene-details', symbol],
    queryFn: async () => {
      if (!symbol) {
        // shouldn't ever run due to `enabled`, but just in case
        throw new Error('No gene symbol provided');
      }

      const res = await fetch(
        `https://api.neurogenesai.com/api/gene-engine/gene/?symbol=${encodeURIComponent(
          symbol
        )}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch gene details for symbol "${symbol}"`);
      }

      // first, parse into the raw shape:
      const data = (await res.json()) as GeneApiResponse;

      // handle empty:
      if (data.total === 0 || data.results.length === 0) {
        throw new Error(`No gene found for symbol "${symbol}"`);
      }

      return data.results[0];
    },
    enabled: Boolean(symbol),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
