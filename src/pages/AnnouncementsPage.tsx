import React from 'react';
import { getAnnouncements } from '../utils/storage';
import '../styles/announcements.css';

// Extend Announcement type for future use
export type Announcement = {
  date?: string;
  title?: string;
  location?: string;
  uod?: string;
  details?: string;
  cadets?: string;
  primaryAM?: string;
  link?: string;
};

type ParsedData = {
  announcements: Announcement[];
  links: string[];
  ongoing: string[];
  wing: string[];
};

function getParsedData(): ParsedData {
  // Try to get all sections from localStorage (if available)
  try {
    const data = JSON.parse(localStorage.getItem('announcements_full') || 'null');
    if (data && data.announcements) return data;
  } catch {}
  // Fallback: just announcements
  return { announcements: getAnnouncements(), links: [], ongoing: [], wing: [] };
}

const AnnouncementsPage: React.FC = () => {
  const [parsed, setParsed] = React.useState<ParsedData>(getParsedData());
  React.useEffect(() => {
    const onStorage = () => setParsed(getParsedData());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return (
    <div className="announcements-container">
      <h1>Squadron Announcements</h1>
      <div className="section">
        <h2>Upcoming Events & Announcements</h2>
        {parsed.announcements.length === 0 ? <div className="empty">No announcements yet.</div> : (
          parsed.announcements.map((a, i) => (
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
          ))
        )}
      </div>
      {parsed.ongoing && parsed.ongoing.length > 0 && (
        <div className="section">
          <h2>Ongoing Programs & Special Links</h2>
          {parsed.ongoing.map((o, i) => (
            <div className="ongoing" key={i}>{o}</div>
          ))}
        </div>
      )}
      {parsed.links && parsed.links.length > 0 && (
        <div className="section">
          <h2>Important Links</h2>
          {parsed.links.map((l, i) => (
            <div className="link" key={i}><a href={l}>{l}</a></div>
          ))}
        </div>
      )}
      {parsed.wing && parsed.wing.length > 0 && (
        <div className="section">
          <h2>Wing & Higher Command Events</h2>
          {parsed.wing.map((w, i) => (
            <div className="wing" key={i}>{w}</div>
          ))}
        </div>
      )}
    </div>
  );
};
export default AnnouncementsPage;
