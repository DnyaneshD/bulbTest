import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { MeterReadingRow } from '../meterReadingRow/meterReadingRow';

interface IMeterReadingData {
  readingDate: string;
  cumulative: number;
  unit: string;
}

interface IMeterReadingState {
  readings: IMeterReadingData[];
}

interface IResponse {
  electricity: IMeterReadingData[];
}

export class MeterReading extends React.PureComponent<{}, IMeterReadingState> {
  state = { readings: [] };

  public componentDidMount() {
    axios
      .get(
        'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json'
      )
      .then((response: AxiosResponse<IResponse>) => {
        this.setState({ readings: response.data.electricity });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  public render() {
    return (
      <div>
        <h2>Meter Readings</h2>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Reading</th>
              <th>Unit</th>
            </tr>
            {this.state.readings.map(reading => (
              <MeterReadingRow
                key={reading.readingDate}
                cumulative={reading.cumulative}
                readingDate={reading.readingDate}
                unit={reading.unit}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
