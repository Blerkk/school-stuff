import numpy as np
import argparse
import cv2

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", help = "C:\\Users\\Blerkk\\Downloads\\programok, scriptek\\school-stuff\\binary_game")
args = vars(ap.parse_args())
# load the image
image = cv2.imread(args["image"])

boundaries = [
	([0, 0, 0], [25, 25, 254]),
	([1, 0, 0], [25, 255, 25]), #tudnam miert nem jo neki ha ugyan ugy nulla az elso mint az osszes tobbinel // tudnam miert nem jo 254-el a masik ketto meg miert csak azzal jo smh
	([0, 0, 0], [254, 25, 25])
]
# greenLower = (29, 86, 6)
# greenUpper = (64, 255, 255)

# loop over the boundaries
for (lower, upper) in boundaries:
	# create NumPy arrays from the boundaries
	lower = np.array(lower, dtype = "uint8")
	upper = np.array(upper, dtype = "uint8")
	# find the colors within the specified boundaries and apply
	# the mask
	mask = cv2.inRange(image, lower, upper)
	output = cv2.bitwise_and(image, image, mask = mask)
	# show the images
	cv2.imshow("images", np.hstack([image, output]))
	cv2.waitKey(0)