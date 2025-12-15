import React, { useState, useEffect } from 'react';

// Utility to extract editable sections from html.html
function extractSections(html: string) {
  // This is a simple example. You may want to use a DOMParser for more robust extraction.
  const getSection = (regex: RegExp) => {
    const match = html.match(regex);
    return match ? match[1].trim() : '';
  };
  return {
    title: getSection(/<h1[^>]*>([\s\S]*?)<\/h1>/i),
    subtitle: getSection(/<p[^>]*>([\s\S]*?)<\/p>/i),
    meetings: getSection(/Upcoming Squadron Meetings<\/h2>\s*([\s\S]*?)<\/div>\s*<div[^>]*>\s*<h2[^>]*>General Squadron Information/i),
    generalInfo: getSection(/General Squadron Information<\/h2>\s*([\s\S]*?)<\/div>\s*<div[^>]*>\s*<h2[^>]*>Ongoing Opportunities/i),
    ongoing: getSection(/Ongoing Opportunities<\/h2>\s*([\s\S]*?)<\/div>\s*<div[^>]*>\s*<h2[^>]*>Wing & Higher Command Announcements/i),
    wing: getSection(/Wing & Higher Command Announcements<\/h2>\s*([\s\S]*?)<\/div>\s*<div[^>]*style=[^>]*>\s*<strong>/i),
    footer: getSection(/<div[^>]*>\s*<strong>([\s\S]*?)<\/strong>/i)
  };
}

function updateHtml(html: string, fields: any) {
  // Replace each section in the HTML with the updated value
  let updated = html;
  updated = updated.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, `<h1 style="font-size: 2.5em; margin: 0 0 10px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">${fields.title}</h1>`);
  updated = updated.replace(/<p[^>]*>[\s\S]*?<\/p>/i, `<p style="font-size: 1.1em; font-weight: 400; opacity: 0.95; margin: 0;">${fields.subtitle}</p>`);
  updated = updated.replace(/(Upcoming Squadron Meetings<\/h2>)([\s\S]*?)(<\/div>\s*<div[^>]*>\s*<h2[^>]*>General Squadron Information)/i, `$1\n${fields.meetings}\n$3`);
  updated = updated.replace(/(General Squadron Information<\/h2>)([\s\S]*?)(<\/div>\s*<div[^>]*>\s*<h2[^>]*>Ongoing Opportunities)/i, `$1\n${fields.generalInfo}\n$3`);
  updated = updated.replace(/(Ongoing Opportunities<\/h2>)([\s\S]*?)(<\/div>\s*<div[^>]*>\s*<h2[^>]*>Wing & Higher Command Announcements)/i, `$1\n${fields.ongoing}\n$3`);
  updated = updated.replace(/(Wing & Higher Command Announcements<\/h2>)([\s\S]*?)(<\/div>\s*<div[^>]*style=[^>]*>\s*<strong>)/i, `$1\n${fields.wing}\n$3`);
  updated = updated.replace(/(<div[^>]*>\s*<strong>)[\s\S]*?(<\/strong>)/i, `$1${fields.footer}$2`);
  return updated;
}

export default function HtmlEditorApp() {
  const [html, setHtml] = useState('');
  const [fields, setFields] = useState<any>({});

  // Load html.html on mount
  useEffect(() => {
    fetch('html.html')
      .then(res => res.text())
      .then(text => {
        setHtml(text);
        setFields(extractSections(text));
      });
  }, []);

  // Update HTML when fields change
  const previewHtml = html && Object.keys(fields).length > 0 ? updateHtml(html, fields) : html;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: '2em', fontWeight: 700, marginBottom: 24 }}>Edit html.html</h1>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 32 }}>
        {Object.keys(fields).map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontWeight: 600 }}>{key}</label>
            <textarea
              rows={key === 'footer' ? 2 : 6}
              value={fields[key]}
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
