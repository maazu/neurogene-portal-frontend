'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useGenePlot } from '@/hooks/useGenePlot';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Dynamically import Plotly to avoid SSR issues
import type { PlotParams } from 'react-plotly.js';

const Plot = dynamic<PlotParams>(() => import('react-plotly.js'), {
  ssr: false,
});

export default function GeneExpressionPlot(symbolProp: { symbol?: string }) {
  const [symbol] = useState(symbolProp.symbol ?? '');
  const { data, isFetching, error } = useGenePlot(symbol);

  // Build traces
  // Build traces
  const traces = React.useMemo(() => {
    if (!data) return [];
    const rawX = data.points.map((p) => p.log2_age);
    const rawY = data.points.map((p) => p.log2_cpm);
    const loessX = data.loess.map((p) => p.age_log2);
    const loessY = data.loess.map((p) => p.smoothed);
    const upperY = data.loess.map((p) => p.upper);
    const lowerY = [...data.loess.map((p) => p.lower)].reverse();
    const xFilled = [...loessX, ...[...loessX].reverse()];
    const yFilled = [...upperY, ...lowerY];

    return [
      {
        x: xFilled,
        y: yFilled,
        fill: 'toself',
        fillcolor: 'rgba(100,100,100,0.3)',
        line: { color: 'transparent' },
        name: '95% CI',
        hoverinfo: 'skip',
        type: 'scatter' as const,
      },
      {
        x: loessX,
        y: loessY,
        mode: 'lines',
        name: 'LOESS',
        line: { color: 'blue', width: 2 },
        type: 'scatter' as const,
      },
      {
        x: rawX,
        y: rawY,
        mode: 'markers',
        name: 'Raw Data',
        marker: { color: 'red', size: 6 },
        type: 'scatter' as const,
      },
    ];
  }, [data]);

  // Build layout with explicit title objects
  const layout = React.useMemo(() => {
    if (!data) return {};

    const periods = [
      { label: 'P1', week: 8, stage: '8w' },
      { label: 'P2', week: 10, stage: '10w' },
      { label: 'P3', week: 13, stage: '13w' },
      { label: 'P4', week: 16, stage: '16w' },
      { label: 'P5', week: 19, stage: '19w' },
      { label: 'P6', week: 24, stage: '24w' },
      { label: 'P7', week: 40, stage: 'Birth' },
      { label: 'P8', week: 66, stage: '6m' },
      { label: 'P9', week: 92, stage: '1y' },
      { label: 'P10', week: 394, stage: '6y' },
      { label: 'P11', week: 677, stage: '12y' },
    ];

    const shapes = periods.map((p) => {
      const x = Math.log2(p.week * 7);
      return {
        type: 'line',
        x0: x,
        x1: x,
        yref: 'paper',
        y0: 0,
        y1: 1,
        line: {
          width: p.label === 'P7' ? 2 : 1,
          dash: p.label === 'P7' ? 'solid' : 'dot',
        },
      };
    });

    const annotations = periods.flatMap((p) => {
      const x = Math.log2(p.week * 7);
      return [
        {
          x,
          y: 0,
          xref: 'x',
          yref: 'paper',
          text: p.label,
          yanchor: 'top',
          showarrow: false,
          font: { size: 11 },
        },
        {
          x,
          y: -0.05,
          xref: 'x',
          yref: 'paper',
          text: p.stage,
          yanchor: 'top',
          showarrow: false,
          font: { size: 10 },
        },
      ];
    });
    return {
      title: {
        text: `Gene: ${data.ensembl_id}, Symbol: ${data.gene_symbol} log2CPM`,
        x: 0.5,
        y: 0.95,
        font: { size: 16 },
      },
      xaxis: {
        title: { text: 'Developmental stage (log-scaled)' },
        zeroline: false,
      },
      yaxis: { title: { text: 'Gene expression, log2(CPM+1)' } },
      shapes,
      annotations,
      margin: { t: 100, b: 80, l: 100, r: 40 },
      showlegend: false,
    };
  }, [data]);

  return (
    <main className='my-4 w-full'>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          {isFetching && <p>Loading...</p>}
          {error && <p className='text-red-600'>{error.message}</p>}
          {data && (
            <Plot
              data={traces}
              layout={layout}
              useResizeHandler
              style={{ width: '100%', height: '700px' }}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
