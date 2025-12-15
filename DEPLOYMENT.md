# Deployment Guide for KY-131 Announcements

## Quick Start - Deploy to GitHub Pages in 5 Minutes

### Prerequisites
- Git installed on your computer
- A GitHub account
- Repository already created at: `https://github.com/michael6gledhill/KY-131-Announcements`

### Step 1: Add Your Logo

1. Save your squadron logo as `logo.png` in the repository folder
2. Make sure it's in: `c:\Users\cadet\Documents\GitHub\KY-131-Announcements\logo.png`

### Step 2: Commit and Push Files

Open PowerShell in the repository folder and run:

```powershell
# Navigate to the folder
cd "c:\Users\cadet\Documents\GitHub\KY-131-Announcements"

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Add: Announcements system with creator tool and email template"

# Push to GitHub
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to https://github.com/michael6gledhill/KY-131-Announcements
2. Click **Settings** (top right)
3. Scroll down to **Pages** section
4. Under "Build and deployment":
   - Source: Select `Deploy from a branch`
   - Branch: Select `main` and `/root`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 4: Access Your Site

Your announcements site is now live at:
- **Main Page:** https://michael6gledhill.github.io/KY-131-Announcements/
- **Creator Tool:** https://michael6gledhill.github.io/KY-131-Announcements/creator.html
- **Email Template:** https://michael6gledhill.github.io/KY-131-Announcements/email-template.html

## File Structure

```
KY-131-Announcements/
├── index.html              # Main announcement display
├── creator.html            # Announcement creator tool
├── email-template.html     # Email-ready template
├── logo.png               # Squadron logo (add this)
├── README.md              # Documentation
├── DEPLOYMENT.md          # This file
├── LOGO_SETUP.md          # Logo setup instructions
├── package.json           # Project metadata
└── .gitignore            # Git ignore rules
```

## After Deployment

### Sharing the Links

Share these links with your squadron:

- **View Announcements:** https://michael6gledhill.github.io/KY-131-Announcements/
  - Displays all announcements in a beautiful format
  - Mobile-friendly

- **Create Announcements:** https://michael6gledhill.github.io/KY-131-Announcements/creator.html
  - Anyone can create/edit announcements
  - Announcements save locally in each browser
  - Export/import data as needed

### Updating Announcements

Since announcements are stored in the browser (LocalStorage), each person who visits the creator tool will have their own copy. To share announcements:

1. **Export from Creator:** Click "Export All" to get JSON
2. **Share the JSON:** Send via email or message
3. **Import in Creator:** Others click "Import JSON" and paste

Or use the automatic sharing:
- Announcements on one device can be exported and imported on another
- No account needed - all browser-based

### Regular Updates to the Website

To update the website itself:

```powershell
# Edit files locally
# Then:
git add .
git commit -m "Update: description of changes"
git push origin main

# Changes deploy automatically within 1-2 minutes
```

## Troubleshooting

### GitHub Pages Not Showing?
- Verify Pages is enabled in Settings
- Check branch is `main` and folder is `/ (root)`
- Wait 2-3 minutes for first deployment
- Check repository is public (free tier requirement)

### Logo Not Displaying?
- Ensure `logo.png` is in the repository root
- Push the file to GitHub: `git add logo.png && git commit -m "Add logo" && git push`
- Clear browser cache
- Check file is PNG format

### Announcements Not Persisting?
- LocalStorage is browser-specific - each device keeps its own copy
- Use Export/Import to sync between devices
- Check browser allows LocalStorage

### Site Shows Old Content?
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Clear browser cache
- Try different browser

## Advanced: Custom Domain

To use a custom domain instead of `github.io`:

1. In Settings → Pages → Custom Domain
2. Enter your domain (e.g., announcements.ky131.org)
3. Add DNS records as GitHub instructs
4. Enable HTTPS

## Maintenance

### Backup Your Data

Regularly export announcements:

```
1. Open creator.html
2. Click "Export All"
3. Save JSON file somewhere safe
```

### Update the System

If you want to update the announcement system:

1. Edit the HTML files
2. Commit and push changes
3. Changes appear automatically

### Monitor Usage

Check how many people are using the site:
- Go to Settings → Pages → View details
- See traffic statistics

## Need Help?

- Check README.md for feature documentation
- Review LOGO_SETUP.md for logo issues
- Verify all files are pushed to GitHub

---

**Deployment completed!** Your squadron announcements system is now live. 🎉
