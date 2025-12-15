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
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-10 text-center tracking-tight flex items-center justify-center gap-3">
        <span role="img" aria-label="announcement">📢</span> Squadron Announcements
      </h1>
      {/* Announcements Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <span role="img" aria-label="calendar">🗓️</span> Upcoming Events & Announcements
        </h2>
        {parsed.announcements.length === 0 ? (
          <div className="text-gray-400 italic">No announcements yet.</div>
        ) : (
          <div className="grid gap-6">
            {parsed.announcements.map((a, i) => (
              <div className="bg-blue-50 border-l-8 border-blue-400 rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:gap-8" key={i}>
                <div className="flex-shrink-0 w-32 mb-2 md:mb-0">
                  <div className="text-2xl font-bold text-blue-700">{a.date}</div>
                  <div className="text-sm text-gray-500">{a.title}</div>
                </div>
                <div className="flex-1 space-y-1">
                  {a.location && <div><span className="font-semibold text-gray-700">📍 Location:</span> {a.location}</div>}
                  {a.uod && <div><span className="font-semibold text-gray-700">🎽 UOD:</span> {a.uod}</div>}
                  {a.details && <div><span className="font-semibold text-gray-700">📝 Details:</span> {a.details}</div>}
                  {a.cadets && <div><span className="font-semibold text-gray-700">👤 Cadets:</span> {a.cadets}</div>}
                  {a.primaryAM && <div><span className="font-semibold text-gray-700">🧑‍✈️ Primary AM:</span> {a.primaryAM}</div>}
                  {a.link && <div><span className="font-semibold text-gray-700">🔗 Link:</span> <a className="text-blue-600 underline break-all" href={a.link} target="_blank" rel="noopener noreferrer">{a.link}</a></div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Ongoing Items Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
          <span role="img" aria-label="repeat">🔄</span> Ongoing Items
        </h2>
        {parsed.ongoing.length === 0 ? (
          <div className="text-gray-400 italic">No ongoing items.</div>
        ) : (
          <ul className="space-y-4">
            {parsed.ongoing.map((item, i) => (
              <li key={i} className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4 text-gray-800 shadow-sm">
                <span className="font-semibold text-purple-700">•</span> {item}
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Important Links Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
          <span role="img" aria-label="link">🔗</span> Important Links
        </h2>
        {parsed.links.length === 0 ? (
          <div className="text-gray-400 italic">No links provided.</div>
        ) : (
          <ul className="space-y-4">
            {parsed.links.map((link, i) => (
              <li key={i} className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 shadow-sm">
                <a className="text-green-700 underline break-all font-semibold" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Wing & Higher Announcements Section */}
      <section>
        <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
          <span role="img" aria-label="wings">🪶</span> Wing & Higher Announcements
        </h2>
        {parsed.wing.length === 0 ? (
          <div className="text-gray-400 italic">No wing/higher announcements.</div>
        ) : (
          <ul className="space-y-4">
            {parsed.wing.map((item, i) => (
              <li key={i} className="bg-pink-50 border-l-4 border-pink-400 rounded-lg p-4 text-gray-800 shadow-sm">
                <span className="font-semibold text-pink-700">•</span> {item}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
export default AnnouncementsPage;
