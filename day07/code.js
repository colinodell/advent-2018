const _ = require('lodash');

const parseRequirements = (data) => {
  const steps = {};

  data.trim().split(/[\r\n]+/).forEach((line) => {
    let m = /Step (.) must be finished before step (.) can begin/.exec(line);
    let requirement = m[1];
    let then = m[2];

    if (!steps[requirement]) {
      steps[requirement] = [];
    }

    if (!steps[then]) {
      steps[then] = [];
    }

    steps[then].push(requirement);
  });

  return steps;
};

const determineCorrectSteps = (data) => {
  let requirements = parseRequirements(data);

  const correctOrder = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Which steps can be completed next?
    let nextSteps = Object.keys(requirements).filter((step) => requirements[step].length === 0).sort();

    if (nextSteps.length === 0) {
      break;
    }

    // Only one step can be completed at a time
    const nextStep = nextSteps[0];

    correctOrder.push(nextStep);

    // Resolve this in all other keys
    requirements = _.chain(requirements)
      .toPairs()
      .map((r) => [r[0], _.without(r[1], nextStep)])
      .reject((r) => r[0] === nextStep)
      .fromPairs()
      .value();
  }

  return correctOrder.join('');
};

module.exports = {
  'determineCorrectSteps': determineCorrectSteps,
};
