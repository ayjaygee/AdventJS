const { readFromFile } = require("../../utils");

/** 
 * Puzzle input is a string of parentheses that give instructions on which stairs Santa should take
 * a "(" indicates to go up a floor
 * a ")" indicates to go down a floor
 * Santa starts at floor 0
 *  
 * Part 1 - What floor will Santa finish on?
 * 
 * Part 2 - What is the first instruction that will send Santa below the starting floor?
 *          - Instructions are 1 indexed
 */


function part1(input) {
  return input
    .split("")
    .reduce((total, current) => (current === "(" ? total + 1 : total - 1), 0);
}

function part2(input) {
  let output = 0;
  for (c in input) {
    if (input[c] == "(") output++;
    else output--;
    if (output < 0) {
      return ++c;
    }
  }
}

const filename = process.argv[2];
readFromFile(filename, (fileData) => {
  console.log("Part 1:", part1(fileData));
  console.log("Part 2:", part2(fileData));
});
