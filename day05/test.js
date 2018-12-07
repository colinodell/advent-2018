const day05 = require('./code'),
  assert = require('assert'),
  withDataFile = require('../common').withDataFile;

describe('Day 5 - Alchemical Reduction', () => {
  const sampleData = 'dabAcCaCBAcCcaDA';

  describe('Part 1', () => {
    it('should properly reduce the given polymer', () => {
      assert.equal(day05.reducePolymer(sampleData), 'dabCBAcaDA');

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day05.reducePolymer(data).length, 11242);
      });
    });
  });
});
