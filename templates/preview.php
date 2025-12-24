<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview Announcements</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Ubuntu', Arial, sans-serif; background: linear-gradient(135deg, #001489 0%, #0056d2 100%); color: #333; line-height: 1.6; padding: 20px; min-height: 100vh; margin: 0;">
<div style="max-width: 1000px; margin: 0 auto; background: #fff; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); border-radius: 12px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #001489 0%, #003ab8 100%); color: #fff; padding: 50px 40px; text-align: center; border-top: 6px solid; border-image: linear-gradient(90deg, #FFCD00 0%, #BA0C2F 50%, #FFCD00 100%) 1;">
    <h1 style="font-size: clamp(1.5em, 5vw, 2.8em); margin: 0 0 10px 0; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 2px 8px rgba(0,0,0,0.25), 0 0 2px #fff; line-height: 1.1; color: #fff; background: rgba(0,0,0,0.08); border-radius: 8px; padding: 0.2em 0.5em; display: inline-block; word-break: break-word;">Preview Announcements</h1>
    <p style="font-size: clamp(1em, 2.5vw, 1.3em); font-weight: 500; opacity: 0.98; margin: 0; color: #FFCD00; text-shadow: 0 1px 4px rgba(0,0,0,0.18); background: rgba(0,0,0,0.05); border-radius: 6px; padding: 0.15em 0.4em; display: inline-block; word-break: break-word;">Live preview of your announcement content below.</p>
  </div>
  <div style="padding: 40px;">
    <form method="post" style="margin-bottom: 32px;">
      <label for="announcement" style="font-weight:700; color:#001489;">Paste your HTML with inline CSS here:</label><br>
      <textarea id="announcement" name="announcement" rows="12" style="width:100%;margin-top:10px;padding:12px;border-radius:8px;border:1px solid #ccc;font-size:1.1em;font-family:'Ubuntu',Arial,sans-serif;resize:vertical;"><?php echo isset($_POST['announcement']) ? htmlspecialchars($_POST['announcement']) : ''; ?></textarea>
      <button type="submit" style="margin-top:18px;background:linear-gradient(135deg,#001489 0%,#003ab8 100%);color:#fff;padding:12px 32px;border:none;border-radius:6px;font-size:1.1em;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.10);">Preview</button>
    </form>
    <?php if (!empty($_POST['announcement'])): ?>
      <div style="border:2px dashed #001489;padding:24px;border-radius:10px;background:#f9f9f9;">
        <h2 style="color:#001489;font-size:1.3em;font-weight:700;margin-top:0;">Live Preview</h2>
        <div><?php echo $_POST['announcement']; ?></div>
        <form method="post" action="export.php" style="margin-top:24px;">
          <input type="hidden" name="export_content" value="<?php echo htmlspecialchars($_POST['announcement']); ?>">
          <button type="submit" style="background:linear-gradient(135deg,#FFCD00 0%,#ffd833 100%);color:#333;padding:12px 32px;border:none;border-radius:6px;font-size:1.1em;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(255,205,0,0.10);margin-top:10px;">Export as HTML</button>
        </form>
      </div>
    <?php endif; ?>
  </div>
  <div style="background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); padding: 30px; text-align: center; font-size: 1em; color: #666; border-top: 6px solid; border-image: linear-gradient(90deg, #FFCD00 0%, #BA0C2F 50%, #001489 100%) 1;">
    <strong>Paste your HTML above, preview it, and export as a standalone HTML file with inline CSS.</strong>
  </div>
</div>
</body>
</html>
