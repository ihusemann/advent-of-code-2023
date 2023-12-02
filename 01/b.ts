import { readFileSync } from "fs";

const input = readFileSync("01/input.txt", "utf-8");
const lines = input.split("\n");

const numbers =
  "one 1 two 2 three 3 four 4 five 5 six 6 seven 7 eight 8 nine 9".split(" ");

const sum = lines.reduce((sum, line) => sum + solveLine(parseIndexes(line)), 0);
console.log(sum);

// get the indexes of every occurence of each number
function parseIndexes(line: string): { index: number; value: number }[] {
  return numbers.reduce((idxs, number, i) => {
    let startingIdx = 0;
    while (true) {
      const idx = line.indexOf(number, startingIdx);

      if (idx === -1) {
        break;
      }

      idxs.push({
        index: idx,
        value: i % 2 === 0 ? +numbers[i + 1] : +numbers[i], // even indexes are the text values, like `one`.  convert to the numeric value at the next index.
      });

      startingIdx = idx + 1;
    }

    return idxs;
  }, [] as { index: number; value: number }[]);
}

// combine the values of the first and last found index
function solveLine(indexes: { index: number; value: number }[]): number {
  indexes.sort((a, b) => a.index - b.index);

  return +`${indexes[0].value}${indexes[indexes.length - 1].value}`;
}
