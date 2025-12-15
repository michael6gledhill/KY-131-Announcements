# Logo Setup Instructions

## Option 1: Use Logo File (Recommended for Web)

1. Save your squadron logo as `logo.png` in this folder
2. The `index.html` and other HTML files will automatically reference it
3. Deploy everything to GitHub Pages

## Option 2: Embed Logo as Base64 (For Email)

If you want to embed the logo directly in the HTML without needing an external file:

### How to convert your logo to Base64:

**Using PowerShell:**
```powershell
$imagePath = "C:\Users\cadet\Documents\GitHub\KY-131-Announcements\logo.png"
$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($imagePath))
Write-Output $base64
```

**Using Python:**
```python
import base64
with open('logo.png', 'rb') as img_file:
    base64_string = base64.b64encode(img_file.read()).decode()
    print(base64_string)
```

### Using the Base64 in HTML:

Once you have the base64 string, replace the logo reference in `email-template.html`:

From:
```html
<img src="logo.png" alt="KY-131 Logo" style="width: 80px; height: 80px; object-fit: contain;">
```

To:
```html
<img src="data:image/png;base64,YOUR_BASE64_STRING_HERE" alt="KY-131 Logo" style="width: 80px; height: 80px; object-fit: contain;">
```

This embeds the logo directly in the HTML, perfect for emails!

## Files:
- `index.html` - Main announcement page (web)
- `creator.html` - Announcement creator tool (web)
- `email-template.html` - Email-ready announcements (can use base64 logo)
