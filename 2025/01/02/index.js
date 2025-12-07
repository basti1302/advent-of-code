import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';

let zeroPositions = 0;
let position = 50;

try {
  const contents = await readFile('input.txt', { encoding: 'utf8' });
  const lines = contents.split(EOL);

  let index = 0;
  lines.forEach(line => {
    if (line == null || line.trim() == '') {
      return;
    }

    line = line.split('#')[0].trim();

    let sign = 1;
    const direction = line[0];
    if (direction == 'R') {
      // no-op
    } else if (direction == 'L') {
      sign = -1;
    } else {
      throw new Error(`invalid direction: ${direction}`);
    }
    const previousPosition = position;
    const previousZeroPositions = zeroPositions;

    const steps = line.substring(1);
    const fullRotations = Math.floor(steps / 100);
    const remainingSteps = steps - fullRotations * 100;
    const positionNoMod = position + sign * remainingSteps;
    position = mod(positionNoMod, 100);

    // each full rotation of the cylinder adds exactly one intermittent zero position
    zeroPositions += fullRotations;
    // if (fullRotations > 0) {
    //   console.log(
    //     `${index}: ${line}: multiple full rotations: <->: ${sign}, o: ${fullRotations}, #: ${remainingSteps}, ${previousPosition}->${position}, #0: ${previousZeroPositions} -> ${zeroPositions}`,
    //   );
    // }

    // account for turns where we end exactly on 0, not covered by the previous case
    if (position === 0 && remainingSteps !== 0) {
      zeroPositions++;
      // console.log(
      //   `${index}: ${line}: ending on 0: <->: ${sign}, #: ${steps}, ${previousPosition}->${position}, #0: ${previousZeroPositions} -> ${zeroPositions}`,
      // );
    }

    // account for things like going from 5 to 95 via L10
    if (
      position !== 0 &&
      previousPosition !== 0 && //
      positionNoMod !== position
    ) {
      zeroPositions++;
      //  console.log(
      //    `${index}: ${line}: <->: crossing 0 with remaining steps: ${sign}, o: ${fullRotations}, #: ${remainingSteps}, ${previousPosition}->${position}, #0: ${previousZeroPositions} -> ${zeroPositions}`,
      //  );
    }

    index++;
  });
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

console.log(`Zero positions: ${zeroPositions}, ending in ${position}`);

function mod(a, n) {
  return ((a % n) + n) % n;
}
