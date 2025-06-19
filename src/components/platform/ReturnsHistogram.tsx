
import { Card } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { ReturnsDataPoint } from './types';

interface ReturnsHistogramProps {
  returnsHistogram: ReturnsDataPoint[];
}

const ReturnsHistogram = ({ returnsHistogram }: ReturnsHistogramProps) => {
  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700 mb-8">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <BarChart3 className="mr-2" />
        Histogram of Returns
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={returnsHistogram}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="return" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px'
            }} 
          />
          <Bar dataKey="frequency" fill="#3b82f6" name="Frequency" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ReturnsHistogram;
