import axios, { AxiosResponse } from 'axios';
import * as moment from 'moment';
import {
  isEndOfMonth,
  getDaysUntilMonthEnd,
  getDiffInDays,
  getDaysFromMonthStart
} from '../helper/dateTimeHelper';

export interface IMeterReadingData {
  readingDate: string;
  cumulative: number;
  unit: string;
}

export interface IResponse {
  electricity: IMeterReadingData[];
}

/**
 * Returns the monthly estimated engery usage.
 */
export function getMonthlyEneryUsage(): Promise<void | IMeterReadingData[]> {
  return axios
    .get('https://storage.googleapis.com/bulb-interview/meterReadingsReal.json')
    .then((response: AxiosResponse<IResponse>) => {
      return calculateEnergyUsage(response.data.electricity);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function calculateEnergyUsage(
  readings: IMeterReadingData[]
): IMeterReadingData[] {
  if (readings.length <= 0) {
    return [];
  }

  const data = [];

  for (let i = 0; i < readings.length - 2; i++) {
    data.push({
      date: readings[i + 1].readingDate,
      energyUsage: estimateEndMonReading(
        readings[i],
        readings[i + 1],
        readings[i + 2]
      )
    });
  }
  return data;
}

function estimateEndMonReading(
  previousReading: IMeterReadingData,
  currentReading: IMeterReadingData,
  nextReading: IMeterReadingData
) {
  if (
    isEndOfMonth(previousReading.readingDate) &&
    isEndOfMonth(currentReading.readingDate)
  ) {
    return currentReading.cumulative - previousReading.cumulative;
  } else {
    const remainingLastMonthDays = getDaysUntilMonthEnd(
      previousReading.readingDate
    );
    const passedNextMonthDays = getDaysFromMonthStart(
      moment(nextReading.readingDate)
    );
    const daysDiff = getDiffInDays(
      moment(nextReading.readingDate),
      moment(previousReading.readingDate)
    );
    const readingDiff = nextReading.cumulative - previousReading.cumulative;
    const estimatedUsagePerDay = readingDiff / daysDiff;

    return (
      readingDiff -
      remainingLastMonthDays * estimatedUsagePerDay -
      passedNextMonthDays * estimatedUsagePerDay
    );
  }
}
