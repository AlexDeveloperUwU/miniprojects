def reverse_words(string):
    words = string.split(' ')
    reversed_words = [''.join(reversed(word)) if not word.isspace() else word for word in words]
    reversed_string = ' '.join(reversed_words)
    
    return reversed_string