export const collect = <T, U>(collector: (x: IterableIterator<T>) => U) => (iter: IterableIterator<T>) => {
  return collector(iter);
}

export const toArray = <T>(iter: IterableIterator<T>) => [...iter];

export const all = <T>(predicate: (x: T) => boolean) => {
  return (iter:IterableIterator<T>) => {
    for (let val of iter) {
      if (!predicate(val)) {
        return false;
      }
    }

    return true;
  }
}

export const any = <T>(predicate: (x: T) => boolean) => {
  return function(iter: IterableIterator<T>) {
    let next = iter.next();
    while(!predicate(next.value) && !next.done) {
      next = iter.next();
    }
    return predicate(next.value);
  }
}

export const count = <T>(iter: IterableIterator<T>) => {
  let count = 0;
  for (let _ of iter) {
    count++;
  }
  return count;
}


export const find = <T>(predicate: (x: T) => boolean) => {
  return (iter: IterableIterator<T>) => {
    let next = iter.next();
    while (!next.done && !predicate(next.value)) {
      next = iter.next();
    }
    return next.value;
  }
}

export const max = <T>(iter: IterableIterator<T>) => {
  let max = iter.next().value;
  for (let val of iter) {
    if (val > max) {
      max = val;
    }
  }

  return max;
}

export const maxByKey = <T, U>(fn: (x: T) => U) => {
  return (iter: IterableIterator<T>) => {
    let max = iter.next().value;
    for (let val of iter) {
      if (fn(val) >= fn(max)) {
        max = val
      }
    }

    return max;
  }
}

export const min = <T>(iter: IterableIterator<T>) => {
  let min = iter.next().value;
  for (let val of iter) {
    if (val < min) {
      min = val;
    }
  }

  return min;
}

export const minByKey = <T, U>(fn: (x: T) => U) => {
  return (iter: IterableIterator<T>) => {
    let min = iter.next().value;
    for (let val of iter) {
      if (fn(val) <= fn(min)) {
        min = val
      }
    }

    return min;
  }
}

interface PartitionResult<T> {
  0: T[];
  1: T[];
}

export const partition = <T>(predicate: (x: T) => boolean) => {
  return (iter: IterableIterator<T>) => {
    let result: PartitionResult<T> = { 0: [], 1: [] };
    for (let val of iter) {
      if (predicate(val)) {
        result[0].push(val);
      } else {
        result[1].push(val);
      }
    }

    return result;
  }
}

export const position = <T>(predicate: (x: T) => boolean) => {
  return (iter: IterableIterator<T>) => {
    let count = 0;
    for (let val of iter) {
      if (predicate(val)) {
        return count;
      }
      count += 1;
    }

    return null;
  }
}

export const product = (iter: IterableIterator<number>) => {
  let result = 1;
  for (let val of iter) {
    result *= val;
  }
  return result;
}

// TODO: test recursive vs non-recursive implementation
// sometimes called fold
export const reduce = <T, U>(reducer: (acc: U, x: T) => U, initial: U) => {
  return function(iter: IterableIterator<T>): U {
    let currentState = initial;
    for (let val of iter) {
      currentState = reducer(currentState, val);
    }
    return currentState;
  };
}

export function sum(iter: IterableIterator<number>): number {
  let result = iter.next().value;
  for (let val of iter) {
    result += val;
  }

  return result;
}

