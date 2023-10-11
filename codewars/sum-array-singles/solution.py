def repeats(numbers):
    num_count = {}
    for num in numbers:
        if num in num_count:
            num_count[num] += 1
        else:
            num_count[num] = 1

    total = 0
    for num, count in num_count.items():
        if count == 1:
            total += num

    return total