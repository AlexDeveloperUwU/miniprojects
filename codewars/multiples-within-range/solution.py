def multiples(integer1, integer2, limit):
    return [i for i in range(integer1, limit, integer1) if i % integer2 == 0]