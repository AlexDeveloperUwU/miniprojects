def two_by_two(animals):
    if len(animals) == 0:
        return False

    animal_count = {}
    result = {}

    for animal in animals:
        if animal in animal_count:
            animal_count[animal] += 1
        else:
            animal_count[animal] = 1

    for animal, count in animal_count.items():
        if count >= 2:
            result[animal] = 2

    return result