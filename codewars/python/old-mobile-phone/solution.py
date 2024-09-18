def presses(phrase):
    total = 0
    for letter in phrase:
        if letter == "1" or letter == "2" or letter == "3" or letter == "4" or letter == "5" or letter == "6" or letter == "7" or letter == "8" or letter == "9" or letter == "0":
            number = calculate(letter)
            total += number
        else:
            letter_upcase = letter.upper()
            number = calculate(letter_upcase)
            total += number
    return total

def calculate(letter):
    if letter == "1":
        presses_2 = 1
        return presses_2
    if letter == "2":
        presses_2 = 4
        return presses_2
    if letter == "3":
        presses_2 = 4
        return presses_2
    if letter == "4":
        presses_2 = 4
        return presses_2
    if letter == "5":
        presses_2 = 4
        return presses_2
    if letter == "6":
        presses_2 = 4
        return presses_2
    if letter == "7":
        presses_2 = 5
        return presses_2
    if letter == "8":
        presses_2 = 4
        return presses_2
    if letter == "9":
        presses_2 = 5
        return presses_2
    if letter == "0":
        presses_2 = 2
        return presses_2
    if letter == "A":
        presses_2 = 1
        return presses_2
    if letter == "B":
        presses_2 = 2
        return presses_2
    if letter == "C":
        presses_2 = 3
        return presses_2
    if letter == "D":
        presses_2 = 1
        return presses_2
    if letter == "E":
        presses_2 = 2
        return presses_2
    if letter == "F":
        presses_2 = 3
        return presses_2
    if letter == "G":
        presses_2 = 1
        return presses_2
    if letter == "H":
        presses_2 = 2
        return presses_2
    if letter == "I":
        presses_2 = 3
        return presses_2
    if letter == "J":
        presses_2 = 1
        return presses_2
    if letter == "K":
        presses_2 = 2
        return presses_2
    if letter == "L":
        presses_2 = 3
        return presses_2
    if letter == "M":
        presses_2 = 1
        return presses_2
    if letter == "N":
        presses_2 = 2
        return presses_2
    if letter == "O":
        presses_2 = 3
        return presses_2
    if letter == "P":
        presses_2 = 1
        return presses_2
    if letter == "Q":
        presses_2 = 2
        return presses_2
    if letter == "R":
        presses_2 = 3
        return presses_2
    if letter == "S":
        presses_2 = 4
        return presses_2
    if letter == "T":
        presses_2 = 1
        return presses_2
    if letter == "U":
        presses_2 = 2
        return presses_2
    if letter == "V":
        presses_2 = 3
        return presses_2
    if letter == "W":
        presses_2 = 1
        return presses_2
    if letter == "X":
        presses_2 = 2
        return presses_2
    if letter == "Y":
        presses_2 = 3
        return presses_2
    if letter == "Z":
        presses_2 = 4
        return presses_2
    if letter == "*":
        presses_2 = 1
        return presses_2
    if letter == "#":
        presses_2 = 1
        return presses_2
    if letter == " ":
        presses_2 = 1
        return presses_2