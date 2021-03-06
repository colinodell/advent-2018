const day02 = require('./code'),
  assert = require('assert'),
  withDataFile = require('../common').withDataFile;

describe('Day 2 - Inventory Management System', () => {
  describe('Part 1', () => {
    it('should properly calculate the checksum', () => {
      // eslint-disable-next-line quotes
      assert.equal(day02.calculateChecksum("abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab"), 12);

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day02.calculateChecksum(data.toString()), 8892);
      });
    });
  });

  describe('Part 2', () => {
    it('should properly identify the common letters in the matching box ids', () => {
      // eslint-disable-next-line quotes
      assert.equal(day02.findCommonLettersInCorrectBoxIds("abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz"), 'fgij');

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day02.findCommonLettersInCorrectBoxIds(data.toString()), 'zihwtxagifpbsnwleydukjmqv');
      });
    });
  });
});
