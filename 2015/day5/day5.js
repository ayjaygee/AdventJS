const { readFromFile } = require("../../utils");
/**
 *
 * --- Day 5: Doesn't He Have Intern-Elves For This? ---
 * Santa needs help figuring out which strings in his text file are naughty or nice.
 *
 * A nice string is one with all of the following properties:
 *
 * It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
 * It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
 * It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
 *
 * For example:
 *
 * ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
 * aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
 * jchzalrnumimnmhp is naughty because it has no double letter.
 * haegwjzuvuyypxyu is naughty because it contains the string xy.
 * dvszwmarrgswjxmb is naughty because it contains only one vowel.
 *
 * How many strings are nice?
 */

function hasDoubleLetter(key) {
  let pairsKeys = Object.keys(key);
  for (let key of pairsKeys) {
    if (key[0] == key[1]) return true;
  }
  return false;
}

function countVowels(input) {
  const vowelList = ["a", "e", "i", "o", "u"];
  let vowels = 0;
  for (let key in input) {
    if (vowelList.includes(key)) vowels += input[key].length;
  }
  return vowels;
}

function hasForbiddenLetters(input) {
  const forbiddenLetters = ["ab", "cd", "pq", "xy"];
  for (let key in input) {
    if (forbiddenLetters.includes(key)) return true;
  }
  return false;
}

function getCharacterMap(input) {
  const singles = {};
  const pairs = {};
  for (let i = 0; i < input.length; i++) {
    if (Array.isArray(singles[input[i]])) singles[input[i]].push(i);
    else singles[input[i]] = [i];
    if (i < input.length - 1) {
      const candidate = input[i] + input[i + 1];
      if (Array.isArray(pairs[candidate])) pairs[candidate].push(i);
      else pairs[candidate] = [i];
    }
  }
  return { singles, pairs };
}

function part1(input) {
  let counter = 0;
  for (let line of input.split("\n")) {
    const { singles, pairs } = getCharacterMap(line);

    if (countVowels(singles) < 3) continue;
    if (!hasDoubleLetter(pairs)) continue;
    if (hasForbiddenLetters(pairs)) continue;
    counter++;
  }
  return counter;
}

const filename = process.argv[2];
readFromFile(filename, (fileData) => {
  console.log(
    "Part 1 Test - Follows all rules - Should be 1:\t\t",
    part1("ugknbfddgicrmopn")
  );
  console.log(
    "Part 1 Test - Contains forbidden combo - Should be 0:\t",
    part1("haegwjzuvuyypxyu")
  );
  console.log(
    "Part 1 Test - No doubles - Should be 0:\t\t\t",
    part1("jchzalrnumimnmhp")
  );
  console.log(
    "Part 1 Test - Not enough Vowels - Should be 0:\t\t",
    part1("dvszwarrgswjxmb")
  );
  console.log("Part 1:", part1(fileData));
});
