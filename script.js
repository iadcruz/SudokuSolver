let board = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
];

function evaluate(a, b) {
    let visited = [];
    for (let i = 0; i < 9; i ++) {
        let curr = board[b][i];
        if (curr != 0) {
            if (visited.indexOf(curr) != -1) {
                return false;
            } else {
                visited.push(curr);
            }
        }
    }

    visited = [];
    for (let j = 0; j < 9; j ++) {
        let curr = board[j][a];
        if (curr != 0) {
            if (visited.indexOf(curr) != -1) {
                return false;
            } else {
                visited.push(curr);
            }
        }
    }

    visited = [];
    let q1 = Math.floor(a / 3);
    let q2 = Math.floor(b / 3);

    for (let i = q1 * 3; i < q1 * 3 + 3; i ++) {
        for (let j = q2 * 3; j < q2 * 3 + 3; j ++) {
            let curr = board[j][i];
            if (curr != 0) {
                if (visited.indexOf(curr) != -1) {
                    return false;
                } else {
                    visited.push(curr);
                }
            }
        }
    }

    return true;
}

function search(i, j, k) {
    if (i == 9) {
        i = 0; 
        j += 1;
    }
    if (j == 9) {
        return true;
    }
    if (k == 10) {
        return false;
    }
    if (board[j][i] == 0) {
        board[j][i] = k;
        printBoard();

        if (!evaluate(i, j)) {
            board[j][i] = 0;
            return search(i, j, k+1);
        } else if (!search(i+1, j, 1)) {
            board[j][i] = 0;
            return search(i, j, k+1);
        } else {
            return true;
        }
    } else {
        return search(i+1, j, 1);
    }
}

function printBoard() {
    for (let i = 0; i < 9; i ++) {
        let str = "";
        for (let j = 0; j < 9; j ++) {
            str += board[i][j] + " ";
        }
        console.log(str);
    }
    console.log("--------------");
}

search(0, 0, 1);
printBoard();