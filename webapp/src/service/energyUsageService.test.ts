import axios from 'axios';
import { getMonthlyEneryUsage } from './energyUsageService';
import { IMeterReadingData } from '../components/energyUsageChart/energyUsageChart';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('getMonthlyEneryUsage', () => {
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
          },
          {
            cumulative: 18002,
            readingDate: '2017-05-08T00:00:00.000Z',
            unit: 'kWh'
          }
        ]
      }
    } as any);

    //Act
    getMonthlyEneryUsage()
      .then(() => {})
      .catch((err: Error) => console.log(err));

    //Assert
    expect(getSpy).toBeCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json'
    );
  });

  it('test result with valid data', () => {
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
          },
          {
            cumulative: 18002,
            readingDate: '2017-05-08T00:00:00.000Z',
            unit: 'kWh'
          }
        ]
      }
    } as any);

    //Act
    getMonthlyEneryUsage().then((data: IMeterReadingData[]) => {
      //Assert
      expect(data).toStrictEqual([
        { date: '2017-04-15T00:00:00.000Z', energyUsage: 319.0731707317073 }
      ]);
    });
  });

  it('test result with []', () => {
    //Arrange
    const getSpy = jest.spyOn(mockAxios, 'get');

    mockAxios.get.mockResolvedValue({
      data: {
        electricity: []
      }
    } as any);

    //Act
    getMonthlyEneryUsage()
      .then((data: IMeterReadingData[]) => {
        //Assert
        expect(data).toStrictEqual([]);
      })
      .catch((err: Error) => console.log(err));
  });
});
