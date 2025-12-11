import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const problems = [];
  const lines = contents.split(EOL);

  let operators;
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    if (line == null || line.trim() == '') {
      break;
    }
    const numbers = line.trim().split(/\s+/);
    if (numbers[0] === '*' || numbers[0] === '+') {
      operators = numbers;
      break;
    }

    for (let numIdx = 0; numIdx < numbers.length; numIdx++) {
      if (problems.length <= numIdx) {
        problems.push([]);
      }
      problems[numIdx].push(parseInt(numbers[numIdx], 10));
    }
  }

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
