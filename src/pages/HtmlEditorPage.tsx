import React, { useState } from 'react';

// The HTML template as a string (imported or pasted here)
const htmlTemplate = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Squadron Announcements - Civil Air Patrol</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap\" rel=\"stylesheet\">\n</head>\n<body style=\"font-family: 'Open Sans', Arial, sans-serif; background: linear-gradient(135deg, #001489 0%, #0056d2 100%); color: #333; line-height: 1.6; padding: 20px; min-height: 100vh; margin: 0;\">\n\n<div style=\"max-width: 1000px; margin: 0 auto; background: #fff; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); border-radius: 12px; overflow: hidden;\">\n  \n  <div style=\"background: linear-gradient(135deg, #001489 0%, #003ab8 100%); color: #fff; padding: 50px 40px; text-align: center; position: relative; overflow: hidden; border-top: 6px solid; border-image: linear-gradient(90deg, #FFCD00 0%, #BA0C2F 50%, #FFCD00 100%) 1;\">\n    <h1 style=\"font-size: 2.5em; margin: 0 0 10px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);\">Squadron Announcements</h1>\n    <p style=\"font-size: 1.1em; font-weight: 400; opacity: 0.95; margin: 0;\">Civil Air Patrol - Heartland Composite Squadron</p>\n  </div>\n\n  <div style=\"padding: 40px;\">\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00; position: relative;\">Upcoming Squadron Meetings</h2>\n      <div id=\"meeting1\"></div>\n      <div id=\"meeting2\"></div>\n      <div id=\"meeting3\"></div>\n      <div id=\"meeting4\"></div>\n    </div>\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00;\">General Squadron Information</h2>\n      <div id=\"generalInfo\"></div>\n    </div>\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00;\">Ongoing Opportunities</h2>\n      <div id=\"ongoing1\"></div>\n      <div id=\"ongoing2\"></div>\n    </div>\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00;\">Wing & Higher Command Announcements</h2>\n      <div id=\"wing1\"></div>\n      <div id=\"wing2\"></div>\n      <div id=\"wing3\"></div>\n      <div id=\"wing4\"></div>\n      <div id=\"wing5\"></div>\n    </div>\n  </div>\n  <div style=\"background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); padding: 30px; text-align: center; font-size: 1em; color: #666; border-top: 6px solid; border-image: linear-gradient(90deg, #FFCD00 0%, #BA0C2F 50%, #001489 100%) 1;\">\n    <strong>Remember to \"Reply All\" if you have questions or need clarification on anything listed above.</strong>\n  </div>\n</div>\n</body>\n</html>`;

const defaultData = {
  meeting1: '',
  meeting2: '',
  meeting3: '',
  meeting4: '',
  generalInfo: '',
  ongoing1: '',
  ongoing2: '',
  wing1: '',
  wing2: '',
  wing3: '',
  wing4: '',
  wing5: '',
};

export default function HtmlEditorPage() {
  const [fields, setFields] = useState(defaultData);

  // Replace placeholders in the template with user input
  const generateHtml = () => {
    let html = htmlTemplate;
    Object.entries(fields).forEach(([key, value]) => {
      html = html.replace(`<div id=\"${key}\"></div>`, value || `<div id=\"${key}\"></div>`);
    });
    return html;
  };

  // Live preview as iframe
  const previewHtml = generateHtml();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: '2em', fontWeight: 700, marginBottom: 24 }}>Edit Squadron Announcements</h1>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {Object.keys(fields).map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontWeight: 600 }}>{key}</label>
            <textarea
              rows={4}
              value={fields[key as keyof typeof fields]}
              onChange={e => setFields({ ...fields, [key]: e.target.value })}
              style={{ border: '1px solid #ccc', borderRadius: 6, padding: 8, fontFamily: 'inherit', fontSize: 16 }}
              placeholder={`Edit content for ${key}`}
            />
          </div>
        ))}
      </form>
      <button
        onClick={() => {
          const blob = new Blob([previewHtml], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'announcements.html';
          a.click();
          URL.revokeObjectURL(url);
        }}
        style={{ padding: '12px 32px', fontSize: 18, fontWeight: 700, background: '#001489', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 32 }}
      >
        Export HTML
      </button>
      <h2 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 16 }}>Live Preview</h2>
      <iframe
        title="Preview"
        srcDoc={previewHtml}
        style={{ width: '100%', minHeight: 800, border: '1px solid #ccc', borderRadius: 12, background: '#fff' }}
      />
    </div>
  );
}
