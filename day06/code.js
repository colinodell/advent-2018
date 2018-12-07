const _ = require('lodash');

const parseCoordinates = (data) => {
  const re = /(\d+), (\d+)/;

  return data.split(/[\r\n]+/).map((c) => {
    c = re.exec(c);

    return [parseInt(c[2]), parseInt(c[1])];
  });
};

const calculateDistance = ([x1, y1], [x2, y2]) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const calculateLargestFiniteArea = (data) => {
  const coordinates = parseCoordinates(data);

  const minX = _.minBy(coordinates, (c) => c[0])[0];
  const minY = _.minBy(coordinates, (c) => c[1])[1];
  const maxX = _.maxBy(coordinates, (c) => c[0])[0];
  const maxY = _.maxBy(coordinates, (c) => c[1])[1];

  let grid = new Array(maxX + 1).fill(0).map(() => (new Array(maxY + 1)).fill(null));

  let knownInfinites = [];

  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      let minDistance = null;

      let distances = _.chain((new Array(coordinates.length)).fill(null))
        .map((value, index) => calculateDistance(coordinates[index], [x,y]))
        .tap((d) => { minDistance = _.min(d); })
        .toPairs()
        .filter((c) => c[1] === minDistance)
        .value();

      if (distances.length === 1) {
        grid[x][y] = distances[0][0];

        // Anything found at the grid boundary must be part of an infinite area
        if (x === minX || x === maxX || y === minY || y === maxY) {
          knownInfinites.push(distances[0][0]);
        }
      }
    }
  }

  knownInfinites = _.uniq(knownInfinites);

  return _.chain(grid)
    .flattenDeep()
    .countBy()
    .filter((v, k) => v !== null && knownInfinites.indexOf(k) === -1)
    .values()
    .max()
    .value();
};

module.exports = {
  'calculateLargestFiniteArea': calculateLargestFiniteArea,
};
