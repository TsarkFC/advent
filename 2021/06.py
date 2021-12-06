def solve(number):
    file = open("input.txt", "r")
    lines = file.read().splitlines()

    l = list(map(int, lines[0].split(",")))
    d = {}
    for i in range(9): d[i] = 0
    for n in l: d[n] = d.get(n, 0) + 1

    for _ in range(number):
        new_d = {}
        for i in range(1, 9): new_d[i] = 0
        new_d[0] = 0
        
        for key, value in d.items():
            if key == 0:
                new_d[8] = value
                new_d[6] = new_d.get(6, 0) + value
            else:
                new_d[(key-1) % 9] = value

        d = new_d
        
    s = 0
    for key in d:
        s += d[key]
    return s

def one():
    return solve(80)

print(one())

def two():
    return solve(256)

print(two())