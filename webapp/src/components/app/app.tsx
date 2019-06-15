import * as React from 'react';
import { MeterReading } from '../meterReading/meterReading';
import { EnergyUsageChart } from '../energyUsageChart/energyUsageChart';

export default () => {
  return (
    <div>
      <EnergyUsageChart />
      <MeterReading />
    </div>
  );
};
