const levenshtein = require('js-levenshtein');

const countFrequencies = (str) => {
  const freq = new Map();

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (freq.has(char)) {
      freq.set(char, freq.get(char) + 1);
    } else {
      freq.set(char, 1);
    }
  }

  let has2 = false;
  let has3 = false;

  freq.forEach((cnt) => {
    if (cnt === 2) {
      has2 = true;
    }

    if (cnt === 3) {
      has3 = true;
    }
  });

  return {'has2': has2, 'has3': has3};
};

const calculateChecksum = (data) => {
  const counts = data.split(/[\r\n]+/).map(countFrequencies);

  let cnt2 = 0;
  let cnt3 = 0;

  counts.forEach((cnt) => {
    if (cnt.has2) {
      cnt2++;
    }
    if (cnt.has3) {
      cnt3++;
    }
  });

  return cnt2 * cnt3;
};

const similarChars = (a, b) => {
  a = a.split('');
  b = b.split('');

  let ret = '';
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      ret += a[i];
    }
  }

  return ret;
};

const findCommonLettersInCorrectBoxIds = (data) => {
  const list = data.split(/[\r\n]+/);

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      let distance = levenshtein(list[i], list[j]);
      if (distance === 1) {
        return similarChars(list[i], list[j]);
      }
    }
  }
};

module.exports = {
  'calculateChecksum': calculateChecksum,
  'findCommonLettersInCorrectBoxIds': findCommonLettersInCorrectBoxIds,
};
