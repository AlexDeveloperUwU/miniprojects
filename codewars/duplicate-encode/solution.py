def duplicate_encode(word):
    word = word.lower()
    result = ""

    char_count = {}
    for char in word:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1

    for char in word:
        if char_count[char] > 1:
            result += ")"
        else:
            result += "("

    return result