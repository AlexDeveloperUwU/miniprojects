def two_sum(nums, target):
    num_dict = {}
    for index, num in enumerate(nums):
        complement = target - num
        if complement in num_dict:
            return (num_dict[complement], index)
        num_dict[num] = index
