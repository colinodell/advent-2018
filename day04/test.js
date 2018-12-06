const day04 = require('./code'),
  assert = require('assert'),
  withDataFile = require('../common').withDataFile;

describe('Day 4 - Repose Record', () => {
  /* eslint-disable quotes */
  const sampleData = "[1518-11-01 00:00] Guard #10 begins shift\n" +
    "[1518-11-01 00:05] falls asleep\n" +
    "[1518-11-01 00:25] wakes up\n" +
    "[1518-11-01 00:30] falls asleep\n" +
    "[1518-11-01 00:55] wakes up\n" +
    "[1518-11-01 23:58] Guard #99 begins shift\n" +
    "[1518-11-02 00:40] falls asleep\n" +
    "[1518-11-02 00:50] wakes up\n" +
    "[1518-11-03 00:05] Guard #10 begins shift\n" +
    "[1518-11-03 00:24] falls asleep\n" +
    "[1518-11-03 00:29] wakes up\n" +
    "[1518-11-04 00:02] Guard #99 begins shift\n" +
    "[1518-11-04 00:36] falls asleep\n" +
    "[1518-11-04 00:46] wakes up\n" +
    "[1518-11-05 00:03] Guard #99 begins shift\n" +
    "[1518-11-05 00:45] falls asleep\n" +
    "[1518-11-05 00:55] wakes up";
  /* eslint-enable quotes */

  describe('Part 1', () => {
    it('should properly locate the sleepiest guard and when they are most likely sleeping', () => {
      assert.equal(day04.multiplySleepiestGuardIdByMinute(sampleData), 240);

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day04.multiplySleepiestGuardIdByMinute(data), 84834);
      });
    });
  });

  describe('Part 2', () => {
    it('should identify the guard most-frequently asleep on the same minute', () => {
      // eslint-disable-next-line quotes
      assert.equal(day04.findOverallSleepiestGuardMinute(sampleData), 4455);

      withDataFile(__dirname, 'data.txt', (data) => {
        assert.equal(day04.findOverallSleepiestGuardMinute(data), 53427);
      });
    });
  });
});
