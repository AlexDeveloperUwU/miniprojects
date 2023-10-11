def flick_switch(lst):
    value = True
    result = []
    for i in lst:
        if i != "flick":
            result.append(value)
        elif i == "flick":
            if value == True:
                value = False
                result.append(value)
            elif value == False:
                value = True
                result.append(value)
    return result