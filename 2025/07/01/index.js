import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

const contents = await readFile('input.txt', { encoding: 'utf8' });
const lines = contents.split(EOL);

const width = lines[0].length;
const beams = Array(width).fill(false);
let splitCount = 0;

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  for (let x = 0; x < line.length; x++) {
    const c = line[x];
    switch (c) {
      case '.':
        continue;
      case 'S':
        beams[x] = true;
        break;
      case '^':
        if (beams[x]) {
          splitCount++;
          beams[x - 1] = true;
          beams[x] = false;
          beams[x + 1] = true;
          break;
        }
    }
    // console.log(beams.map(v => (v ? '|' : '.')).join(''));
  }
}

console.log(`splits: ${splitCount}`);
