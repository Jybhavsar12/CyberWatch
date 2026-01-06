#!/usr/bin/env python3
"""
Simple favicon generator for CyberWatch
Creates a basic ICO file with the shield and lock design
"""

from PIL import Image, ImageDraw
import os

def create_icon(size):
    """Create an icon of the specified size"""
    # Create image with black background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    scale = size / 64
    
    # Draw shield outline
    shield_points = [
        (32 * scale, 12 * scale),
        (20 * scale, 18 * scale),
        (20 * scale, 28 * scale),
        (24 * scale, 38 * scale),
        (32 * scale, 48 * scale),
        (40 * scale, 38 * scale),
        (44 * scale, 28 * scale),
        (44 * scale, 18 * scale),
    ]
    draw.polygon(shield_points, outline=(255, 255, 255, 255), width=int(2.5 * scale))
    
    # Draw lock body
    lock_x = 28 * scale
    lock_y = 28 * scale
    lock_w = 8 * scale
    lock_h = 8 * scale
    draw.rectangle(
        [lock_x, lock_y, lock_x + lock_w, lock_y + lock_h],
        fill=(255, 255, 255, 255)
    )
    
    # Draw lock arc (simplified as a semicircle)
    arc_box = [
        29 * scale, 22 * scale,
        35 * scale, 28 * scale
    ]
    draw.arc(arc_box, 0, 180, fill=(255, 255, 255, 255), width=int(2 * scale))
    
    # Draw keyhole
    keyhole_center = (32 * scale, 32 * scale)
    keyhole_radius = 1.5 * scale
    draw.ellipse(
        [
            keyhole_center[0] - keyhole_radius,
            keyhole_center[1] - keyhole_radius,
            keyhole_center[0] + keyhole_radius,
            keyhole_center[1] + keyhole_radius
        ],
        fill=(0, 0, 0, 255)
    )
    
    return img

def main():
    """Generate all icon sizes"""
    try:
        from PIL import Image
    except ImportError:
        print("⚠️  Pillow package not found. Install with: pip install Pillow")
        print("📝 Alternatively, use scripts/generate-icons.html in your browser.")
        return
    
    # Create icons
    sizes = [16, 32, 48, 64, 128, 256]
    icons = [create_icon(size) for size in sizes]
    
    # Save as ICO
    output_path = os.path.join(os.path.dirname(__file__), '..', 'app', 'favicon.ico')
    icons[0].save(
        output_path,
        format='ICO',
        sizes=[(s, s) for s in sizes],
        append_images=icons[1:]
    )
    
    print(f"✅ Generated favicon.ico with sizes: {sizes}")
    
    # Also save individual PNGs
    png_sizes = [
        (16, 'favicon-16x16.png'),
        (32, 'favicon-32x32.png'),
        (48, 'favicon-48x48.png'),
        (180, 'apple-touch-icon.png'),
        (192, 'icon-192.png'),
        (512, 'icon-512.png'),
    ]
    
    public_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
    os.makedirs(public_dir, exist_ok=True)
    
    for size, filename in png_sizes:
        icon = create_icon(size)
        icon.save(os.path.join(public_dir, filename), 'PNG')
        print(f"✅ Generated {filename} ({size}x{size})")
    
    print("\n✨ All icons generated successfully!")

if __name__ == '__main__':
    main()

