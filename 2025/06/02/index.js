import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const lines = contents.split(EOL);

  const maxLineLength = lines.reduce((max, line) => {
    if (line.length > max) {
      return line.length;
    }
    return max;
  }, 0);

  let problems = [];
  let pIdx = 0;
  for (let column = maxLineLength - 1; column >= 0; column--) {
    let numberAsString = '';
    for (let lineIdx = 0; lineIdx < lines.length - 2; lineIdx++) {
      const line = lines[lineIdx];
      if (line.length >= column) {
        numberAsString += line.charAt(column);
      } else {
        numberAsString += ' ';
      }
    }
    numberAsString = numberAsString.trim();
    if (numberAsString.length > 0) {
      const number = parseInt(numberAsString.trim(), 10);
      if (problems.length < pIdx + 1) {
        problems.push([]);
      }
      problems[pIdx].push(number);
    } else {
      // whitespace-only colum
      pIdx++;
    }
  }
  problems = problems.reverse();
  const operatorLine = lines[lines.length - 2];
  const operators = operatorLine
    .split(/\s+/)
    .map(o => o.trim())
    .filter(o => o !== '');

  const results = [];
  for (let pIdx = 0; pIdx < problems.length; pIdx++) {
    const problem = problems[pIdx];
    const operator = operators[pIdx];
    results.push(0);
    if (operator === '*') {
      results[pIdx] = 1;
    }
    for (let nIdx = 0; nIdx < problem.length; nIdx++) {
      switch (operator) {
        case '+':
          results[pIdx] += problem[nIdx];
          break;
        case '*':
          results[pIdx] *= problem[nIdx];
          break;
        default:
          throw new Error(`unknown operator: ${operator}`);
      }
    }
  }

  let total = 0;
  for (let rIdx = 0; rIdx < results.length; rIdx++) {
    total += results[rIdx];
  }

  console.log(`total: ${total}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
