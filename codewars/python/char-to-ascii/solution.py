def get_ascii(ch: str) -> int:
    if len(ch) != 1:
        raise ValueError("Input must be a single character")
    
    return ord(ch)