export const chain = <T>(firstIter: IterableIterator<T>) => {
  return function*(secondIter: IterableIterator<T>) {
    for (let val of firstIter) {
      yield val;
    }

    for (let val of secondIter) {
      yield val;
    }
  }
}

export const enumerate = function*<T>(iter: IterableIterator<T>) {
  let count = 0;
  for (let val of iter) {
    yield { count: count, value: val };
    count += 1;
  }
}

export const filter = <T>(predicate: (x: T) => boolean) => {
  return function*(iter: IterableIterator<T>) {
      for (let val of iter) {
          if (predicate(val)) {
              yield val;
          }
      }
  };
}

export const flatMap = <T, U>(fn: (x: T) => Iterable<U>) => {
  return function*(iter: IterableIterator<T>) {
    for (let val of iter) {
      for (let innerVal of fn(val)) {
        yield innerVal;
      }
    }
  };
}

// TODO: look into whether it should be IterableIterator<IterableIterator<T> or as is, IterableIterator<Iterable<T>>
export const flatten = function*<T>(iter: IterableIterator<Iterable<T>>) {
  for (let innerIterable of iter) {
    for (let val of innerIterable) {
      yield val;
    }
  }
}


export const map = <T, U>(fn: (x: T) => U) => {
  return function*(iter: IterableIterator<T>) {
      for (let val of iter) {
          yield fn(val);
      }
  };
}

export const nth = (n: number) => {
  return function*<T>(iter: IterableIterator<T>) {
    let count = 0;
    for (let val of iter) {
      if (count === n) {
        yield val;
      }
      count += 1;
    }
  }
}


// TODO - needs test
export const scan = <State, A>(reducer: (acc: State, next: A) => State, seed: State) => {
  return function* (iter: IterableIterator<A>) {
    let currentState = seed;
    for (let val of iter) {
      const nextState = reducer(currentState, val);
      yield nextState;
      currentState = nextState;
    }
  }
}


export const skip = (n: number) => {
  return function*<T>(iter: IterableIterator<T>) {
    // consume
    for (let i = 0; i < n; i++) {
      iter.next()
    }

    for (let val of iter) {
      yield val;
    }
  }
}

export const skipWhile = <T>(predicate: (x: T) => boolean) => {
  return function*(iter: IterableIterator<T>) {
    let next = iter.next();
    while(predicate(next.value)) {
      next = iter.next();
    }

    while(!next.done) {
      yield next.value;
      next = iter.next();
    }
  }
}

export const take = (n: number) => {
  return function*<T>(iter: IterableIterator<T>) {
    for (let i = 0; i < n; i++) {
      yield iter.next().value;
    }
  }
}

export const takeWhile = <T>(predicate: (x: T) => boolean) => {
  return function*(iter: IterableIterator<T>) {
    let next = iter.next().value;
    while (predicate(next)) {
      yield next;
      next = iter.next().value;
    }
  }
}


export const zip = <T>(firstIter: IterableIterator<T>) => {
  return function*<U>(secondIter: IterableIterator<U>) {
    let first = firstIter.next();
    let second = secondIter.next();
    while(!first.done && !second.done) {
      yield { 0: first.value, 1: second.value };
      first = firstIter.next();
      second = secondIter.next();
    }
  }
}