<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['export_content'])) {
    $html = $_POST['export_content'];
    $filename = 'exported_announcement.html';
    header('Content-Type: text/html');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    echo $html;
    exit;
} else {
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Export Error</title></head><body style="font-family:sans-serif;background:#f7f7f7;text-align:center;padding:60px;">';
    echo '<div style="display:inline-block;background:#fff;padding:32px 40px;border-radius:10px;box-shadow:0 2px 16px rgba(0,0,0,0.08);">';
    echo '<h2 style="color:#BA0C2F;">Nothing to export</h2><p style="color:#333;">Please go back and paste your HTML to preview and export.</p>';
    echo '<a href="preview.php" style="display:inline-block;margin-top:18px;background:linear-gradient(135deg,#001489 0%,#003ab8 100%);color:#fff;padding:12px 32px;border:none;border-radius:6px;font-size:1.1em;font-weight:700;cursor:pointer;text-decoration:none;">Back to Preview</a>';
    echo '</div></body></html>';
    exit;
}
