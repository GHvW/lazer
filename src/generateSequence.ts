
// TODO - needs test
function* generateSequence<A>(seed: A, nextFn: (t: A) => A | null): Generator<A, void, undefined> {
    let current = seed;
    while (true) {
        const next = nextFn(current);
        if (next === null) {
            return;
        }
        yield next;
        current = next;
    }
}


// TODO - needs test & move to different file?
function* unfoldSequence<State, A>(seed: State, gen: (s: State) => [A, State] | null): Generator<A, void, undefined> {
    let current = seed;
    while (true) {
        const result = gen(current);
        if (result === null) {
            return;
        }
        yield result[0];
        current = result[1];
    }
}