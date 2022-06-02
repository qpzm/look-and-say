function ant(n) {
    let s = iter([1]);
    for (let i = 0; i < n; i++) {
        s = next(s);
    }
    return s;
}

function next(ns) {
    return concat(map(g => iter([g.length, g[0]]), group(ns)));
}

/*
 * // This is a template of a function that returns an iterator.
 * function makeIterator() {
 *   return { // iterator object
 *      next() {
 *        return { done: true }; // or {done: false, value: ...}
 *      }
 *   }
 * }
 */

function map(f, it) {
    return {
        next() {
            let { value, done } = it.next();
            if (done) {
                return { done: true};
            } else {
                return { done: false, value: f(value) };
            }
        }
    }
}

/* e.g
 * input: [[1,2], [3]]
 * output: 1 -> 2 -> 3 -> done
 */
function concat(it) {
    let inner = null;
    return {
        next() {
            while (true) {
                if (inner == null) {
                    let { value, done } = it.next();
                    if (done) {
                        return { done: true };
                    } else {
                        inner = value;
                    }
                }
                let { value, done } = inner.next();
                if (done) {
                    inner = null;
                } else {
                    return { done: false, value}
                }
            }
        }
    }
}

//
/* e.g
 * input: [1, 1, 2]
 * output: 1 -> 1 -> done, 2 -> done
 */
function group(it) {
    let g = null;
    return {
        next() {
            while (true) {
                let { value, done } = it.next();
                if (done && g === null) {
                    return { done: true };
                } else if (done) {
                    let result = g;
                    g = null;
                    return { done: false, value: result };
                } else if (g === null) {
                    g = [value];
                } else if (g[0] === value) {
                    g.push(value);
                } else {
                    let result = g;
                    g = [value];
                    return { done: false, value: result };
                }
            }
        }
    }
}

function iter(obj) {
    return obj[Symbol.iterator]();
}

function uniter(it) {
    return {
        [Symbol.iterator]: function() {
            return it;
        }
    }
}

for (let a of uniter(ant(100))) {
    process.stdout.write(`${a}`);
}

