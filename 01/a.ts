import { readFileSync } from "fs";

const input = readFileSync("01/input.txt", "utf-8");
const lines = input.split("\n");

const sum = lines.reduce((sum, line) => {
  const numbers = line.replace(/\D+/g, "");
  const value = `${numbers[0]}${numbers[numbers.length - 1]}`;
  return sum + +value;
}, 0);

console.log(sum);
