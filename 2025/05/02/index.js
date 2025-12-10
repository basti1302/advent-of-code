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
    let newRange = [parseInt(startStr, 10), parseInt(endStr, 10)];

    let hasBeenMerged = false;
    let potentialRepeatedMerge = false;
    for (let rIdx = 0; rIdx < freshRanges.length; rIdx++) {
      const existingRange = freshRanges[rIdx];
      const startNew = newRange[0];
      const endNew = newRange[1];
      const startExisting = existingRange[0];
      const endExisting = existingRange[1];

      if (startNew > endExisting) {
        continue;
      }

      // xxxxxx
      //  xxxx
      if (startNew >= startExisting && endNew <= endExisting) {
        // no-op, the new range is already fully contained in an existing range
        hasBeenMerged = true;
        // console.log('(fully contained)');
        break;
      }

      //  xxxx
      // xxxxxx
      if (startNew <= startExisting && endNew >= endExisting) {
        // extend existing range to both sides
        existingRange[0] = startNew;
        existingRange[0] = startNew;
        existingRange[1] = endNew;
        // console.log('(extend existing to both sides)');
        hasBeenMerged = true;
        newRange = existingRange;

        if (potentialRepeatedMerge) {
          freshRanges.splice(rIdx - 1, 1);
          rIdx--;
        }

        // do not break, new range could overlap with next range as well
        potentialRepeatedMerge = true;

        continue;
      }

      // xxxx
      //   xxxx
      if (startNew >= startExisting && startNew <= endExisting) {
        // extend existing range to the right
        existingRange[1] = endNew;
        // console.log('(extend existing to the right)');
        hasBeenMerged = true;
        newRange = existingRange;
        // do not break, new range could overlap with next range as well
        potentialRepeatedMerge = true;
        continue;
      }

      //   xxxx
      // xxxx
      if (endNew >= startExisting && endNew <= endExisting) {
        // extend existing range to the left
        existingRange[0] = startNew;
        // console.log('(extend existing to the left)');
        hasBeenMerged = true;
        if (potentialRepeatedMerge) {
          freshRanges.splice(rIdx - 1, 1);
          rIdx--;
        }
        break;
      }
    }

    if (!hasBeenMerged) {
      // console.log('(no merge)');
      let hasBeenInserted = false;

      if (freshRanges.length === 0) {
        // console.log('(first element)');
        freshRanges.push(newRange);
        continue;
      } else if (newRange[0] < freshRanges[0][0]) {
        // console.log('(prepend before first)');
        freshRanges.unshift(newRange);
        continue;
      }

      for (let rIdx = 0; rIdx + 1 < freshRanges.length; rIdx++) {
        const r1 = freshRanges[rIdx];
        const r2 = freshRanges[rIdx + 1];
        if (r1[0] < newRange[0] && newRange[0] < r2[0]) {
          // console.log('(insert in the middle end)');
          freshRanges.splice(rIdx + 1, 0, newRange);
          hasBeenInserted = true;
          break;
        }
      }
      if (!hasBeenInserted) {
        // console.log('(append at end)');
        freshRanges.push(newRange);
      }
    }
  }

  let freshTotal = 0;
  for (let rIdx = 0; rIdx < freshRanges.length; rIdx++) {
    const r = freshRanges[rIdx];
    freshTotal += r[1] - r[0] + 1;
  }

  console.log(`# fresh total: ${freshTotal}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
