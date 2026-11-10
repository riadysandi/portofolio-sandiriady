from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('public', exist_ok=True)

# Generate high-resolution 512x512 favicon
SIZE = 512
img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# 1. Dark Rounded Background Squircle
bg_color = (11, 12, 16, 255) # #0b0c10
draw.rounded_rectangle([16, 16, SIZE - 16, SIZE - 16], radius=96, fill=bg_color, outline=(36, 38, 54, 255), width=6)

# 2. Purple Liquid Splash / Circle behind logo (matching image 5)
splash_center = (180, 220)
splash_radius = 160
draw.ellipse(
    [splash_center[0] - splash_radius, splash_center[1] - splash_radius,
     splash_center[0] + splash_radius, splash_center[1] + splash_radius],
    fill=(139, 92, 246, 230) # #8b5cf6
)

# 3. Text "SANDI." in Permanent Marker Font
font_path = 'scripts/PermanentMarker.ttf'
font_sandi = ImageFont.truetype(font_path, 118)
font_infra = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 32) # Clean monospace font for IT INFRASTRUCTURE

# Measure & Draw "SANDI."
# Subtle drop shadow
draw.text((84, 154), "SANDI.", font=font_sandi, fill=(0, 0, 0, 160))
# White text
draw.text((80, 150), "SANDI.", font=font_sandi, fill=(255, 255, 255, 255))

# Draw "IT INFRASTRUCTURE" in Neon Lime #ccff00
# Subtle shadow
draw.text((86, 298), "IT INFRASTRUCTURE", font=font_infra, fill=(0, 0, 0, 180))
draw.text((84, 296), "IT INFRASTRUCTURE", font=font_infra, fill=(204, 255, 0, 255))

# Save 512x512 PNG
img.save('public/favicon.png', 'PNG')
img.save('public/favicon-512x512.png', 'PNG')

# Save 192x192
img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
img_192.save('public/favicon-192x192.png', 'PNG')

# Save Apple Touch Icon (180x180)
img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
img_180.save('public/apple-touch-icon.png', 'PNG')

# Save 32x32 and 16x16
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save('public/favicon-32x32.png', 'PNG')

img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_16.save('public/favicon-16x16.png', 'PNG')

# Save multi-size favicon.ico (16, 32, 48, 64)
img_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
img_64 = img.resize((64, 64), Image.Resampling.LANCZOS)
img.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

print("Favicon PNG and ICO generated successfully!")
