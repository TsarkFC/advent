from operator import add

one_d = {
    "forward": [1, 0],
    "down": [0, 1],
    "up": [0, -1]
}

def one():
    file = open("input.txt", "r")
    lines = file.readlines()

    x, y = 0, 0

    for line in lines:
        [i, value] = line.split(" ")
        x += one_d[i][0] * int(value)
        y += one_d[i][1] * int(value)

    return x * y

print(one())

two_d = {
    "down": 1,
    "up": -1
}

def two():
    file = open("input.txt", "r")
    lines = file.readlines()

    x, y, aim = 0, 0, 0

    for line in lines:
        [i, value] = line.split(" ")

        if i == "forward":
            x += int(value)
            y += int(value) * aim
        else:
            aim += two_d[i] * int(value)
    return x * y

print(two())