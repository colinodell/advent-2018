const day07 = require('./code'),
  assert = require('assert'),
  withDataFile = require('../common').withDataFile;

describe('Day 7 - The Sum of Its Parts', () => {
  /* eslint-disable quotes */
  const sampleData =
    "Step C must be finished before step A can begin.\n" +
    "Step C must be finished before step F can begin.\n" +
    "Step A must be finished before step B can begin.\n" +
    "Step A must be finished before step D can begin.\n" +
    "Step B must be finished before step E can begin.\n" +
    "Step D must be finished before step E can begin.\n" +
    "Step F must be finished before step E can begin.\n";
  /* eslint-enable quotes */

  describe('Part 1', () => {
    it('should determine the correct order of steps', () => {
      assert.equal(day07.determineCorrectSteps(sampleData), 'CABDFE');

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day07.determineCorrectSteps(data), 'BFLNGIRUSJXEHKQPVTYOCZDWMA');
      });
    });
  });
});
