import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { EnergyUsageChart } from './energyUsageChart';
import { shallow } from 'enzyme';
import { BarChart } from 'recharts';

describe('EnergyUsageChart', () => {
  it('renders without crashing', () => {
    const table = document.createElement('div');
    ReactDOM.render(<EnergyUsageChart />, table);
    ReactDOM.unmountComponentAtNode(table);
  });

  it('renders one <BarChart /> components', () => {
    const wrapper = shallow(<EnergyUsageChart />);
    expect(wrapper.find(BarChart)).toHaveLength(1);
  });

  it('calculateEnergyUsage', () => {
    const energyUsageChartObject = new EnergyUsageChart({});
    expect(energyUsageChartObject.calculateEnergyUsage([])).toEqual([]);
  });

  it('calculateEnergyUsage', () => {
    const energyUsageChartObject = new EnergyUsageChart({});
    const data = energyUsageChartObject.calculateEnergyUsage([
      {
        cumulative: 17600,
        readingDate: '2017-03-31T00:00:00.000Z',
        unit: 'kWh'
      },
      {
        cumulative: 17600,
        readingDate: '2017-03-31T00:00:00.000Z',
        unit: 'kWh'
      },
      {
        cumulative: 17600,
        readingDate: '2017-03-31T00:00:00.000Z',
        unit: 'kWh'
      }
    ]);
    expect(data.length).toBe(1);
  });
});
