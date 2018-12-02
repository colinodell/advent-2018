const day02 = require('./code'),
  assert = require('assert'),
  fs = require('fs'),
  path = require('path');

const dataFilePath = path.join(__dirname, '/data.txt');

describe('Day 2 - Inventory Management System', () => {
  describe('Part 1', () => {
    it('should properly calculate the checksum', () => {
      assert.equal(day02.calculateChecksum("abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab"), 12);

      fs.readFile(dataFilePath, (err, data) => {
        if (err) throw err;

        assert.equal(day02.calculateChecksum(data.toString()), 8892);
      });
    });
  });

  describe('Part 2', () => {
    it('should properly identify the common letters in the matching box ids', () => {
      assert.equal(day02.findCommonLettersInCorrectBoxIds("abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz"), 'fgij');

      fs.readFile(dataFilePath, (err, data) => {
        if (err) throw err;

        assert.equal(day02.findCommonLettersInCorrectBoxIds(data.toString()), 'zihwtxagifpbsnwleydukjmqv');
      });
    });
  });
});
