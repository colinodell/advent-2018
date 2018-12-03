const day03 = require('./code'),
  assert = require('assert'),
  fs = require('fs'),
  path = require('path');

const dataFilePath = path.join(__dirname, '/data.txt');

describe('Day 3 - No Matter How You Slice It', () => {
  describe('Part 1', () => {
    it('should properly count the overlapping claims', () => {
      // eslint-disable-next-line quotes
      assert.equal(day03.countOverlappingClaims("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2", 10, 10), 4);

      fs.readFile(dataFilePath, (err, data) => {
        if (err) throw err;

        assert.equal(day03.countOverlappingClaims(data.toString(), 1000, 1000), 121163);
      });
    });
  });
});
