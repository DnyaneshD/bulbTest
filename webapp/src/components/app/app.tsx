import * as React from 'react';
import { MeterReading } from '../meterReading/meterReading';
import { EnergyUsageChart } from '../energyUsageChart/energyUsageChart';

const App = () => {
  return (
    <div>
      <EnergyUsageChart />
      <MeterReading />
    </div>
  );
};

export default App;
