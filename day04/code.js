const _ = require('lodash');

class SleepPeriod {
  constructor (id, asleepMinute, awakeMinute) {
    this.id = id;
    this.asleepMinute = asleepMinute;
    this.awakeMinute = awakeMinute;
  }

  duration () {
    return this.awakeMinute - this.asleepMinute;
  }
}

class SleepRecordBook {
  constructor () {
    this._sleepsByGuard = new Map();
  }

  /**
   * @param {SleepPeriod} sleepPeriod
   */
  add (sleepPeriod) {
    if (!this._sleepsByGuard.has(sleepPeriod.id)) {
      this._sleepsByGuard.set(sleepPeriod.id, []);
    }

    this._sleepsByGuard.get(sleepPeriod.id).push(sleepPeriod);
  }

  getGuardIds () {
    return Array.from(this._sleepsByGuard.keys());
  }

  findSleepiestGuard () {
    /**
     * @param {SleepPeriod[]} sleeps
     */
    const reduceSleepsToFindSleepiest = ([id, sleeps]) => {
      return [id, sleeps.reduce((totalDuration, sleep) => totalDuration += sleep.duration(), 0)];
    };

    const sleepiestGuardId = _
      .chain([...this._sleepsByGuard])
      .map(reduceSleepsToFindSleepiest)
      // eslint-disable-next-line no-unused-vars
      .sortBy(([id, duration]) => duration)
      .last()
      .first()
      .value();

    return sleepiestGuardId;
  }

  findSleepiestMinuteByGuard (guardId) {
    /**
     * @param {Array} collector
     * @param {SleepPeriod} s
     */
    const addMinutesAsleep = (collector, s) => {
      for (let i = s.asleepMinute; i < s.awakeMinute; i++) {
        if (!collector.has(i)) {
          collector.set(i, 0);
        }

        collector.set(i, collector.get(i) + 1);
      }

      return collector;
    };

    const sleeps = this._sleepsByGuard.get(guardId);

    const sleepiestMinute = _
      .chain(sleeps)
      .reduce(addMinutesAsleep, new Map())
      .thru((m) => [...m])
      .map((v) => { return { 'minute': v[0], 'sleeps': v[1]}; })
      .sortBy('sleeps')
      .last()
      .value();

    return sleepiestMinute;
  }
}

const sortAndParseLogs = (data) => {
  data = data.trim().split(/[\r\n]+/).sort();

  const rgx = /\[\d+-\d+-\d+ \d+:(\d+)\] (?:Guard #)?(\d+|falls asleep|wakes up)/;

  let lastGuardId = 0;
  let lastSleepTime = 0;

  const slr = new SleepRecordBook();

  for (let i = 0; i < data.length; i++) {
    let r = rgx.exec(data[i]);

    let minute = parseInt(r[1]);
    let action = r[2];

    if (action === 'falls asleep') {
      lastSleepTime = minute;
    } else if (action === 'wakes up') {
      slr.add(new SleepPeriod(lastGuardId, lastSleepTime, minute));
    } else {
      lastGuardId = parseInt(action);
    }
  }

  return slr;
};

const multiplySleepiestGuardIdByMinute = (data) => {
  const slr = sortAndParseLogs(data);

  const sleepiestGuardId = slr.findSleepiestGuard();
  const sleepiestMinute = slr.findSleepiestMinuteByGuard(sleepiestGuardId);

  return sleepiestGuardId * sleepiestMinute.minute;
};

const findOverallSleepiestGuardMinute = (data) => {
  const slr = sortAndParseLogs(data);

  let sleepiest = {'sleeps': -1};

  slr.getGuardIds().forEach((guardId) => {
    let sleepiestMinute = slr.findSleepiestMinuteByGuard(guardId);

    if (sleepiestMinute.sleeps > sleepiest.sleeps) {
      sleepiest = sleepiestMinute;
      sleepiest.guardId = guardId;
    }
  });

  return sleepiest.guardId * sleepiest.minute;
};

module.exports = {
  'multiplySleepiestGuardIdByMinute': multiplySleepiestGuardIdByMinute,
  'findOverallSleepiestGuardMinute': findOverallSleepiestGuardMinute,
};
