def count_positives_sum_negatives(arr):
    if arr is None or len(arr) == 0:
        return []

    positive_count = sum_negative = 0

    for num in arr:
        if num > 0:
            positive_count += 1
        elif num < 0:
            sum_negative += num

    return [positive_count, sum_negative]
