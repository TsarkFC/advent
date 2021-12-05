import operator

def not_null(s):
    return s != ""

def parse_boards(lines):
    boards = []
    board = []

    for line in lines:
        if line != "":
            l = line.strip().split(" ")
            l = list(filter(not_null, l))
            board.append(l)
        else:
            boards.append(board)
            board = []
    boards.append(board)
    return boards

def solve(op, start):
    file = open("input.txt", "r")
    lines = file.read().splitlines()
    numbers = lines[0].split(",")
    d = {}
    for i in range(len(numbers)):
        d[numbers[i]] = i+1

    boards = parse_boards(lines[2:])
    n = [start, -1]
    sets = []

    for i in range(len(boards)):
        board = boards[i]
        board_set = set()
        rows = [0] * 5
        cols = [0] * 5

        for row in range(len(board)):
            for col in range(len(board[row])):
                num = board[row][col]
                board_set.add(int(num))
                rows[row] = max(rows[row], d.get(num, float("inf")))
                cols[col] = max(cols[col], d.get(num, float("inf")))
        sets.append(board_set)
        r = min(min(rows), min(cols))
        if op(n[0], r):
            n = [r, i]

    round_won = n[0] - 1
    board_pos = n[1]
    set_won = sets[board_pos]

    s = sum(sets[board_pos])
    for i in range(round_won + 1):
        if int(numbers[i]) in set_won:
            s -= int(numbers[i])

    return s * int(numbers[round_won])

def one():
    return solve(operator.gt, float("inf"))

print(one())

def two():
    return solve(operator.lt, float("-inf"))

print(two())