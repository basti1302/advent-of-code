import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

console.log('\n\n################');

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const lines = contents.split(EOL);

  var invalidIds = 0;
  var sumOfInvalidIds = 0;
  lines.forEach(line => {
    if (line == null || line.trim() == '') {
      return;
    }
    const ranges = line.split(',');
    ranges.forEach(range => {
      var invalidIdsForThisRange = 0;
      const [startS, endS] = range.split('-');
      const start = parseInt(startS, 10);
      const end = parseInt(endS, 10);
      for (var id = start; id <= end; id++) {
        if (isRepeatedSequence(id + '')) {
          invalidIds++;
          sumOfInvalidIds += id;
          invalidIdsForThisRange++;
        }
      }
      console.log(`${start} - ${end} -> ${invalidIdsForThisRange}`);
    });
  });
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

console.log(`number of invalid IDs: ${invalidIds}`);
console.log(`sum    of invalid IDs: ${sumOfInvalidIds}`);

function isRepeatedSequence(id) {
  if (id.length % 2 !== 0) {
    return false;
  }
  const firstHalf = id.substring(0, id.length / 2);
  const secondHalf = id.substring(id.length / 2);
  const isInvalid = firstHalf === secondHalf;
  return isInvalid;
}
