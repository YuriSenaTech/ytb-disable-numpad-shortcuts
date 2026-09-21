"""Gera extension/icons/icon{16,48,128}.png (requer Pillow): quadrado vermelho com botão play cortado por uma barra."""
from PIL import Image, ImageDraw

SCALE = 8
for size in (16, 48, 128):
    s = size * SCALE
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 0, s - 1, s - 1), radius=s // 5, fill=(214, 40, 40, 255))
    d.polygon([(s * 0.38, s * 0.28), (s * 0.38, s * 0.72), (s * 0.74, s * 0.5)], fill=(255, 255, 255, 255))
    d.line((s * 0.16, s * 0.84, s * 0.84, s * 0.16), fill=(30, 30, 30, 255), width=max(s // 11, 1))
    img.resize((size, size), Image.LANCZOS).save(f"extension/icons/icon{size}.png")
