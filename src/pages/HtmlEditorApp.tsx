import React, { useState } from 'react';

// html.html template with placeholders
const htmlTemplate = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Squadron Announcements - Civil Air Patrol</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap\" rel=\"stylesheet\">\n</head>\n<body style=\"font-family: 'Ubuntu', Arial, sans-serif; background: linear-gradient(135deg, #001489 0%, #0056d2 100%); color: #333; line-height: 1.6; padding: 20px; min-height: 100vh; margin: 0;\">\n\n<div style=\"max-width: 1000px; margin: 0 auto; background: #fff; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); border-radius: 12px; overflow: hidden;\">\n  \n  <div style=\"background: linear-gradient(135deg, #001489 0%, #003ab8 100%); color: #fff; padding: 50px 40px; text-align: center; position: relative; overflow: hidden; border-top: 6px solid; border-image: linear-gradient(90deg, #FFCD00 0%, #BA0C2F 50%, #FFCD00 100%) 1;\">\n    <h1 style=\"font-size: 2.5em; margin: 0 0 10px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);\">{title}</h1>\n    <p style=\"font-size: 1.1em; font-weight: 400; opacity: 0.95; margin: 0;\">{subtitle}</p>\n  </div>\n\n  <div style=\"padding: 40px;\">\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00; position: relative;\">Upcoming Squadron Meetings</h2>\n      {meetings}\n    </div>\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00;\">General Squadron Information</h2>\n      {generalInfo}\n    </div>\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00;\">Ongoing Opportunities</h2>\n      {ongoing}\n    </div>\n    <div style=\"margin-bottom: 50px;\">\n      <h2 style=\"color: #001489; font-size: 1.8em; font-weight: 700; margin: 0 0 25px 0; padding-bottom: 12px; border-bottom: 4px solid #FFCD00;\">Wing & Higher Command Announcements</h2>\n      {wing}\n    </div>\n  </div>\n  <div style=\"background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); padding: 30px; text-align: center; font-size: 1em; color: #666; border-top: 6px solid; border-image: linear-gradient(90deg, #FFCD00 0%, #BA0C2F 50%, #001489 100%) 1;\">\n    <strong>{footer}</strong>\n  </div>\n</div>\n</body>\n</html>`;

const defaultFields = {
  title: 'Squadron Announcements',
  subtitle: 'Civil Air Patrol - Heartland Composite Squadron',
  meetings: '',
  generalInfo: '',
  ongoing: '',
  wing: '',
  footer: 'Remember to "Reply All" if you have questions or need clarification on anything listed above.'
};

function parseRawText(raw: string) {
  // Simple parser for demonstration. You can expand this for more robust parsing.
  const lines = raw.split(/\r?\n/).map(l => l.trim());
  let meetings = '', generalInfo = '', ongoing = '', wing = '', section = 'meetings';
  for (let line of lines) {
    if (/^All Cadets and Parents:/i.test(line) || /^This group is for/i.test(line)) section = 'generalInfo';
    else if (/ongoing/i.test(line)) section = 'ongoing';
    else if (/wing/i.test(line)) section = 'wing';
    else if (/^Remember to/i.test(line)) section = 'footer';
    if (section === 'meetings') meetings += line + '\n';
    else if (section === 'generalInfo') generalInfo += line + '\n';
    else if (section === 'ongoing') ongoing += line + '\n';
    else if (section === 'wing') wing += line + '\n';
  }
  return { meetings, generalInfo, ongoing, wing };
}

export default function HtmlEditorApp() {
  const [fields, setFields] = useState(defaultFields);
  const [rawText, setRawText] = useState('');

  const handleParse = () => {
    const parsed = parseRawText(rawText);
    setFields({ ...fields, ...parsed });
  };

  const generateHtml = () => {
    let html = htmlTemplate;
    Object.entries(fields).forEach(([key, value]) => {
      html = html.replace(`{${key}}`, value.replace(/\n/g, '<br>'));
    });
    return html;
  };

  const previewHtml = generateHtml();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: '2em', fontWeight: 700, marginBottom: 24 }}>Squadron Announcements HTML Editor</h1>
      <textarea
        value={rawText}
        onChange={e => setRawText(e.target.value)}
        placeholder="Paste your raw announcements text here..."
        style={{ width: '100%', minHeight: 120, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc', padding: 12, fontSize: 16 }}
      />
      <button
        onClick={handleParse}
        style={{ padding: '10px 28px', fontSize: 16, fontWeight: 700, background: '#0056d2', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 24 }}
      >
        Parse & Preview
      </button>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 32 }}>
        {Object.keys(fields).map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontWeight: 600 }}>{key}</label>
            <textarea
              rows={key === 'footer' ? 2 : 6}
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
          a.download = 'html.html';
          a.click();
          URL.revokeObjectURL(url);
        }}
        style={{ padding: '12px 32px', fontSize: 18, fontWeight: 700, background: '#001489', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 32 }}
        type="button"
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
