"""Rebuild hero oval emblem from logo-full.png (complete, uncropped source)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/images/navkar/logo-full.png"
OUT_PNG = ROOT / "public/images/navkar/logo-emblem-hero.png"
OUT_WEBP = ROOT / "public/images/navkar/logo-emblem-hero.webp"


def rebuild() -> None:
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    px = im.load()

    cols_opaque = [
        sum(1 for y in range(h) if px[x, y][3] > 10) for x in range(w)
    ]
    start = next(i for i, c in enumerate(cols_opaque) if c > 0)

    gap_start = None
    run = 0
    for x in range(start, w):
        if cols_opaque[x] < 3:
            run += 1
            if run >= 8:
                gap_start = x - run + 1
                break
        else:
            run = 0
    end = gap_start if gap_start else w

    miny, maxy = h, 0
    for x in range(start, end):
        for y in range(h):
            if px[x, y][3] > 10:
                miny = min(miny, y)
                maxy = max(maxy, y)

    pad = 2
    emblem = im.crop(
        (
            max(0, start - pad),
            max(0, miny - pad),
            min(w, end + pad),
            min(h, maxy + pad + 1),
        )
    )

    scale = 4
    up = emblem.resize(
        (emblem.width * scale, emblem.height * scale),
        Image.Resampling.LANCZOS,
    )

    pad_x = max(80, int(up.width * 0.12))
    pad_y = max(90, int(up.height * 0.16))
    canvas = Image.new("RGBA", (up.width + pad_x * 2, up.height + pad_y * 2), (0, 0, 0, 0))
    canvas.paste(up, (pad_x, pad_y), up)

    margin = 48
    final = Image.new(
        "RGBA",
        (canvas.width + margin * 2, canvas.height + margin * 2),
        (0, 0, 0, 0),
    )
    final.paste(canvas, (margin, margin), canvas)

    final.save(OUT_PNG, optimize=True)
    final.save(OUT_WEBP, "WEBP", quality=95, method=6)
    print(f"wrote {OUT_PNG.name} {final.size}")
    print(f"wrote {OUT_WEBP.name} {final.size}")


if __name__ == "__main__":
    rebuild()
