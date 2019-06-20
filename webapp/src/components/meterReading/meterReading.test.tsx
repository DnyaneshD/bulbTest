import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MeterReading } from './meterReading';
import { MeterReadingRow } from '../meterReadingRow/meterReadingRow';

describe('MeterReading', () => {
  it('renders without crashing', () => {
    const table = document.createElement('div');
    ReactDOM.render(<MeterReading />, table);
    ReactDOM.unmountComponentAtNode(table);
  });

  it('renders one <MeterReadingRow /> components', () => {
    const wrapper = shallow(<MeterReading />);
    wrapper.setState({
      readings: [
        {
          cumulative: 17600,
          readingDate: '2017-03-31T00:00:00.000Z',
          unit: 'kWh'
        }
      ]
    });
    expect(wrapper.find(MeterReadingRow).length).toBe(1);
  });
});
