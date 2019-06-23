//This file doesnot required any tests as dateTimeHelper is just wrapper
//on moment

import { isEndOfMonth } from './dateTimeHelper';

it('formate given valid date', () => {
  // Arrange and Act
  const result = isEndOfMonth('2017-06-30T00:00:00.000Z');
  //Assert
  expect(result).toBe(true);
});
