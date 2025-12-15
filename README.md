# KY-131 Heartland Composite Squadron - Announcements System

A beautiful, responsive web application for managing and displaying squadron announcements. Deploy directly to GitHub Pages!

## Features

✨ **Modern UI**
- Professional gradient design with squadron colors
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Inline CSS for easy email sharing

📝 **Announcement Creator**
- Easy-to-use form interface
- Live preview as you type
- Multiple category support
- Real-time validation

💾 **Data Management**
- Announcements auto-save to browser storage
- Export as JSON for backup
- Export as HTML for sharing
- Delete individual or all announcements

🎨 **Customization**
- Add custom announcements easily
- Category filtering
- Beautiful formatting with emojis
- Professional section organization

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main announcement display page |
| `creator.html` | Tool for creating/managing announcements |
| `email-template.html` | Email-ready HTML template |
| `logo.png` | Squadron logo (add your logo here) |

## Deployment to GitHub Pages

### Step 1: Prepare Your Repository

```bash
cd c:\Users\cadet\Documents\GitHub\KY-131-Announcements
git add .
git commit -m "Initial commit: Announcements system"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Set **Source** to `main` branch, **folder** to `/ (root)`
4. Click **Save**

### Step 3: Access Your Site

- Main page: `https://michael6gledhill.github.io/KY-131-Announcements/`
- Creator tool: `https://michael6gledhill.github.io/KY-131-Announcements/creator.html`
- Email template: `https://michael6gledhill.github.io/KY-131-Announcements/email-template.html`

## Usage

### Create an Announcement

1. Open `creator.html` on your GitHub Pages site
2. Fill out the announcement form
3. Preview in real-time on the right
4. Click "Create Announcement"
5. Announcements auto-save to your browser

### View Announcements

- Open `index.html` to see all announcements
- Filter by category using the tabs
- Click links to view full details

### Export Data

- **JSON Export**: Backup your announcements as JSON
- **HTML Export**: Create a standalone HTML file to share
- Both exports include all announcement data

## Adding Your Logo

1. Save your squadron logo as `logo.png` in the repository
2. The logo will automatically appear in:
   - `index.html` header
   - `creator.html` header
   - Email templates

### Using Logo in Emails (Base64)

To embed the logo directly in emails without external files:

```bash
# PowerShell
$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("logo.png"))
Write-Output $base64
```

Then replace `src="logo.png"` with `src="data:image/png;base64,BASE64_STRING"`

## Features in Detail

### Announcement Creator Features
- **Live Preview**: See announcements format in real-time
- **Multiple Fields**: Date, Title, Location, UOD, Details, Cadets, Primary AM, Link
- **Categories**: Organize announcements by type
- **Success Feedback**: Visual confirmation when announcements are created
- **Form Reset**: Clear form after submission

### Data Persistence
- Announcements stored in browser's LocalStorage
- Data persists across page refreshes
- No server needed - everything client-side
- Each browser/device has its own copy

### Export Options
- **JSON**: Complete data export for archiving
- **HTML**: Self-contained HTML file ready to share
- Timestamped filenames for organization

## Customization Tips

### Change Colors
Edit the hex colors in the `<style>` section:
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (darker purple)
- Accent: `#ffd700` (gold)

### Add More Categories
In `creator.html`, find the category select and add:
```html
<option value="New Category">New Category</option>
```

### Modify Fields
Edit the form in `creator.html` to add or remove announcement fields.

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support
- Email clients: HTML template compatible with Gmail, Outlook, Apple Mail

## Troubleshooting

**Logo not showing?**
- Ensure `logo.png` is in the repository root
- Try clearing browser cache

**Announcements not saving?**
- Check if LocalStorage is enabled in browser
- Try a different browser
- Clear browser cache and cookies

**GitHub Pages not updating?**
- Wait 1-2 minutes for deployment
- Check repository Settings → Pages for status
- Ensure files are pushed to `main` branch

## Advanced Features

### Automated Backups
Use the JSON export feature regularly to backup announcements:
```bash
# Create a backups folder in your repo
mkdir backups
# Regularly export and commit JSON files
```

### Integration with Email
Copy the email template HTML and customize:
1. Use the base64 logo for offline emails
2. Update announcement content
3. Paste into your email client's HTML editor

### Mobile Optimization
The site is fully responsive:
- Uses CSS Grid for layout
- Flexible typography
- Touch-friendly buttons
- Optimized for mobile viewing

## Support & Maintenance

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure all files are in the repository root
4. Verify GitHub Pages is enabled

## License

Created for KY-131 Heartland Composite Squadron - Civil Air Patrol

---

**Last Updated:** December 15, 2025

**Version:** 1.0.0
