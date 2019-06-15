import { dateFormatter } from './formatDateTime';

it('formate given valid date', () => {
  // Arrange and Act
  const result = dateFormatter('2019-06-02T12:36:13.301149+00:00');
  //Assert
  expect(result).toBe('Sunday, June 2, 2019');
});

it('formate given invalid date', () => {
  //Arrange and Act
  const result = dateFormatter('');
  //Assert
  expect(result).toBe('Invalid Date');
});
