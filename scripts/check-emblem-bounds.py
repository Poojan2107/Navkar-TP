from pathlib import Path
from PIL import Image

p = Path(r"d:\Navkar\public\images\navkar\logo-emblem-hero.png")
im = Image.open(p).convert("RGBA")
w, h = im.size
px = im.load()
minx, miny, maxx, maxy = w, h, 0, 0
for y in range(h):
    for x in range(w):
        if px[x, y][3] > 10:
            minx = min(minx, x)
            miny = min(miny, y)
            maxx = max(maxx, x)
            maxy = max(maxy, y)
print({"size": (w, h), "content": (minx, miny, maxx, maxy), "pad": (minx, miny, w - 1 - maxx, h - 1 - maxy)})

# Check if right edge of oval looks flat: sample alpha along right content x
flat = 0
for y in range(miny, maxy + 1):
    if px[maxx, y][3] > 10:
        flat += 1
print("opaque_pixels_on_maxx_column", flat, "of", maxy - miny + 1)
