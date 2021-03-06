const day03 = require('./code'),
  assert = require('assert'),
  withDataFile = require('../common').withDataFile;

describe('Day 3 - No Matter How You Slice It', () => {
  describe('Part 1', () => {
    it('should properly count the overlapping claims', () => {
      // eslint-disable-next-line quotes
      assert.equal(day03.countOverlappingClaims("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2", 10, 10), 4);

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day03.countOverlappingClaims(data.toString(), 1000, 1000), 121163);
      });
    });
  });

  describe('Part 2', () => {
    it('should properly find the one non-overlapping claim', () => {
      // eslint-disable-next-line quotes
      assert.equal(day03.findFirstNonOverlappingClaim("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2", 10, 10), 3);

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day03.findFirstNonOverlappingClaim(data.toString(), 1000, 1000), 943);
      });
    });
  });
});
