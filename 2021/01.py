def one():
    file = open("input.txt", "r")
    lines = file.readlines()

    count = 0
    for i in range(1, len(lines)):
        if int(lines[i]) > int(lines[i-1]):
            count += 1
    return count

print(one())

def two():
    file = open("input.txt", "r")
    lines = file.readlines()
    start = 0
    end = 3

    count = 0
    while end < len(lines):
        if int(lines[end]) > int(lines[start]):
            count += 1
        start += 1
        end += 1
    return count

print(two())