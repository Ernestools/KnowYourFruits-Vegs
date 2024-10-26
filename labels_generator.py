import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

test_set = tf.keras.utils.image_dataset_from_directory(
    "./test",
    labels="inferred",
    label_mode="categorical",
    class_names=None,
    color_mode="rgb",
    batch_size=32,
    image_size=(64, 64),
    shuffle=True,
    seed=None,
    validation_split=None,
    subset=None,
    interpolation="bilinear",
    follow_links=False,
    crop_to_aspect_ratio=False,
    pad_to_aspect_ratio=False,
    data_format=None,
    verbose=True,
)

values = test_set.class_names
print(values)
f = open("labels.txt", "w")
for value in values:
    f.write("{}\n".format(value))
f.close()
