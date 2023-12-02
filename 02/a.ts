import { readFileSync } from "fs";

const input = readFileSync("02/input.txt", "utf-8");
const lines = input.split("\n");

const limits: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

const sum = lines.reduce((sum, line) => {
  return sum + solveGame(line);
}, 0);

console.log(sum);

function solveGame(line: string): number {
  const gameId = +line.split(" ")[1].replace(":", "");

  const rounds = line
    .split(":")[1]
    .trim()
    .split(";")
    .map((el) => el.trim());

  if (
    rounds.some((round) => {
      const blocks = parseBlocks(round);
      return blocks.some(({ color, count }) => limits[color] < count);
    })
  ) {
    return 0;
  }

  return gameId;
}

function parseBlocks(round: string): { color: string; count: number }[] {
  return round.split(", ").reduce((blocks, el) => {
    const [count, color] = el.split(" ");
    blocks.push({ count: +count, color });
    return blocks;
  }, [] as { color: string; count: number }[]);
}
