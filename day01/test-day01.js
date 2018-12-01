const day01 = require('./day01'),
  assert = require('assert'),
  fs = require('fs'),
  path = require('path');

const dataFilePath = path.join(__dirname, '/day1.txt');

describe('Day 1 - Chronal Calibration', () => {
  describe('Part 1', () => {
    it('should properly calculate the resulting frequency', () => {
      fs.readFile(dataFilePath, (err, data) => {
        if (err) throw err;

        assert.equal(day01.calculateFrequency(data.toString()), 569);
      });
    });
  });

  describe('Part 2', () => {
    it('should properly identify the first frequency found twice', () => {
      fs.readFile(dataFilePath, (err, data) => {
        if (err) throw err;

        assert.equal(day01.findFirstRepeatFrequency(data.toString()), 77666);
      });
    });
  });
});
