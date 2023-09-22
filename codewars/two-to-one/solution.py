def longest(a1, a2):
    array1 = "" # Defino el array vacío
    array2 = "" # Defino el array vacío

    for letter in a1: # Para cada letra en a1, realizo el siguiente bucle
        if letter in list(array1): # Si la letra está en la lista del array 1, ignoro
            pass # Aquí le digo que no haga nada
        else: # En caso de que la letra no esté
            array1 += letter # Si la letra no está en el array 1, lo añado

    arranged1= "".join(sorted(array1)) # Ahora lo que hago es ordenarlo y elimino todo tipo de espacios
    final_array = arranged1 # Lo que hago es asignar ya al final array este array para ahorrar tiempo y recursos

    for letter in a2: # Para cada letra en a2, realizo el siguiente bucle
        if letter in list(array2): # Si la letra está en la lista del array 2, ignoro
            pass # Aquí le digo que no haga nada
        else: # En caso de que la letra no esté
            array2 += letter # Si la letra no está en el array 2, lo añado
            
    arranged2= "".join(sorted(array2)) # Ahora lo que hago es ordenarlo y elimino todo tipo de espacios

    for letter in arranged2: # Ahora lo que hago es que para cada letra en la lista ordenada, ejecute el bucle
        if letter in list(final_array): # Si la letra está en la lista del array final, ignoro
            pass # Aquí le digo que no haga nada
        else: # En caso de que la letra no esté
            final_array += letter # Si la letra no está en el array final, lo añado
    
    final_array_2 = "".join(sorted(final_array)) # Ahora reordeno la lista con todas las letras añadidas

    return final_array_2 # Aquí devuelvo el resultado
