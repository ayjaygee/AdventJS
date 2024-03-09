const { readFromFile } = require("../../utils");

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
