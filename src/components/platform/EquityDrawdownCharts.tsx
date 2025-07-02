'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Papa from 'papaparse';

interface EquityDataPoint {
  date: string;
  equity: number;
  returns: number;
  drawdown: number;
  benchmark?: number; // optional
}

const EquityDrawdownCharts = () => {
  const [equityData, setEquityData] = useState<EquityDataPoint[]>([]);

  useEffect(() => {
    fetch('/api/portfolio_summary')
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        const data = parsed.data as EquityDataPoint[];
        setEquityData(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Equity Curve</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={equityData}>
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="equity"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#equityGradient)"
              name="Portfolio Value"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#6b7280"
              strokeWidth={1}
              strokeDasharray="5 5"
              name="Benchmark"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Drawdown Curve</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={equityData}>
            <defs>
              <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#drawdownGradient)"
              name="Drawdown %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default EquityDrawdownCharts;
