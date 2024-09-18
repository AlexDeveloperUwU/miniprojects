def solution(molar_mass1, molar_mass2, given_mass1, given_mass2, volume, temp) :
    ctok = temp + 273.15
    op1 = given_mass1 / molar_mass1
    op2 = given_mass2 / molar_mass2
    op3 = op1 + op2
    op4 = op3 * 0.082 * ctok
    op5 = op4 / volume
    
    return op5