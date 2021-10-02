import { chain, enumerate, filter, flatMap, flatten } from "../src/sequenceOperations";

let arr = [1, 2, 3];
let bigArr = [1, 2, 3, 4, 5, 6];

test("Seq iter(): allows you to exhaust the underlying IterableIterator", () => {
  let seq = arr.values();

  expect(seq.next().value).toBe(1);
  expect(seq.next().value).toBe(2);
  expect(seq.next().value).toBe(3);
  expect(seq.next().value).toBe(undefined);
});


test("any: returns true if any values match the predicate, false if not. Short circuits on match leaving the rest unconsumed", () => {
  let seq = bigArr.values();

  expect(any((x: number) => x % 2 === 0)(seq)).toBe(true);
  expect(seq.next().value).toBe(3);
});

test("test chain: chains two iterators together to yield values from the first then the second", () => {
  let arr1 = [0, 2];
  let arr2 = [4, 9];
  let seq = chain(arr1.values())(arr2.values());

  expect(seq.next().value).toBe(0);
  expect(seq.next().value).toBe(2);
  expect(seq.next().value).toBe(4);
  expect(seq.next().value).toBe(9);
  expect(seq.next().value).toBe(undefined);
});

test("enumerate: creates an iterator that includes the current iteration count as well as the next value", () => {
  let seq = enumerate(arr.values());

  expect(seq.next().value).toEqual({ count: 0, value: 1 });
  expect(seq.next().value).toEqual({ count: 1, value: 2 });
  expect(seq.next().value).toEqual({ count: 2, value: 3 });
  expect(seq.next().value).toBe(undefined);
});

test("filter: filters out values that do not satisfy the predicate", () => {
  let seq = filter((x: number) => x % 2 === 0)(arr.values());

  expect(seq.next().value).toBe(2);
  expect(seq.next().value).toBe(undefined);
});

test("flatMap: applies a mapping function to each element of the iterable and then flattens it", () => {
  let words = ["hi", "bye", "good"];
  let seq = flatMap((x: string) => x.split(""))(words.values());

  expect(seq.next().value).toBe("h");
  expect(seq.next().value).toBe("i");
  expect(seq.next().value).toBe("b");

  let last = null;
  for (let val of seq) {
    last = val;
  }
  expect(last).toBe("d");
  expect(seq.next().value).toBe(undefined);
});


test("flatten: flattens a 2d iterable to a 1d iterable of the same elements", () => {
  let twoD = [[1], [2], [3]];
  let seq = flatten(twoD.values());

  expect(seq.next().value).toBe(1);
  expect(seq.next().value).toBe(2);
  expect(seq.next().value).toBe(3);
  expect(seq.next().value).toBe(undefined);
});


test("forEach: forEach consumes the iterator, mimicing a for-loop's behavior", () => {
  let total = 10;

  forEach((x: number) => total += x)(bigArr.values());

  expect(total).toBe(31);
});


test("map: applies a mapping function to each element of the iterable", () => {
  let seq = map((x: number) => x * x)(arr.values());

  expect(seq.next().value).toBe(1);
  expect(seq.next().value).toBe(4);
  expect(seq.next().value).toBe(9);
  expect(seq.next().value).toBe(undefined);
});

test("nth: return the nth element from the sequence", () => {
  let seq = nth(1)(arr.values());

  expect(seq.next().value).toBe(2);
  expect(seq.next().value).toBe(undefined);
});

test("skip: skip n elements of the sequence, consuming them", () => {
  let seq = skip(4)(bigArr.values());

  expect(seq.next().value).toBe(5);
  expect(seq.next().value).toBe(6);
  expect(seq.next().value).toBe(undefined);
});


test("skipWhile: skip until predicate satisfied, consuming skipped values", () => {
  let seq = skipWhile((x: number) => x < 5)(bigArr.values());

  expect(seq.next().value).toBe(5);
  expect(seq.next().value).toBe(6);
  expect(seq.next().value).toBe(undefined);
});


test("take: yields the first n elements of the iterator", () => {
  let seq = take(3)(bigArr.values());

  expect(seq.next().value).toBe(1);
  expect(seq.next().value).toBe(2);
  expect(seq.next().value).toBe(3);
  expect(seq.next().value).toBe(undefined);
});

test("takeWhile: take until predicate is false", () => {
    let seq = takeWhile((x: number) => x < 2)(arr.values());

    expect(seq.next().value).toBe(1);
    expect(seq.next().value).toBe(undefined);
});


test("zip: takes two iterators and returns a new iterator that iterates over both at the same time", () => {
  let one = [1, 2, 3];
  let two = [4, 5, 6];
  let seq = zip(one.values())(two.values());

  expect(seq.next().value).toEqual({ 0: 1, 1: 4});
  expect(seq.next().value).toEqual({ 0: 2, 1: 5 });
  expect(seq.next().value).toEqual({ 0: 3, 1: 6 });
  expect(seq.next().value).toBe(undefined);
});

