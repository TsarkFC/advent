def solve(diagonals):
    file = open("input.txt", "r")
    lines = file.read().splitlines()

    l = []
    m = 0
    for line in lines:
        ins = line.split(" -> ")
        [x1, y1] = ins[0].split(",")
        [x2, y2] = ins[1].split(",")
        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
        m = max(m, x1, y1, x2, y2)
        l.append(sorted([[x1, y1], [x2, y2]]))
    m += 1

    overlap = 0
    final = [[0 for _ in range(m)] for _ in range(m)]
    for [[x1, y1], [x2, y2]] in l:
        if diagonals:
            s = int(slope(x1, y1, x2, y2))
            if s == 1 or s == -1:
                x = x1
                y = y1
                while x != x2 and y != y2:
                    if final[y][x] == 1: overlap += 1
                    final[y][x] += 1
                    y += s
                    x += 1
                if final[y][x] == 1: overlap += 1
                final[y][x] += 1

        if x1 == x2:
            for i in range(y1, y2+1):
                if final[i][x1] == 1: overlap += 1
                final[i][x1] += 1
        if y1 == y2:
            for i in range(x1, x2+1):
                if final[y1][i] == 1: overlap += 1
                final[y1][i] += 1

    return overlap

def one():
    return solve(False)

print(one())

def slope(x1, y1, x2, y2):
    if x2 == x1: return 0
    return (y2-y1) / (x2-x1)

def two():
    return solve(True)

print(two())