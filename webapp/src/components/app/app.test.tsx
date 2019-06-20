import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import { EnergyUsageChart } from '../energyUsageChart/energyUsageChart';
import { MeterReading } from '../meterReading/meterReading';

describe('App', () => {
  it('renders without crashing', () => {
    //Arrange
    const div = document.createElement('div');

    //Act and Assert
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders one <EnergyUsageChart /> and <MeterReading /> components', () => {
    //Arrange and Act
    const wrapper = shallow(<App />);
    //Assert
    expect(wrapper.find(EnergyUsageChart)).toHaveLength(1);
    expect(wrapper.find(MeterReading)).toHaveLength(1);
  });
});
