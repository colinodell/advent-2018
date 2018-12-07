const reducePolymer = (polymer) => {
  for (let i = 0; i < polymer.length - 1; ) {
    let a = polymer.charCodeAt(i);
    let b = polymer.charCodeAt(i+1);

    // In ASCII, upper- and lowercase chars are 32 bits away
    if (Math.abs(a - b) !== 32) {
      // Nothing found here - try the next position
      i++;
      continue;
    }

    // Remove the matching pair
    polymer = polymer.substr(0, i) + polymer.substr(i+2);

    // Start at 0 again
    i = 0;
  }

  return polymer;
};

module.exports = {
  'reducePolymer': reducePolymer,
};
