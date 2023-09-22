def real_numbers(N):
    divisible_by_2 = N // 2
    divisible_by_3 = N // 3
    divisible_by_5 = N // 5

    divisible_by_2_and_3 = N // (2 * 3)
    divisible_by_2_and_5 = N // (2 * 5)
    divisible_by_3_and_5 = N // (3 * 5)

    divisible_by_2_and_3_and_5 = N // (2 * 3 * 5)

    not_divisible = N - (divisible_by_2 + divisible_by_3 + divisible_by_5) + (
        divisible_by_2_and_3 + divisible_by_2_and_5 + divisible_by_3_and_5
    ) - divisible_by_2_and_3_and_5

    return not_divisible