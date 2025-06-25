import React from 'react';
import { Button } from '@/components/ui/button';

// interface Settings {
//   region: string;
//   universe: string;
//   delay: number;
//   truncation: number;
// }
interface Settings {
  longEntry: string;
  longExit: string;
  shortEntry: string;
  shortExit: string;
  asset: number;
  target: number;
  commission: number;
  initialInvestment: number;
  timeFrame: number;
  selectedStocks: string[];
}

interface SettingsFormProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onClose: () => void;
}



const SettingsForm: React.FC<SettingsFormProps> = ({ settings, setSettings, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      {/* <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-xl shadow-lg border border-gray-700"> */}
      <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-xl shadow-lg border border-gray-700 max-h-[90vh] overflow-y-auto">

        <h3 className="text-lg text-white font-semibold mb-4">Simulation Settings</h3>

        <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="text-sm text-gray-300">Long Entry</label>
    <input
      type="text"
      value={settings.longEntry}
      onChange={(e) => setSettings(prev => ({ ...prev, longEntry: e.target.value }))}
      placeholder="Enter long entry condition"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>
  <div>
    <label className="text-sm text-gray-300">Asset (capital ₹)</label>
    <input
      type="number"
      value={settings.asset}
      onChange={(e) => setSettings(prev => ({ ...prev, asset: Number(e.target.value) }))}
      placeholder="Total available capital in ₹"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>

  <div>
    <label className="text-sm text-gray-300">Long Exit</label>
    <input
      type="text"
      value={settings.longExit}
      onChange={(e) => setSettings(prev => ({ ...prev, longExit: e.target.value }))}
      placeholder="Enter long exit condition"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>
  <div>
    <label className="text-sm text-gray-300">Target (%)</label>
    <input
      type="number"
      value={settings.target}
      onChange={(e) => setSettings(prev => ({ ...prev, target: Number(e.target.value) }))}
      placeholder="e.g. 5 for 5%"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>

  <div>
    <label className="text-sm text-gray-300">Short Entry</label>
    <input
      type="text"
      value={settings.shortEntry}
      onChange={(e) => setSettings(prev => ({ ...prev, shortEntry: e.target.value }))}
      placeholder="Enter short entry condition"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>
  <div>
    <label className="text-sm text-gray-300">Commission (₹)</label>
    <input
      type="number"
      value={settings.commission}
      onChange={(e) => setSettings(prev => ({ ...prev, commission: Number(e.target.value) }))}
      placeholder="Commission per trade in ₹"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>

  <div>
    <label className="text-sm text-gray-300">Short Exit</label>
    <input
      type="text"
      value={settings.shortExit}
      onChange={(e) => setSettings(prev => ({ ...prev, shortExit: e.target.value }))}
      placeholder="Enter short exit condition"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>
  <div>
    <label className="text-sm text-gray-300">Initial Investment (₹)</label>
    <input
      type="number"
      value={settings.initialInvestment}
      onChange={(e) => setSettings(prev => ({ ...prev, initialInvestment: Number(e.target.value) }))}
      placeholder="Initial amount to invest in ₹"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>

  <div className="col-span-2">
    <label className="text-sm text-gray-300">Select Stocks</label>
    <select
      multiple
      value={settings.selectedStocks}
      onChange={(e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSettings(prev => ({ ...prev, selectedStocks: selected }));
      }}
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1 h-32"
    >
      <option value="INFY">Infosys</option>
      <option value="TCS">TCS</option>
      <option value="HEROMOTOCO">Hero Motocorp</option>
      <option value="RELIANCE">Reliance</option>
      <option value="HDFCBANK">HDFC Bank</option>
      <option value="ICICIBANK">ICICI Bank</option>
      <option value="SBIN">State Bank of India</option>
      <option value="WIPRO">Wipro</option>
      <option value="HINDUNILVR">Hindustan Unilever</option>
      <option value="ITC">ITC</option>
    </select>
    <p className="text-xs text-gray-400 mt-1">Hold Ctrl (Cmd on Mac) to select multiple stocks</p>
  </div>

  <div className="col-span-2">
    <label className="text-sm text-gray-300">Time Frame (days)</label>
    <input
      type="number"
      value={settings.timeFrame}
      onChange={(e) => setSettings(prev => ({ ...prev, timeFrame: Number(e.target.value) }))}
      placeholder="Number of days to simulate"
      className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
    />
  </div>
</div>


        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-300">Region</label>
            <select
              value={settings.region}
              onChange={(e) => setSettings(prev => ({ ...prev, region: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
            >
              <option>USA</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-300">Universe</label>
            <select
              value={settings.universe}
              onChange={(e) => setSettings(prev => ({ ...prev, universe: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
            >
              <option>TOP500</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-300">Delay</label>
            <input
              type="number"
              value={settings.delay}
              onChange={(e) => setSettings(prev => ({ ...prev, delay: Number(e.target.value) }))}
              className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Truncation</label>
            <input
              type="number"
              value={settings.truncation}
              onChange={(e) => setSettings(prev => ({ ...prev, truncation: Number(e.target.value) }))}
              className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded mt-1"
            />
          </div>
        </div> */}

        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline" className="text-gray-300 border-gray-600" onClick={onClose}>Cancel</Button>
        <Button
  className="bg-emerald-600 hover:bg-emerald-700"
  onClick={() => {
    // Basic field validation
    const requiredFields = ['longEntry', 'longExit', 'shortEntry', 'shortExit'];
    for (const field of requiredFields) {
      if (!settings[field as keyof Settings]) {
        alert(`${field.replace(/([A-Z])/g, ' $1')} is required`);
        return;
      }
    }

    if (
      settings.asset <= 0 ||
      settings.target <= 0 ||
      settings.commission < 0 ||
      settings.initialInvestment <= 0 ||
      settings.timeFrame <= 0
    ) {
      alert('Please enter valid numeric values for asset, target, commission, initial investment, and time frame.');
      return;
    }

    if (settings.selectedStocks.length === 0) {
      alert('Please select at least one stock.');
      return;
    }

    // Save to localStorage
    try {
      localStorage.setItem('simulationSettings', JSON.stringify(settings));
      alert('Settings saved successfully.');
    } catch (e) {
      alert('Failed to save settings.');
      console.error(e);
    }

    onClose();
  }}
>
  Apply
</Button>

        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
