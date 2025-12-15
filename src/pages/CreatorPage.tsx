import React from 'react';
import { saveAnnouncements, getAnnouncements } from '../utils/storage';
import { parseFullAnnouncementsText } from '../utils/parser';
import '../styles/creator.css';

const CreatorPage: React.FC = () => {
  const [rawText, setRawText] = React.useState('');
  const [preview, setPreview] = React.useState<any[]>([]);
  const [showPush, setShowPush] = React.useState(false);
  const [parsed, setParsed] = React.useState<any>(null);

  const handleParse = () => {
    const parsed = parseFullAnnouncementsText(rawText);
    setParsed(parsed);
    setPreview(parsed.announcements || []);
    setShowPush(true);
  };
  const handlePush = () => {
    if (parsed && parsed.announcements) {
      saveAnnouncements(parsed.announcements);
      setShowPush(false);
    }
  };
  return (
    <div className="creator-container">
      <h1>Announcements Creator</h1>
      <textarea value={rawText} onChange={e=>setRawText(e.target.value)} placeholder="Paste your full announcements text here..." />
      <button onClick={handleParse}>Parse & Preview</button>
      {showPush && (
        <div className="modal">
          <div className="modal-content">
            <div>Push to Announcements Page?</div>
            <button onClick={handlePush}>Yes, Push</button>
            <button onClick={()=>setShowPush(false)}>No, Just Preview</button>
          </div>
        </div>
      )}
      <div className="preview">
        {preview.length === 0 ? <div>No announcements parsed yet.</div> : preview.map((a,i)=>(
          <div className="announcement" key={i}>
            <div className="date">{a.date}</div>
            <div className="title">{a.title}</div>
            {a.location && <div className="field"><b>Location:</b> {a.location}</div>}
            {a.uod && <div className="field"><b>UOD:</b> {a.uod}</div>}
            {a.details && <div className="field"><b>Details:</b> {a.details}</div>}
            {a.cadets && <div className="field"><b>Cadets:</b> {a.cadets}</div>}
            {a.primaryAM && <div className="field"><b>Primary AM:</b> {a.primaryAM}</div>}
            {a.link && <div className="field"><b>Link:</b> <a href={a.link}>{a.link}</a></div>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CreatorPage;
