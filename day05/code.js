const reducePolymer = (polymer) => {
  let previousPolymer = null;

  while (previousPolymer !== polymer) {
    previousPolymer = polymer;

    for (let i = 65; i <= 90; i++) {
      let upper = String.fromCharCode(i);
      let lower = upper.toLowerCase();

      polymer = polymer.replace(upper + lower, '');
      polymer = polymer.replace(lower + upper, '');
    }
  }

  return polymer;
};

const improvePolymer = (polymer) => {
  // We can optimize the speed by performing an initial reduction
  polymer = reducePolymer(polymer);

  let bestResult = polymer;

  for (let i = 65; i <= 90; i++) {
    let re = new RegExp(String.fromCharCode(i), 'gi');
    let newPolymer = reducePolymer(polymer.replace(re, ''));

    if (newPolymer.length < bestResult.length) {
      bestResult = newPolymer;
    }
  }

  return bestResult;
};

module.exports = {
  'reducePolymer': reducePolymer,
  'improvePolymer': improvePolymer,
};
