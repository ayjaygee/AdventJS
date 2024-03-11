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
 *
 * --- Part Two ---
 * Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.
 *
 * Now, a nice string is one with all of the following properties:
 *
 * It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
 * It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
 * For example:
 *
 * qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
 * xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
 * uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
 * ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
 *
 * How many strings are nice under these new rules?
 *
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

function hasRepeatingPair(pairs) {
  for (let key in pairs) {
    if (pairs[key].length < 2) continue;
    if (key[0] != key[1] && pairs[key].length > 1) return true;
    if (pairs[key].some((index) => index - pairs[key][0] > 1)) return true;
  }
  return false;
}

function hasIndexSeparatedRepeat(singles) {
  for (let key in singles) {
    if (singles[key].length < 2) continue;
    for (let i = 0; i < singles[key].length - 1; i++) {
      if (singles[key][i + 1] - singles[key][i] == 2) return true;
    }
  }
  return false;
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

function part2(input) {
  let counter = 0;
  for (let line of input.split("\n")) {
    const { singles, pairs } = getCharacterMap(line);

    if (!hasRepeatingPair(pairs)) continue;
    if (!hasIndexSeparatedRepeat(singles)) continue;

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
  console.log(
    "\nPart 2 Test - Follows new rules - Should be 1:",
    part2("qjhvhtzxzqqjkmpb")
  );
  console.log("Part 2 Test - Follows new rules - Should be 1:", part2("xxyxx"));
  console.log(
    "Part 2 Test - Fails the repeat letter rule - Should be 0:",
    part2("uurxcstgmygtbstg")
  );
  console.log("Part 2:", part2(fileData));
});
