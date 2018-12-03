const countAllGreaterThan2 = (collector, current) => {
  if (current.length >= 2) {
    return ++collector;
  } else {
    return collector;
  }
};

const loadSuitPrototype = (data, xSize, ySize) => {
  // eslint-disable-next-line no-unused-vars
  const fabric = new Array(xSize).fill(0).map(item =>(new Array(ySize).fill(0).map(item2 => [])));
  const claimIds = new Set();

  const rgx = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

  data.trim().split(/[\r\n]+/).forEach((v) => {
    let matches = rgx.exec(v);

    let claimId = parseInt(matches[1]);
    let xStart = parseInt(matches[2]);
    let yStart = parseInt(matches[3]);
    let width = parseInt(matches[4]);
    let height = parseInt(matches[5]);

    for (let xOffset = 0; xOffset < width; xOffset++) {
      for (let yOffset = 0; yOffset < height; yOffset++) {
        fabric[xStart+xOffset][yStart+yOffset].push(claimId);
      }
    }

    claimIds.add(claimId);
  });

  return { 'fabric': fabric, 'claimIds': claimIds };
};

const countOverlappingClaims = (data, xSize, ySize) => {
  const suit = loadSuitPrototype(data, xSize, ySize);

  return suit['fabric'].reduce((collector, row) => row.reduce(countAllGreaterThan2, collector), 0);
};

const findFirstNonOverlappingClaim = (data, xSize, ySize) => {
  const suit = loadSuitPrototype(data, xSize, ySize);
  const fabric = suit['fabric'];

  let allClaimIds = suit['claimIds'];

  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      if (fabric[x][y].length >= 2) {
        fabric[x][y].forEach((v) => allClaimIds.delete(v));
      }
    }
  }

  for (let nonOverlappingClaimId of allClaimIds) {
    return nonOverlappingClaimId;
  }
};

module.exports = {
  'countOverlappingClaims': countOverlappingClaims,
  'findFirstNonOverlappingClaim': findFirstNonOverlappingClaim,
};
