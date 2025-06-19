
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from 'lucide-react';
import { MonthlyPnLData } from './types';

interface MonthlyPnLHeatmapProps {
  monthlyPnL: MonthlyPnLData[];
}

const MonthlyPnLHeatmap = ({ monthlyPnL }: MonthlyPnLHeatmapProps) => {
  const getPnLCellColor = (value: number) => {
    if (value > 3) return 'bg-green-600/30 text-green-300';
    if (value > 1) return 'bg-green-500/20 text-green-400';
    if (value > 0) return 'bg-green-400/10 text-green-500';
    if (value > -1) return 'bg-red-400/10 text-red-500';
    if (value > -2) return 'bg-red-500/20 text-red-400';
    return 'bg-red-600/30 text-red-300';
  };

  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700 mb-8">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Calendar className="mr-2" />
        Monthly P&L Heatmap
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Year</TableHead>
              <TableHead className="text-gray-300">Jan</TableHead>
              <TableHead className="text-gray-300">Feb</TableHead>
              <TableHead className="text-gray-300">Mar</TableHead>
              <TableHead className="text-gray-300">Apr</TableHead>
              <TableHead className="text-gray-300">May</TableHead>
              <TableHead className="text-gray-300">Jun</TableHead>
              <TableHead className="text-gray-300">Jul</TableHead>
              <TableHead className="text-gray-300">Aug</TableHead>
              <TableHead className="text-gray-300">Sep</TableHead>
              <TableHead className="text-gray-300">Oct</TableHead>
              <TableHead className="text-gray-300">Nov</TableHead>
              <TableHead className="text-gray-300">Dec</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyPnL.map((yearData) => (
              <TableRow key={yearData.year}>
                <TableCell className="font-medium text-white">{yearData.year}</TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Jan)}`}>
                  {yearData.Jan > 0 ? '+' : ''}{yearData.Jan}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Feb)}`}>
                  {yearData.Feb > 0 ? '+' : ''}{yearData.Feb}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Mar)}`}>
                  {yearData.Mar > 0 ? '+' : ''}{yearData.Mar}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Apr)}`}>
                  {yearData.Apr > 0 ? '+' : ''}{yearData.Apr}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.May)}`}>
                  {yearData.May > 0 ? '+' : ''}{yearData.May}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Jun)}`}>
                  {yearData.Jun > 0 ? '+' : ''}{yearData.Jun}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Jul)}`}>
                  {yearData.Jul > 0 ? '+' : ''}{yearData.Jul}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Aug)}`}>
                  {yearData.Aug > 0 ? '+' : ''}{yearData.Aug}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Sep)}`}>
                  {yearData.Sep > 0 ? '+' : ''}{yearData.Sep}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Oct)}`}>
                  {yearData.Oct > 0 ? '+' : ''}{yearData.Oct}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Nov)}`}>
                  {yearData.Nov > 0 ? '+' : ''}{yearData.Nov}%
                </TableCell>
                <TableCell className={`text-center font-medium ${getPnLCellColor(yearData.Dec)}`}>
                  {yearData.Dec > 0 ? '+' : ''}{yearData.Dec}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default MonthlyPnLHeatmap;
