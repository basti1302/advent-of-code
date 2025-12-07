import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const lines = contents.split(EOL);

  const grid = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    if (line == null || line.trim() == '') {
      continue;
    }
    const cells = line.split('');
    const gridLine = [];
    for (let x = 0; x < cells.length; x++) {
      gridLine.push(cells[x]);
    }
    grid.push(gridLine);
  }

  let noRemovedTotal = 0;
  let noRemovedThisRound = 0;
  let roundIdx = 0;
  do {
    roundIdx++;
    noRemovedThisRound = 0;
    const coordinatesRemovedThisRound = [];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const cell = grid[y][x];
        if (cell !== '@') {
          continue;
        }
        let noAdjacentRolls = 0;
        for (let yOffs = -1; yOffs <= 1; yOffs++) {
          const yNeighbor = y + yOffs;
          if (yNeighbor < 0 || yNeighbor >= grid.length) {
            continue;
          }
          for (let xOffs = -1; xOffs <= 1; xOffs++) {
            const xNeighbor = x + xOffs;
            if (xNeighbor < 0 || xNeighbor >= grid[y].length) {
              continue;
            }
            if (xOffs === 0 && yOffs === 0) {
              continue;
            }
            if (grid[yNeighbor][xNeighbor] === '@') {
              noAdjacentRolls++;
            }
          }
        }
        if (noAdjacentRolls < 4) {
          coordinatesRemovedThisRound.push([x, y]);
          noRemovedThisRound++;
        }
      }
    }
    noRemovedTotal += noRemovedThisRound;
    for (let n = 0; n < coordinatesRemovedThisRound.length; n++) {
      const [x, y] = coordinatesRemovedThisRound[n];
      grid[y][x] = '.';
    }
    // console.log(`noRemovedThisRound: ${noRemovedThisRound}`);
  } while (noRemovedThisRound > 0);
  console.log(`noRemovedTotal: ${noRemovedTotal}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
