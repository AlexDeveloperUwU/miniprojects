def to_camel_case(text):
    array = []
    replace1 = text.replace("_", " ")
    replace2 = replace1.replace("-", " ")
    listwords = replace2.split(" ")

    for word in listwords:
        if listwords.index(word) == 0:
            array.append(word) # Así no me cambia si la palabra empieza o no por mayúscula
        else:
            array.append(word.capitalize())
            
    finish_array = ''.join(array)
    print(finish_array)
    return finish_array