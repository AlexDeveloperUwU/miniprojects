def is_isogram(string):
    list = ''
    for i in string:
        print(list)
        if i.lower() not in list:
            list += i.lower()
        else:
            return False
    return True
