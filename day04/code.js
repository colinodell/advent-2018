const _ = require('lodash');

class Guard {
  constructor (id) {
    this.id = id;
    this._sleepRecord = Array(60).fill(0);
    this._lastAsleep = null;
  }

  markAsleep (asleepAt) {
    this._lastAsleep = asleepAt;
  }

  markAwake (awakeAt) {
    for (let minute = this._lastAsleep; minute < awakeAt; minute++) {
      this._sleepRecord[minute]++;
    }
  }

  findSleepiestMinute () {
    return _.chain(this._sleepRecord)
      .map((sleeps, minute) => ({'sleeps': sleeps, 'minute': minute}))
      .sortBy('sleeps')
      .reverse()
      .first()
      .value();
  }

  totalSleepDuration () {
    return _.sum(this._sleepRecord);
  }
}

class SleepRecordBook {
  constructor () {
    this.guards = {};
  }

  getById (guardId) {
    if (this.guards[guardId]) {
      return this.guards[guardId];
    }

    let g = new Guard(guardId);
    this.guards[guardId] = g;
    return g;
  }

  findGuardWhoSleepsTheMostOverall () {
    return _.chain(this.guards)
      .sortBy((g) => g.totalSleepDuration())
      .last()
      .value();
  }

  findGuardWhoSleepsTheMostInTheSameMinute () {
    return _.chain(this.guards)
      .mapValues((guard) => guard.findSleepiestMinute())
      .toPairs()
      .sortBy((v) => v[1].sleeps)
      .reverse()
      .map(([id]) => this.getById(id))
      .first()
      .value();
  }
}

const sortAndParseLogs = (data) => {
  data = data.trim().split(/[\r\n]+/).sort();

  const rgx = /\[\d+-\d+-\d+ \d+:(\d+)\] (?:Guard #)?(\d+|falls asleep|wakes up)/;

  const slr = new SleepRecordBook();
  let currentGuard = null;

  for (let i = 0; i < data.length; i++) {
    let r = rgx.exec(data[i]);

    let minute = parseInt(r[1]);
    let action = r[2];

    if (action === 'falls asleep') {
      currentGuard.markAsleep(minute);
    } else if (action === 'wakes up') {
      currentGuard.markAwake(minute);
    } else {
      currentGuard = slr.getById(parseInt(action));
    }
  }

  return slr;
};

const multiplySleepiestGuardIdByMinute = (data) => {
  const slr = sortAndParseLogs(data);

  const sleepiestGuard = slr.findGuardWhoSleepsTheMostOverall();

  return sleepiestGuard.id * sleepiestGuard.findSleepiestMinute().minute;
};

const findOverallSleepiestGuardMinute = (data) => {
  const slr = sortAndParseLogs(data);

  const guard = slr.findGuardWhoSleepsTheMostInTheSameMinute();

  return guard.id * guard.findSleepiestMinute().minute;
};

module.exports = {
  'multiplySleepiestGuardIdByMinute': multiplySleepiestGuardIdByMinute,
  'findOverallSleepiestGuardMinute': findOverallSleepiestGuardMinute,
};
