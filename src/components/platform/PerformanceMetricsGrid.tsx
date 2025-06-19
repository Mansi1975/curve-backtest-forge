
import { Card } from '@/components/ui/card';
import { PerformanceMetric } from './types';

interface PerformanceMetricsGridProps {
  performanceMetrics: PerformanceMetric[];
}

const PerformanceMetricsGrid = ({ performanceMetrics }: PerformanceMetricsGridProps) => {
  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6">Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric) => (
          <div key={metric.metric} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium text-gray-300">{metric.metric}</h4>
              <span className={`text-lg font-bold ${
                metric.value.includes('-') ? 'text-red-400' : 
                metric.value.includes('+') || parseFloat(metric.value) > 0 ? 'text-green-400' : 
                'text-white'
              }`}>
                {metric.value}
              </span>
            </div>
            <p className="text-xs text-gray-400">{metric.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PerformanceMetricsGrid;
