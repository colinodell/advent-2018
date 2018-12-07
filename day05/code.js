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

module.exports = {
  'reducePolymer': reducePolymer,
};
