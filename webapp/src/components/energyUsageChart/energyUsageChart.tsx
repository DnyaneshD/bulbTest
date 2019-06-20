import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface IMeterReadingData {
  readingDate: string;
  cumulative: number;
  unit: string;
}

interface IMeterReadingState {
  energyUsageData: IMeterReadingData[];
}

interface IResponse {
  electricity: IMeterReadingData[];
}

export class EnergyUsageChart extends React.PureComponent<
  {},
  IMeterReadingState
> {
  state = { energyUsageData: [] };

  public componentDidMount() {
    return axios
      .get(
        'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json'
      )
      .then((response: AxiosResponse<IResponse>) => {
        this.setState({
          energyUsageData: this.calculateEnergyUsage(response.data.electricity)
        });
      })
      .catch(function(error) {
        console.log(error);
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
    if (readings.length <= 0) {
      return [];
    }

    const data = [];

    for (let i = 0; i < readings.length - 2; i++) {
      const energyUsage = readings[i + 1].cumulative - readings[i].cumulative;
      data.push({
        date: readings[i + 1].readingDate,
        energyUsage
      });
    }
    return data;
  }
}
