import operator

def one():
    file = open("input.txt", "r")
    lines = file.read().splitlines()

    total = len(lines) // 2
    d = {}

    for line in lines:
        for i in range(len(line)):
            d[i] = d.get(i, 0) + int(line[i])

    gamma = ""
    epsilon = ""

    for key in d:
        if d[key] > total:
            gamma += "1"
            epsilon += "0"
        else:
            gamma += "0"
            epsilon += "1"

    return int(gamma, 2) * int(epsilon, 2)

print(one())

def updatePath(path1, path2, val1, val2):
    val = path1
    path2 = path1 + val2
    path1 += val1
    return [val, path1, path2]

def decide(d, op, size):
    path1 = "1"
    path2 = "0"
    val = ""

    while len(val) < size:
        if not d.get(path1, False):
            [val, path2, path1] = updatePath(path2, path1, "0", "1")
            continue
        if not d.get(path2, False):
            [val, path1, path2] = updatePath(path1, path2, "1", "0")
            continue

        if op(len(d[path1]), len(d[path2])):
            [val, path1, path2] = updatePath(path1, path2, "1", "0")
        else:
            [val, path2, path1] = updatePath(path2, path1, "0", "1")
    return val

def two():
    file = open("input.txt", "r")
    lines = file.read().splitlines()

    size = len(lines[0])
    d = {}

    for line in lines:
        current = ""
        for digit in line:
            current += digit
            l = d.get(current, [])
            l.append(line)
            d[current] = l
    
    oxygen = decide(d, operator.ge, size)
    co2 = decide(d, operator.lt, size)

    return int(oxygen, 2) * int(co2, 2)

print(two())