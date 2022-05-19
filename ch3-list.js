/**
 *  1 // 0
 *  1 1 // 1
 *  2 1 // 2
 *  1 2 1 1 // 3
 *  1 1 1 2 2 1 // 4
 */
function next(ns) {
    return ns.group().map(g => [g.length, g[0]]).flat();
}

const strToArr = (s) => (s.split(''));
const arrToStr = (l) => (l.reduce((acc, x) => acc + x, ''));

Array.prototype.group = function() {
    let ret = [], i = 0, cnt = 1
    let tmp = [];

    while(i < this.length) {
        if (tmp.length === 0 || tmp[0] === this[i]) {
            tmp.push(this[i]);
        } else {
            ret.push(tmp)
            tmp = [this[i]];
        }
        i++;
    }

    ret.push(tmp);

    return ret;
}

Array.prototype.flat = function() {
    return this.reduce((acc, l) => acc + arrToStr(l), '');
}

function ant(n) {
    let prev = '1';
    for (let i = 0; i < n; i++) {
        prev = next(strToArr(prev));
    }
    return prev;
}

console.log(ant(100));
