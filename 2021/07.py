def solve(one):
    file = open("input.txt", "r")
    lines = file.read().splitlines()
    numbers = list(map(int, lines[0].split(",")))

    avg = int(sum(numbers) / len(numbers))
    low = min(numbers)

    res = float("inf")
    for i in range(1, len(numbers) + 1):
        pos = 0
        for j in range(len(numbers)):
            if one:
                pos += abs(i - numbers[j])
            else:
                pos += sum(range(1, abs(i - numbers[j]) + 1))
        res = min(res, pos)
    return res

def one():
    return solve(True)

print(one())

def two():
    return solve(False)

print(two())