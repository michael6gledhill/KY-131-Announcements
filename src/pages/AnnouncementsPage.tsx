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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Squadron Announcements</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Upcoming Events & Announcements</h2>
        {parsed.announcements.length === 0 ? (
          <div className="text-gray-500 italic">No announcements yet.</div>
        ) : (
          parsed.announcements.map((a, i) => (
            <div className="mb-6 border-l-4 border-blue-400 bg-blue-50 p-4 rounded-lg shadow-sm" key={i}>
              <div className="font-bold text-blue-700 mb-1">{a.date}</div>
              <div className="text-lg font-semibold text-blue-900 mb-1">{a.title}</div>
              {a.location && <div className="mb-1"><span className="font-medium text-gray-700">Location:</span> {a.location}</div>}
              {a.uod && <div className="mb-1"><span className="font-medium text-gray-700">UOD:</span> {a.uod}</div>}
              {a.details && <div className="mb-1"><span className="font-medium text-gray-700">Details:</span> {a.details}</div>}
              {a.cadets && <div className="mb-1"><span className="font-medium text-gray-700">Cadets:</span> {a.cadets}</div>}
              {a.primaryAM && <div className="mb-1"><span className="font-medium text-gray-700">Primary AM:</span> {a.primaryAM}</div>}
              {a.link && <div className="mb-1"><span className="font-medium text-gray-700">Link:</span> <a className="text-blue-600 underline" href={a.link}>{a.link}</a></div>}
            </div>
          ))
        )}
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Ongoing Items</h2>
        {parsed.ongoing.length === 0 ? (
          <div className="text-gray-500 italic">No ongoing items.</div>
        ) : (
          <ul className="list-disc pl-6 space-y-2">
            {parsed.ongoing.map((item, i) => (
              <li key={i} className="text-gray-800">{item}</li>
            ))}
          </ul>
        )}
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Important Links</h2>
        {parsed.links.length === 0 ? (
          <div className="text-gray-500 italic">No links provided.</div>
        ) : (
          <ul className="list-disc pl-6 space-y-2">
            {parsed.links.map((link, i) => (
              <li key={i}><a className="text-green-700 underline" href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold text-pink-700 mb-4">Wing & Higher Announcements</h2>
        {parsed.wing.length === 0 ? (
          <div className="text-gray-500 italic">No wing/higher announcements.</div>
        ) : (
          <ul className="list-disc pl-6 space-y-2">
            {parsed.wing.map((item, i) => (
              <li key={i} className="text-gray-800">{item}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
export default AnnouncementsPage;
