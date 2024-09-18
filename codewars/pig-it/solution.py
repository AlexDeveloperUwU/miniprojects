def pig_it(text):
    words = text.split()
    result = []
    for word in words:
        if word.isalpha():
            pig_word = word[1:] + word[0] + "ay"
            result.append(pig_word)
        else:
            result.append(word)
    return " ".join(result)