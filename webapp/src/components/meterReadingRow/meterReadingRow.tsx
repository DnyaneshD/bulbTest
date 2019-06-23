import * as React from 'react';
import * as moment from 'moment';

interface IMeterReadingRow {
  readingDate: string;
  cumulative: number;
  unit: string;
}

export const MeterReadingRow = (props: IMeterReadingRow) => {
  return (
    <tr key={props.readingDate}>
      <td>{moment(props.readingDate).format('ll')}</td>
      <td>{props.cumulative}</td>
      <td>{props.unit}</td>
    </tr>
  );
};
