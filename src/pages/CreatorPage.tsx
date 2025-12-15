import React from 'react';
import { saveAnnouncements, getAnnouncements, saveFullAnnouncements } from '../utils/storage';
import { parseFullAnnouncementsText } from '../utils/parser';
import '../styles/creator.css';

const CreatorPage: React.FC = () => {
  const [rawText, setRawText] = React.useState('');
  const [preview, setPreview] = React.useState<any>({ announcements: [], links: [], ongoing: [], wing: [] });
  const [showPush, setShowPush] = React.useState(false);
  const [parsed, setParsed] = React.useState<any>(null);

  const handleParse = () => {
    const parsed = parseFullAnnouncementsText(rawText);
    setParsed(parsed);
    setPreview(parsed);
    setShowPush(true);
  };
  const handlePush = () => {
    if (parsed && parsed.announcements) {
      saveAnnouncements(parsed.announcements); // legacy
      saveFullAnnouncements(parsed); // new: save all sections
      setShowPush(false);
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Announcements Creator</h1>
      <textarea
        value={rawText}
        onChange={e => setRawText(e.target.value)}
        placeholder="Paste your full announcements text here..."
        className="w-full min-h-[120px] mb-4 rounded-lg border-2 border-gray-200 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleParse}
        className="bg-blue-600 hover:bg-purple-600 text-white rounded-lg px-6 py-2 font-semibold text-base mr-2 transition"
      >
        Parse & Preview
      </button>
      {showPush && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl min-w-[300px] text-center shadow-xl">
            <div className="mb-4 text-lg font-medium">Push to Announcements Page?</div>
            <button
              onClick={handlePush}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2 font-semibold mr-2 transition"
            >
              Yes, Push
            </button>
            <button
              onClick={() => setShowPush(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg px-5 py-2 font-semibold transition"
            >
              No, Just Preview
            </button>
          </div>
        </div>
      )}
      <div className="mt-8">
        {/* Announcements Preview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Upcoming Events & Announcements</h2>
          {preview.announcements.length === 0 ? (
            <div className="text-gray-500 italic">No announcements parsed yet.</div>
          ) : (
            preview.announcements.map((a: any, i: number) => (
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
        {/* Ongoing Items Preview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Ongoing Items</h2>
          {preview.ongoing.length === 0 ? (
            <div className="text-gray-500 italic">No ongoing items.</div>
          ) : (
            <ul className="list-disc pl-6 space-y-2">
              {preview.ongoing.map((item: string, i: number) => (
                <li key={i} className="text-gray-800">{item}</li>
              ))}
            </ul>
          )}
        </section>
        {/* Links Preview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Important Links</h2>
          {preview.links.length === 0 ? (
            <div className="text-gray-500 italic">No links provided.</div>
          ) : (
            <ul className="list-disc pl-6 space-y-2">
              {preview.links.map((link: string, i: number) => (
                <li key={i}><a className="text-green-700 underline" href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
              ))}
            </ul>
          )}
        </section>
        {/* Wing Announcements Preview */}
        <section>
          <h2 className="text-xl font-semibold text-pink-700 mb-4">Wing & Higher Announcements</h2>
          {preview.wing.length === 0 ? (
            <div className="text-gray-500 italic">No wing/higher announcements.</div>
          ) : (
            <ul className="list-disc pl-6 space-y-2">
              {preview.wing.map((item: string, i: number) => (
                <li key={i} className="text-gray-800">{item}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
export default CreatorPage;
