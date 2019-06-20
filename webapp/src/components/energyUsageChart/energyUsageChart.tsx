import * as React from 'react';
import * as meterReadingsData from '../../data/meterReadingsSample.json';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface IMeterReadingData {
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
    this.setState({
      energyUsageData: this.calculateEnergyUsage(meterReadingsData.electricity)
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

  public calculateEnergyUsage(
    readings: IMeterReadingData[]
  ): IMeterReadingData[] {
    const data = [];
    if (readings.length > 0) {
      for (let i = 0; i < readings.length - 2; i++) {
        const energyUsage = readings[i + 1].cumulative - readings[i].cumulative;
        data.push({
          date: readings[i + 1].readingDate,
          energyUsage
        });
      }
    }
    return data;
  }
}
