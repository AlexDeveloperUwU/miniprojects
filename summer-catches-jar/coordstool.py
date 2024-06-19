import pyautogui

print("Please, place the cursor in the top-left corner of the region and press Enter.")
input()
x1, y1 = pyautogui.position()

print("Now, place the cursor in the bottom-right corner of the region and press Enter.")
input()
x2, y2 = pyautogui.position()

width = x2 - x1
height = y2 - y1

print(f"Captured region: x={x1}, y={y1}, width={width}, height={height}")
