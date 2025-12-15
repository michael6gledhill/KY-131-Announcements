
import React from 'react';
import { getAnnouncements } from '../utils/storage';
import '../styles/announcements.css';

type Announcement = {
  date?: string;
  title?: string;
  location?: string;
  uod?: string;
  details?: string;
  cadets?: string;
  primaryAM?: string;
  link?: string;
};

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(getAnnouncements());
  React.useEffect(() => {
    const onStorage = () => setAnnouncements(getAnnouncements());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return (
    <div className="announcements-container">
      <h1>Squadron Announcements</h1>
      {announcements.length === 0 ? <div>No announcements yet.</div> : (
        announcements.map((a: Announcement, i: number) => (
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
  );
};
export default AnnouncementsPage;
