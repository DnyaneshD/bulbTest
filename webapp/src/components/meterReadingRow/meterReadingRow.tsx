import * as React from 'react';
import { dateFormatter } from '../../helper/formatDateTime';

interface IMeterReadingRow {
  readingDate: string;
  cumulative: number;
  unit: string;
}

export const MeterReadingRow = (props: IMeterReadingRow) => {
  return (
    <tr key={props.readingDate}>
      <td>{dateFormatter(props.readingDate)}</td>
      <td>{props.cumulative}</td>
      <td>{props.unit}</td>
    </tr>
  );
};
