def quarter_of(month):
    monthstr = str(month)
    if monthstr in list("123"): return 1
    if monthstr in list("456"): return 2
    if monthstr in list("789"): return 3
    else: return 4