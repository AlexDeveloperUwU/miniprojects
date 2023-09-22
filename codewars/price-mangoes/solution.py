def mango (quantity, price):
    paid_mangoes = quantity - (quantity // 3)
    total_cost = paid_mangoes * price
    return total_cost