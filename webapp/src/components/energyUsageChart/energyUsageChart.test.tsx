import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BarChart } from 'recharts';
import { shallow } from 'enzyme';
import axios, { AxiosResponse } from 'axios';
import { EnergyUsageChart } from './energyUsageChart';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('EnergyUsageChart', () => {
  beforeAll(() => {
    mockAxios.get.mockResolvedValue({
      data: {
        electricity: []
      }
    } as any);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EnergyUsageChart />, div);
  });

  it('renders one <BarChart /> components', () => {
    const wrapper = shallow(<EnergyUsageChart />);
    expect(wrapper.find(BarChart)).toHaveLength(1);
  });

  it('test API call', () => {
    //Arrange
    const getSpy = jest.spyOn(mockAxios, 'get');
    mockAxios.get.mockResolvedValue({
      data: {
        electricity: [
          {
            cumulative: 17580,
            readingDate: '2017-03-28T00:00:00.000Z',
            unit: 'kWh'
          },
          {
            cumulative: 17759,
            readingDate: '2017-04-15T00:00:00.000Z',
            unit: 'kWh'
          }
        ]
      }
    } as any);

    jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          electricity: [
            {
              cumulative: 17580,
              readingDate: '2017-03-28T00:00:00.000Z',
              unit: 'kWh'
            },
            {
              cumulative: 17759,
              readingDate: '2017-04-15T00:00:00.000Z',
              unit: 'kWh'
            }
          ]
        }
      } as AxiosResponse)
    );

    //Act
    shallow(<EnergyUsageChart />);

    //Assert
    expect(getSpy).toBeCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json'
    );
  });
});
