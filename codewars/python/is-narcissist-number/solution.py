def narcissistic(number):
    num_str = str(number)
    num_digits = len(num_str)
    
    total = sum(int(digit) ** num_digits for digit in num_str)
    
    return total == number
