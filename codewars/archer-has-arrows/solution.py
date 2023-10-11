def archers_ready(archers):
    if archers == []:
        return False

    for i in archers:
        if i >=5:
            continue
        if i < 5:
            return False
    return True