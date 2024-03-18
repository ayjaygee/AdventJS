const { readFromFile } = require("../../utils");
/**
 *
 * --- Day 6: Probably a Fire Hazard ---
 * Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.
 * 
 * Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.
 * 
 * Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.
 * 
 * To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.
 * 
 * For example:
 * 
 * turn on 0,0 through 999,999 would turn on (or leave on) every light.
 * toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
 * turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.

 * After following the instructions, how many lights are lit?*
 *
 */

function getStartCoord(coodPair) {
  return coodPair
    .split(" through ")[0]
    .split(",")
    .map((v) => parseInt(v));
}

function getEndCoord(coordPair) {
  return coordPair
    .split(" through ")[1]
    .split(",")
    .map((v) => parseInt(v));
}

function processCoords(coordPair, onMap, cb) {
  let counter = 0;
  let [xStart, yStart] = getStartCoord(coordPair);
  let [xEnd, yEnd] = getEndCoord(coordPair);
  for (let x = xStart; x <= xEnd; x++) {
    for (let y = yStart; y <= yEnd; y++) {
      counter += cb(x + "," + y, onMap);
    }
  }
  return counter;
}

function toggle(coord, onMap) {
  if (onMap[coord]) {
    onMap[coord] = false;
    return -1;
  } else {
    onMap[coord] = true;
    return 1;
  }
}

function toggle2(coord, onMap) {
  onMap[coord] = (onMap[coord] || 0) + 2;
  return 2;
}

function turnOff(coord, onMap) {
  if (!onMap[coord]) return 0;
  onMap[coord] = false;
  return -1;
}

function turnOff2(coord, onMap) {
  if (!onMap[coord]) return 0;
  onMap[coord] = Math.max(0, onMap[coord] - 1);
  return -1;
}

function turnOn(coord, onMap) {
  if (onMap[coord]) return 0;
  onMap[coord] = true;
  return 1;
}

function turnOn2(coord, onMap) {
  onMap[coord] = (onMap[coord] || 0) + 1;
  return 1;
}

function part1(input) {
  let lightsOn = 0;
  let onMap = {};
  for (let line of input.split("\n")) {
    switch (true) {
      case line.startsWith("turn on"):
        lightsOn += processCoords(line.split("turn on ")[1], onMap, turnOn);
        break;
      case line.startsWith("turn off"):
        lightsOn += processCoords(line.split("turn off ")[1], onMap, turnOff);
        break;
      case line.startsWith("toggle"):
        lightsOn += processCoords(line.split("toggle ")[1], onMap, toggle);
        break;
      default:
        console.log("default");
    }
  }
  return lightsOn;
}

function part2(input) {
  let lightsOn = 0;
  let onMap = {};
  for (let line of input.split("\n")) {
    switch (true) {
      case line.startsWith("turn on"):
        lightsOn += processCoords(line.split("turn on ")[1], onMap, turnOn2);
        break;
      case line.startsWith("turn off"):
        lightsOn += processCoords(line.split("turn off ")[1], onMap, turnOff2);
        break;
      case line.startsWith("toggle"):
        lightsOn += processCoords(line.split("toggle ")[1], onMap, toggle2);
        break;
      default:
        console.log("default");
    }
  }
  return lightsOn;
}

const filename = process.argv[2];
readFromFile(filename, (fileData) => {
  console.log(
    "Part 1 Test - should be 1,000,000:",
    part1("turn on 0,0 through 999,999")
  );
  console.log(
    "Part 1 Test - should be 1,000:",
    part1("toggle 0,0 through 999,0")
  );
  console.log(
    "Part 1 Test - should be 0:",
    part1("turn off 499,499 through 500,500")
  );
  console.log("Part 1:", part1(fileData));
  console.log("Part 2 Test - should be 1:", part2("turn on 0,0 through 0,0"));
  console.log(
    "Part 2 Test - should be 2,000,000:",
    part2("toggle 0,0 through 999,999")
  );
  console.log("Part 2:", part2(fileData));
});
