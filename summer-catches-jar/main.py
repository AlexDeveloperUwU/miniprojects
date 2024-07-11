import cv2
import numpy as np
import pyautogui
import time
import mss

# Util to capture the screen in the specified region
def capture_screen(region=None):
    with mss.mss() as sct:
        monitor = {"top": region[1], "left": region[0], "width": region[2], "height": region[3]}
        screenshot = np.array(sct.grab(monitor))
        return screenshot

# Util to detect a key image in a screenshot
def detect_key_in_square(screenshot, key_image, threshold=0.8):
    # Convert images to BGR if necessary
    if screenshot.shape[2] == 4 and key_image.shape[2] == 3:
        screenshot = cv2.cvtColor(screenshot, cv2.COLOR_BGRA2BGR)
    elif screenshot.shape[2] == 3 and key_image.shape[2] == 4:
        key_image = cv2.cvtColor(key_image, cv2.COLOR_BGRA2BGR)

    result = cv2.matchTemplate(screenshot, key_image, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
    if max_val >= threshold:
        return True, max_loc
    return False, None

def main():
    # Load the images of the keys to press
    keys_to_press = {
        'up': 'up.png',
        'down': 'down.png',
        'left': 'left.png',
        'right': 'right.png'
    }

    key_images = {}
    for key, image_path in keys_to_press.items():
        image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
        if image is None:
            print(f"Cannot load the image for key {key}.")
            return
        key_images[key] = image

    # Define the region of the game where you will search for the keys (x, y, width, height)
    # Use the coordstool.py script to find the coordinates of the region
    game_region = (1062, 94, 90, 88)

    while True:
        start_time = time.time()
        
        screen = capture_screen(region=game_region)

        for key, key_image in key_images.items():
            found, location = detect_key_in_square(screen, key_image)
            if found:
                print(f"Key {key} found at {location}. Pressing '{key}'.")
                pyautogui.press(key)
                break
        
        elapsed_time = time.time() - start_time
        time.sleep(max(0, 0.01 - elapsed_time))

if __name__ == "__main__":
    main()
