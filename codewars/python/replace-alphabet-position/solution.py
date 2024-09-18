def alphabet_position(text):
    alphabetarr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    finalarr = []
    for char in text:
        if char.isalpha():
            position = str(ord(char.lower()) - ord('a') + 1)
            finalarr.append(position)

    result = " ".join(finalarr)
    return result