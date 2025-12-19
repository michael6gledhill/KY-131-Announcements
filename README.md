# KY-131 Announcements Web Editor

This project lets you visually build and edit Bace.html using drag-and-drop templates, then export or deploy your announcements site.

## How to Deploy to GitHub Pages

1. **Move all files to the `docs/` folder** (or use the root for user/organization pages):
   - `template-editor.html`
   - `Bace.html`
   - The `templates/` folder (with all template HTML files)

2. **Update template paths in `template-editor.html`**
   - Change all template file paths to `templates/templateX.html` (relative to `docs/` or root).

3. **Push your changes to GitHub.**

4. **Enable GitHub Pages**
   - Go to your repository settings on GitHub.
   - Under "Pages," set the source to the `docs/` folder (or root if you prefer).
   - Save. GitHub will provide a URL for your site.

5. **Access your site**
   - Visit the provided URL. You can use `template-editor.html` to build your Bace.html, and all templates will be available.

## Notes
- GitHub Pages can only serve static files. All template loading must use relative paths.
- If you add new templates, place them in the `templates/` folder and update the template list in `template-editor.html`.
- If you see CORS or fetch errors, make sure you are accessing the site via the GitHub Pages URL, not as a local file.

---

For more help, see the [GitHub Pages documentation](https://pages.github.com/).
