"""
Resize and compress all images inside src/assets/images/
- Max dimension: 1920px on the longest side (covers any gallery or hero image)
- JPG quality: 82
- PNG: converted to JPG unless transparent, otherwise optimised
- Overwrites in place
"""

import os
from pathlib import Path
from PIL import Image

IMG_DIR = Path(__file__).parent / "images"
MAX_SIDE = 1920          # px — good for retina displays at portfolio width
JPEG_Q   = 82            # 0-95; 82 looks great at ~1/5 the file size
PNG_OPT  = 6             # PIL PNG compression level 0-9

EXTENSIONS = {".jpg", ".jpeg", ".png"}

def compress(path: Path):
    try:
        img = Image.open(path)
        original_size = path.stat().st_size

        # Resize if larger than MAX_SIDE on either dimension
        w, h = img.size
        if w > MAX_SIDE or h > MAX_SIDE:
            img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)

        suffix = path.suffix.lower()

        if suffix in (".jpg", ".jpeg"):
            # Strip EXIF, save as progressive JPEG
            img = img.convert("RGB")
            img.save(path, "JPEG", quality=JPEG_Q, optimize=True, progressive=True)

        elif suffix == ".png":
            # If fully opaque → convert to JPEG (much smaller)
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                # Has transparency — keep as PNG, just optimise + resize
                img.save(path, "PNG", optimize=True, compress_level=PNG_OPT)
            else:
                # No transparency → save as JPEG next to original
                jpg_path = path.with_suffix(".jpg")
                img.convert("RGB").save(jpg_path, "JPEG", quality=JPEG_Q, optimize=True, progressive=True)
                path.unlink()          # delete original PNG
                path = jpg_path

        new_size = path.stat().st_size
        saved_pct = (1 - new_size / original_size) * 100
        print(f"  {path.name:55s}  {original_size//1024:>6} KB → {new_size//1024:>6} KB  ({saved_pct:.0f}% saved)")
        return path

    except Exception as e:
        print(f"  ERROR {path.name}: {e}")
        return path

def main():
    paths = [p for p in IMG_DIR.rglob("*") if p.suffix.lower() in EXTENSIONS]
    print(f"Processing {len(paths)} images…\n")
    for p in sorted(paths):
        compress(p)
    print("\nDone.")

if __name__ == "__main__":
    main()
