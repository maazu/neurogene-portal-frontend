import { useQuery } from '@tanstack/react-query';

// Types for API response
interface GenePlotPoint {
  log2_age: number;
  log2_cpm: number;
}
interface GenePlotLoess {
  age_log2: number;
  smoothed: number;
  upper: number;
  lower: number;
}
interface GenePlotResponse {
  points: GenePlotPoint[];
  loess: GenePlotLoess[];
  gene_symbol: string;
  ensembl_id: string;
}

export const useGenePlot = (symbol: string) => {
  return useQuery<GenePlotResponse, Error>({
    queryKey: ['genePlot', symbol],
    queryFn: async () => {
      const res = await fetch(
        `https://api.neurogenesai.com/api/gene-engine/gene-plot/?format=json&symbol=${encodeURIComponent(
          symbol
        )}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch plot for gene ${symbol}`);
      }
      return res.json();
    },
    enabled: Boolean(symbol),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
