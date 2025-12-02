import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

var zeroPositions = 0;

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const lines = contents.split(EOL);

  var position = 50;
  lines.forEach(line => {
    if (line == null || line.trim() == '') {
      return;
    }
    var sign = 1;
    const direction = line[0];
    if (direction == 'R') {
      // no-op
    } else if (direction == 'L') {
      sign = -1;
    } else {
      throw new Error(`invalid direction: ${direction}`);
    }
    const steps = line.substring(1);
    const previousPosition = position;
    position = mod(position + sign * steps, 100);
    if (position === 0) {
      console.log(line, sign, steps, previousPosition, position);
      zeroPositions++;
    }
  });
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

console.log(`Zero positions: ${zeroPositions}`);

function mod(a, n) {
  return ((a % n) + n) % n;
}
