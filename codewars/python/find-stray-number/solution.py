def stray(arr):
    unique_num = 0
    for num in arr:
        unique_num ^= num
    return unique_num
