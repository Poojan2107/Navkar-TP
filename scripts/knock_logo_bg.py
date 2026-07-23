from PIL import Image
import os

base = r'd:\Navkar\public\images\navkar'


def knock_dark(src: str, dst: str, thresh: int = 48) -> None:
    im = Image.open(src).convert('RGBA')
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r < thresh and g < thresh + 10 and b < thresh + 20:
                px[x, y] = (r, g, b, 0)
            elif r + g + b < thresh * 2.2 and max(r, g, b) < thresh + 25:
                px[x, y] = (r, g, b, 0)
    bbox = im.getbbox()
    if bbox:
        pad = 4
        l, t, r2, b2 = bbox
        l = max(0, l - pad)
        t = max(0, t - pad)
        r2 = min(w, r2 + pad)
        b2 = min(h, b2 + pad)
        im = im.crop((l, t, r2, b2))
    im.save(dst, 'PNG', optimize=True)
    print(dst, im.size)


knock_dark(os.path.join(base, 'logo-lockup-teal.png'), os.path.join(base, 'logo-lockup-teal-clear.png'), 38)
knock_dark(os.path.join(base, 'logo-lockup-white.png'), os.path.join(base, 'logo-lockup-white-clear.png'), 55)
knock_dark(os.path.join(base, 'logo-full.png'), os.path.join(base, 'logo-lockup-brand.png'), 40)
print('done')
