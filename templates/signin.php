<?php
// Simple config for admin credentials
$config = json_decode('{"username": "admin", "password": "admin123"}', true);
$login_error = '';
$logged_in = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    if ($user === $config['username'] && $pass === $config['password']) {
        $logged_in = true;
    } else {
        $login_error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign In</title>
</head>
<body style="background:#f7f7f7;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
    <div style="background:#fff;padding:32px 24px 24px 24px;border-radius:10px;box-shadow:0 2px 16px rgba(0,0,0,0.08);min-width:320px;max-width:400px;width:100%;">
        <h2 style="margin-top:0;text-align:center;color:#333;font-size:2em;letter-spacing:1px;">Sign In</h2>
        <?php if ($logged_in): ?>
            <div style="background:#e6ffe6;color:#2d7a2d;padding:12px 16px;border-radius:6px;text-align:center;margin-bottom:16px;">Welcome, admin!</div>
            <div style="text-align:center;margin-top:20px;"><a href="edits.php" style="color:#1976d2;text-decoration:underline;font-weight:500;">Go to Edits Page</a></div>
        <?php else: ?>
        <form method="post" style="display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;flex-direction:column;">
                <label for="username" style="margin-bottom:6px;color:#444;font-weight:500;">Username</label>
                <input type="text" name="username" id="username" style="padding:10px 12px;border:1px solid #ccc;border-radius:5px;font-size:1em;outline:none;" required>
            </div>
            <div style="display:flex;flex-direction:column;">
                <label for="password" style="margin-bottom:6px;color:#444;font-weight:500;">Password</label>
                <input type="password" name="password" id="password" style="padding:10px 12px;border:1px solid #ccc;border-radius:5px;font-size:1em;outline:none;" required>
            </div>
            <?php if ($login_error): ?>
                <span style="color:#d32f2f;font-size:0.95em;margin-top:4px;"> <?php echo $login_error; ?> </span>
            <?php endif; ?>
            <button type="submit" style="background:#1976d2;color:#fff;padding:12px 0;border:none;border-radius:5px;font-size:1.1em;font-weight:600;cursor:pointer;transition:background 0.2s;">Sign In</button>
        </form>
        <?php endif; ?>
    </div>
</body>
</html>
