const { readFromFile } = require("../../utils");
/** The elves are running low on wrapping paper, and so they need to submit an
 * order for more. They have a list of the dimensions (length l, width w, and
 * height h) of each present, and only want to order exactly as much as they need.
 *
 * Fortunately, every present is a box (a perfect right rectangular prism), which
 * makes calculating the required wrapping paper for each gift a little easier:
 *  find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l. The elves
 * also need a little extra paper for each present: the area of the smallest side.
 *
 * For example:
 *
 * A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of
 * wrapping paper plus 6 square feet of slack, for a total of 58 square feet.
 *
 * A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet
 * of wrapping paper plus 1 square foot of slack, for a total of 43 square feet.
 *
 * All numbers in the elves' list are in feet.
 * How many total square feet of wrapping paper should they order?
 */

function part1(input) {
  const data = input.split("\n");
  let output = 0;
  for (i in data) {
    const [l, h, w] = data[i].split("x");
    const smallestArea = Math.min(l*h, l*w, h*w)
    output += 2*l*w + 2*w*h + 2*h*l + smallestArea;
  }
  return output
}

const filename = process.argv[2];
readFromFile(filename, (fileData) => {
  console.log(part1(fileData));
});
