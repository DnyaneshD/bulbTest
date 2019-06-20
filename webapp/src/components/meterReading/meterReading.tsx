import * as React from 'react';
import * as meterReadingsData from '../../data/meterReadingsSample.json';
import { MeterReadingRow } from '../meterReadingRow/meterReadingRow';

interface IMeterReadingData {
  readingDate: string;
  cumulative: number;
  unit: string;
}

interface IMeterReadingState {
  readings: IMeterReadingData[];
}

export class MeterReading extends React.PureComponent<{}, IMeterReadingState> {
  state = { readings: [] };

  public componentDidMount() {
    this.setState({ readings: meterReadingsData.electricity });
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
