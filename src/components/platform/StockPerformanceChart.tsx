
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { StockData } from './types';

interface StockPerformanceChartProps {
  stockData: StockData;
  availableStocks: string[];
}

const StockPerformanceChart = ({ stockData, availableStocks }: StockPerformanceChartProps) => {
  const [selectedStocks, setSelectedStocks] = useState(['AAPL', 'MSFT', 'GOOGL']);

  const getPositionColor = (position: string | null) => {
    if (position === 'buy') return '#10b981';
    if (position === 'sell') return '#ef4444';
    return 'transparent';
  };

  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-white">Individual Stock Performance</h3>
        <div className="flex flex-wrap gap-2">
          {availableStocks.map((stock) => (
            <div key={stock} className="flex items-center space-x-2">
              <Checkbox
                id={stock}
                checked={selectedStocks.includes(stock)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedStocks([...selectedStocks, stock]);
                  } else {
                    setSelectedStocks(selectedStocks.filter(s => s !== stock));
                  }
                }}
              />
              <label htmlFor={stock} className="text-sm text-gray-300">{stock}</label>
            </div>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px'
            }} 
          />
          {selectedStocks.map((stock, index) => {
            const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16', '#f97316'];
            return stockData[stock] ? (
              <Line
                key={stock}
                type="monotone"
                dataKey="value"
                data={stockData[stock]}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                name={stock}
                dot={(props: any) => {
                  const position = stockData[stock][props.index]?.position;
                  return position ? (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill={getPositionColor(position)}
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ) : null;
                }}
              />
            ) : null;
          })}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StockPerformanceChart;
