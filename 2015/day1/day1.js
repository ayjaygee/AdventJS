const { readFromFile } = require("../../utils");

function part1(input) {
  return input
    .split("")
    .reduce((total, current) => (current === "(" ? total + 1 : total - 1), 0);
}

const filename = process.argv[2];
readFromFile(filename, (fileData) => {
  console.log("Part 1:", part1(fileData));
});
