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

function makeIterator() {
  return {
    next() {
      return { done: true }; // or {done: false, value ... }
    }
  }
}

function map(f, it) {
  return {
    next() {
      let { value, done } = it.next();
      if (done) {
        return { done: true };
      } else {
        return { done: false, value: f(value) };
      }
    }
  }
}

/* e.g
 * [[1,2], [3]]
 */
function concat(it) {
  let inner = null;
  return {
    next() {
      while (true) {
        // [1,2] -> [3]
        if (inner === null) {
          let { value, done } = it.next();
          if (done) {
            return { done: true }; // no more iterators
          } else {
            inner = value; // 첫 반복문 수행. inner = [1,2]
          }
        }

        // 첫 수행. { value: 1, done: false}
        // 두번째 수행. inner !== null 이므로 바로 여기에서 { value: 2, done: false}
        // 정리하면 1 -> 2 -> -> done -> 3 -> done 순
        let { value, done } = inner.next();

        if (done) {
          inner = null;
        } else {
          return { done: false, value };
        }
      }
    }
  }
}

function group(it) {
  let g = null;
  return {
    next() {
      while (true) {
        let { value, done } = it.next();
        if (done && g === null) {
          return { done: true };
        } else if (done) { // g !== null
          let result = g;
          g = null; // then done && g === null in the next iteration
          return { done: false, value: result };
        } else if (g === null) {
          g = [value]; // push one char
        } else if (g[0] === value) { // !done && g !== null && 리스트에 있는 것과 같은 것 -> 추가
          g.push(value);
        } else { // g[0] !== value
          let result = g;
          g = [value];
          // result 의 값이 바뀌는 것은 아님.
          // Q. g.push(3) 하면 result, g 둘 다 바뀌는데 왜 g = [1] 이렇게 assign 하면 result 는 그대로지?
          return { done: false, value: result }; // 이전에 쌓아뒀던 리스트 e.g. [1, 1, 1, 1] 는 return
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
