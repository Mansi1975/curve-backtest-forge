
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Activity, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const KeyMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Return</p>
            <p className="text-2xl font-bold text-emerald-400">+42.3%</p>
            <p className="text-sm text-emerald-400 flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +5.2% this month
            </p>
          </div>
          <TrendingUp className="text-emerald-400" size={32} />
        </div>
      </Card>
      
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Portfolio Value</p>
            <p className="text-2xl font-bold text-white">₹1,42,470</p>
            <p className="text-sm text-green-400 flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +₹42,470
            </p>
          </div>
          <DollarSign className="text-green-400" size={32} />
        </div>
      </Card>
      
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Sharpe Ratio</p>
            <p className="text-2xl font-bold text-blue-400">2.14</p>
            <p className="text-sm text-blue-400 flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              Excellent
            </p>
          </div>
          <Target className="text-blue-400" size={32} />
        </div>
      </Card>
      
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Max Drawdown</p>
            <p className="text-2xl font-bold text-red-400">-8.4%</p>
            <p className="text-sm text-red-400 flex items-center">
              <ArrowDownRight size={16} className="mr-1" />
              Within limits
            </p>
          </div>
          <Activity className="text-red-400" size={32} />
        </div>
      </Card>
    </div>
  );
};

export default KeyMetricsCards;
