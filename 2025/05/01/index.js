import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const lines = contents.split(EOL);

  const freshRanges = [];
  let lineIdx = 0;
  for (; lineIdx < lines.length; lineIdx++) {
    const range = lines[lineIdx];
    if (range == null || range.trim() == '') {
      break;
    }
    const [startStr, endStr] = range.split('-');
    freshRanges.push([parseInt(startStr, 10), parseInt(endStr, 10)]);
  }

  let noFreshAndAvailable = 0;
  for (; lineIdx < lines.length; lineIdx++) {
    const availableIdStr = lines[lineIdx];
    if (availableIdStr == null || availableIdStr.trim() === '') {
      continue;
    }
    const availableId = parseInt(availableIdStr, 10);
    for (let frIdx = 0; frIdx < freshRanges.length; frIdx++) {
      if (availableId >= freshRanges[frIdx][0] && availableId <= freshRanges[frIdx][1]) {
        noFreshAndAvailable++;
        break;
      }
    }
  }

  console.log(`# fresh & available: ${noFreshAndAvailable}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
