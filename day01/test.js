const day01 = require('./code'),
  assert = require('assert'),
  withDataFile = require('../common').withDataFile;

describe('Day 1 - Chronal Calibration', () => {
  describe('Part 1', () => {
    it('should properly calculate the resulting frequency', () => {
      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day01.calculateFrequency(data), 569);
      });
    });
  });

  describe('Part 2', () => {
    it('should properly identify the first frequency found twice', () => {
      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day01.findFirstRepeatFrequency(data.toString()), 77666);
      });
    });
  });
});
