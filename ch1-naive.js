/**
 *  1 // 0
 *  1 1 // 1
 *  2 1 // 2
 *  1 2 1 1 // 3
 *  1 1 1 2 2 1 // 4
 */
function next(input) {
    // Suppose input.length >= 1, and read the first one.
    let ret = '', i = 0, cnt = 1;

    while(i < input.length - 1) {
        if (input[i] === input[i + 1]) {
            cnt += 1
        } else {
            ret += `${cnt}${input[i]}`;
            // reset
            cnt = 1;
        }
        i++;
    }

    ret += `${cnt}${input[i]}`
    return ret;
}

function ant(n) {
    let prev = '1';
    for (let i = 0; i < n; i++) {
        prev = next(prev);
        console.log(prev);
    }
    return prev;
}

ant(10);
