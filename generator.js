function ant(n) {
    let s = gen([1]);
    for (let i = 0; i < n; i++) {
        s = next(s);
    }
    return s;
}

function* next(g) {
    let prev = g.next().value;
    let count = 1;
    for (let value of g) { // generator g is iterable i.e. next() is implemented
        if (value === prev) {
            count++;
        } else {
            yield* [count, prev];
            prev = value;
            count = 1;
        }
    }
    yield* [count, prev]; // 마지막으로 남아있던 [count, prev] 반환
}

function* gen(obj) {
    yield* obj; // delegate to obj generator
}

function* concat(gs) {
    for (let g of gs) {
        yield* g;
    }
}

// TODO
// group, map

for (let a of ant(10000)) {
    process.stdout.write(`${a}`);
}
/**
 * /Users/hyunmin/Development/study/look-and-say/generator.js:10
 let prev = g.next().value;
 ^

 RangeError: Maximum call stack size exceeded
 at next (<anonymous>)
 at next (/Users/hyunmin/Development/study/look-and-say/generator.js:10:18)
 at next (<anonymous>)
 at next (/Users/hyunmin/Development/study/look-and-say/generator.js:10:18)
 at next (<anonymous>)
 at next (/Users/hyunmin/Development/study/look-and-say/generator.js:10:18)
 at next (<anonymous>)
 at next (/Users/hyunmin/Development/study/look-and-say/generator.js:10:18)
 at next (<anonymous>)
 at next (/Users/hyunmin/Development/study/look-and-say/generator.js:10:18)

 Process finished with exit code 1

 */