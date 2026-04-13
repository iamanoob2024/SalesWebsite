import re
import os

# --- DATA LAYER (Edit these values only) ---
NEW_DATA = {
    "date":      "7–9 April 2026",
    "venue":     "SPICE Arena, Penang",
    "aff_name":  "Lovinia Mak",
    "aff_email": "loviniamak@example.com",
    "qr_image":  "./qrcode.png",  # Ensure this file exists in the folder
}

def update_html():
    file_path = 'index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern matching for the CONFIG block strings
    # This specifically targets the values inside the quotes
    patterns = {
        "date":      r'(date:\s*")([^"]*)(")',
        "venue":     r'(venue:\s*")([^"]*)(")',
        "aff_name":  r'(name:\s*")([^"]*)(")',
        "aff_email": r'(email:\s*")([^"]*)(")',
        "qr_image":  r'(qr_image:\s*")([^"]*)(")',
    }

    for key, pattern in patterns.items():
        if key in NEW_DATA:
            content = re.sub(pattern, rf'\1{NEW_DATA[key]}\3', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Success: {file_path} updated with new configuration.")

if __name__ == "__main__":
    update_html()