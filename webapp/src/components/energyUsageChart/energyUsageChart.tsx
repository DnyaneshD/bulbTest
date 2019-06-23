import * as React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getMonthlyEneryUsage } from '../../service/energyUsageService';

export interface IMeterReadingData {
  readingDate: string;
  cumulative: number;
  unit: string;
}

interface IMeterReadingState {
  energyUsageData: IMeterReadingData[];
}

export class EnergyUsageChart extends React.PureComponent<
  {},
  IMeterReadingState
> {
  state = { energyUsageData: [] };

  public componentDidMount() {
    getMonthlyEneryUsage().then((usageData: IMeterReadingData[]) => {
      this.setState({
        energyUsageData: usageData
      });
    });
  }

  public render() {
    const { energyUsageData } = this.state;

    return (
      <div>
        <h2>Energy Usage</h2>
        <BarChart width={1400} height={400} data={energyUsageData}>
          <XAxis dataKey="date" />
          <YAxis dataKey="energyUsage" />
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
        </BarChart>
      </div>
    );
  }
}
