import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { MeterReadingRow } from './meterReadingRow';
import moment = require('moment');

describe('MeterReadingRow', () => {
  it('renders without crashing', () => {
    const table = document.createElement('table');
    ReactDOM.render(
      <tbody>
        <MeterReadingRow
          key={moment(new Date()).format()}
          cumulative={0}
          readingDate={''}
          unit=""
        />
      </tbody>,
      table
    );
    ReactDOM.unmountComponentAtNode(table);
  });

  it('renders three <td /> components', () => {
    const wrapper = shallow(
      <MeterReadingRow
        key={moment(new Date()).format()}
        cumulative={0}
        readingDate={''}
        unit=""
      />
    );
    expect(wrapper.find('td').length).toBe(3);
  });

  it('props rendered correctly', () => {
    const wrapper = mount(
      <MeterReadingRow
        key={moment(new Date()).format()}
        cumulative={5}
        readingDate={moment(new Date()).format()}
        unit="5"
      />
    );
    expect(wrapper.props().unit).toBe('5');
    wrapper.setProps({ unit: '10' });
    expect(wrapper.props().unit).toBe('10');
  });
});
