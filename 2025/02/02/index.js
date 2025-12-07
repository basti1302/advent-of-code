import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

let invalidIds = 0;
let sumOfInvalidIds = 0;

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const lines = contents.split(EOL);

  lines.forEach(line => {
    if (line == null || line.trim() == '') {
      return;
    }
    const ranges = line.split(',');
    ranges.forEach(range => {
      let invalidIdsForThisRange = 0;
      const [startS, endS] = range.split('-');
      const start = parseInt(startS, 10);
      const end = parseInt(endS, 10);
      for (let id = start; id <= end; id++) {
        if (isInvalidId(id + '')) {
          invalidIds++;
          sumOfInvalidIds += id;
          invalidIdsForThisRange++;
        }
      }
    });
  });
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

console.log(`number of invalid IDs: ${invalidIds}`);
console.log(`sum    of invalid IDs: ${sumOfInvalidIds}`);

function isInvalidId(id) {
  const totalLength = id.length;
  nextPartLength: for (let partLength = 1; partLength <= totalLength / 2; partLength++) {
    if (totalLength % partLength !== 0) {
      continue;
    }
    const pattern = id.substring(0, partLength);
    for (let i = partLength; i <= totalLength - partLength; i += partLength) {
      const nextPart = id.substring(i, i + partLength);
      if (nextPart !== pattern) {
        continue nextPartLength;
      }
    }
    return true;
  }
  return false;
}
