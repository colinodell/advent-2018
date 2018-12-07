const day06 = require('./code'),
  assert = require('assert'),
  withDataFile = require('../common').withDataFile;

describe('Day 6 - Chronal Coordinates', () => {
  /* eslint-disable quotes */
  const sampleData = "1, 1\n" +
    "1, 6\n" +
    "8, 3\n" +
    "3, 4\n" +
    "5, 5\n" +
    "8, 9";
  /* eslint-enable quotes */

  describe('Part 1', () => {
    it('should properly identify the size of the largest finite area', () => {
      assert.equal(day06.calculateLargestFiniteArea(sampleData), 17);

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day06.calculateLargestFiniteArea(data), 3969);
      });
    });
  });
});
