import { readFileSync } from "fs";

const input = readFileSync("02/input.txt", "utf-8");
const lines = input.split("\n");

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

  const minimums: { [key: string]: number } = {
    red: 0,
    green: 0,
    blue: 0,
  };

  rounds.forEach((round) => {
    const blocks = parseBlocks(round);
    blocks.forEach(({ color, count }) => {
      minimums[color] = Math.max(minimums[color], count);
    });
  });

  return Object.values(minimums).reduce((a, b) => a * b);
}

function parseBlocks(round: string): { color: string; count: number }[] {
  return round.split(", ").reduce((blocks, el) => {
    const [count, color] = el.split(" ");
    blocks.push({ count: +count, color });
    return blocks;
  }, [] as { color: string; count: number }[]);
}
