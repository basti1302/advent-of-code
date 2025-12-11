import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

const contents = await readFile('input.txt', { encoding: 'utf8' });
const lines = contents.split(EOL);

const width = lines[0].length;
const beams = Array(width).fill(0);

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  for (let x = 0; x < line.length; x++) {
    const c = line[x];
    switch (c) {
      case '.':
        continue;
      case 'S':
        beams[x] = 1;
        break;
      case '^':
        if (x - 1 >= 0) {
          beams[x - 1] += beams[x];
        }
        if (x + 1 < width) {
          beams[x + 1] += beams[x];
        }
        beams[x] = 0;
        break;
    }
  }
}

const timelines = beams.reduce((a, b) => a + b, 0);

console.log(`timelines: ${timelines}`);
