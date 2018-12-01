const calculateFrequency = (input) => {
  return input
    .split(/[\r\n]+/)
    .map((change) => parseInt(change))
    .reduce((sum, change) => sum + change, 0);
};

const findFirstRepeatFrequency = (input) => {
  const changes = input
    .split(/[\r\n]+/)
    .map((change) => parseInt(change));

  let frequency = 0;
  const frequencyHistory = new Set([frequency]);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let i = 0; i < changes.length; i++) {
      frequency += changes[i];

      if (frequencyHistory.has(frequency)) {
        return frequency;
      }

      frequencyHistory.add(frequency);
    }
  }
};

module.exports = {
  'calculateFrequency': calculateFrequency,
  'findFirstRepeatFrequency': findFirstRepeatFrequency,
};
