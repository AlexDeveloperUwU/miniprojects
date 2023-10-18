def custom_char_count(s):
    char_count = {}
    for char in s:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    return char_count


def permute_a_palindrome(s):
    char_count = custom_char_count(s)
    odd_count = 0

    for count in char_count.values():
        if count % 2 == 1:
            odd_count += 1
            if odd_count > 1:
                return False
    return True
