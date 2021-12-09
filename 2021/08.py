def getinput():
    file = open("input.txt", "r")
    lines = file.read().splitlines()
    patterns = []
    for line in lines:
        l = line.split(" | ")
        patterns.append([l[0].split(), l[1].split()])
    return patterns

def one():
    patterns = getinput()

    s = {2, 3, 4, 7}
    count = 0
    for pattern in patterns:
        for c in pattern[1]:
            if len(c) in s:
                count += 1
    return count

print(one())

m = {
    2: 1,
    4: 4,
    3: 7,
    7: 8
}

def two():
    patterns = getinput()

    total = 0
    for pattern in patterns:
        d = {}
        for word in pattern[0]:
            size = len(word)
            if size in m:
                d[m[size]] = ''.join(sorted(word))

        for word in pattern[0]:
            size = len(word)
            if size == 6 and any(c not in word for c in d[1]):
                d[6] = ''.join(sorted(word))
                break

        for word in pattern[0]:
            size = len(word)
            ordered = ''.join(sorted(word))
            if size == 6 and any(c not in word for c in d[4]) and ordered not in d.values():
                d[0] = ordered
                break

        for word in pattern[0]:
            size = len(word)
            ordered = ''.join(sorted(word))
            if size == 6 and ordered not in d.values():
                d[9] = ''.join(sorted(word))
                break

        for word in pattern[0]:
            size = len(word)
            if size == 5 and all(c in d[6] for c in word):
                d[5] = ''.join(sorted(word))
                break

        for word in pattern[0]:
            size = len(word)
            ordered = ''.join(sorted(word))
            if size == 5 and all(c in d[9] for c in word) and ordered not in d.values():
                d[3] = ''.join(sorted(word))
                break

        for word in pattern[0]:
            size = len(word)
            ordered = ''.join(sorted(word))
            if size == 5 and ordered not in d.values():
                d[2] = ''.join(sorted(word))
                break

        inv_d = {v: k for k, v in d.items()}
        mid = 0
        for word in pattern[1]:
            ordered = ''.join(sorted(word))
            mid = mid * 10 + inv_d[ordered]
        total += mid
    return total

print(two())