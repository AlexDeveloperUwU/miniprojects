def quicksum(packet):
    result = 0

    for i, char in enumerate(packet):
        if char == ' ':
            continue 
        elif char in list('ªº\!|@·#$%&¬/=?¿¡'):
            result = 0
            break
        elif 'A' <= char <= 'Z': 
            value = ord(char) - ord('A') + 1  
            result += (i + 1) * value 
        else:
            result = 0
            break

    return result
