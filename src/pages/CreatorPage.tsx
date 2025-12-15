import React from 'react';
import { saveAnnouncements, getAnnouncements, saveFullAnnouncements } from '../utils/storage';
import { parseFullAnnouncementsText } from '../utils/parser';
import '../styles/creator.css';

const CreatorPage: React.FC = () => {
  const [rawText, setRawText] = React.useState('');
  const [aiLoading, setAiLoading] = React.useState(false);
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
  // AI Assistant: Generate announcement text
  const handleAIGenerate = async () => {
    setAiLoading(true);
    // Placeholder: Replace with real API call to OpenAI or your backend
    // Example: fetch('/api/generate', { method: 'POST', body: JSON.stringify({ prompt }) })
    setTimeout(() => {
      setRawText(`Squadron Announcements\nUpcoming Events & Announcements\n15 December\nEmergency Services\nLocation: EKX\nUOD: ABU/OCPs (Bring a fleece jacket, or coat if you don't have a fleece [Stay warm])\nDetails: TBA\nCadets: C/CMSgt Fruth M.\nPrimary AM: Capt Threadgill\n22 December\nCDI\nLocation: Virtual\nUOD: Civilian\nDetails: Meeting will be held Virtually. 45 minute CDI class CDI Class Monday, Dec 22 · 6:30–7:15 PM\nLink: https://meet.google.com/djh-ghwp-vsj\n29 December\nNO MEETING\n5 January\nPT\nLocation: Armary\nUOD: PTs\nDetails: TBA\nCadets: 1st srg.\nOngoing Items\n\nsUAS Course - ONGOING (All Members) For those interested in the sUAS Technician and Mission Pilot courses, follow this Google Classroom link for instructions on the program: https://classroom.google.com/c/NDQ1ODk4OTA0MDY4?cjc=wsiqpag.\nWreaths Across America – ONGOING (All Members) Please continue to promote the sponsorship of WAA wreaths throughout the year Each wreath purchased using our landing page or QR code generates $5 for KY131 https://www.wreathsacrossamerica.org/pages/170868/Overview/?relatedId=16095 \n\nImportant Links\n\nAll Cadets and Parents: Join our squadron’s private facebook group at this link. If your last name is different from your cadet’s last name, reach out to 2nd Lt. Gledhill for approval.: https://www.facebook.com/groups/2148921918874572/?should_open_composer=true\n\nWing & Higher Announcements\n\nApplications for 2026 OHWG Encampment cadet cadre are open now until Jan. 23. This is open to all cadets who have completed their basic encampment, and will be Staff Sgt. or above by June 2026. Because of the proximity to WP Air Force Base, this encampment provides awesome opportunities for both students and cadre. Encampment Dates: June 6-13, 2026 Please apply by completing the form linked here - https://forms.gle/2SSeARZ5ZQV4c5LR9.\nPositions Available: - Cadet Training Squadron Commanders - Training and Support Squadron Deputy Commanders - Squadron First Sergeants - Flight Commanders - Flight Sergeants - Administration Staff - Curriculum and Plans Staff - Health Support Staff - Logistics Staff - Public Affairs Staff (2Lt. Gledhill will be the PAO) All applicants must attend staff selection at Camp Perry, on 20-22 February 2026. We are planning to take the squadron van to transport cadets to Camp Perry if there is a need.\nKYWG MONTHLY VIRTUAL EMERGENCY SERVICES MEETING: Join the KYWG ES team Every second Sunday from 4:00-5:00 PM. If you are interested in attending the virtual meeting, check first with your squadron commander or swiping commander for cadets, then email Capt. Lense & cc your leadership: mlense@kywg.cap.gov. https://www.gocivilairpatrol.com/programs/emergency-services\nDecember 15 - February 28 NCSA Applications:\nMark your calendars! Applications for 2026 Summer National Cadet Special Activities (NCSAs) are scheduled to open on December 15 by 12pm Central. Learn more about National Cadet Special Activities at http://ncsas.com\nDecember 28 - January3 - Southeast Region Encampment Held at Maxwell AFB, Alabama Cadets who were not able to attend summer encampment, but want to be eligible for NCSA’s next summer should consider this winter encampment. Lt. Melanie Gledhill will be staffing as part of the PA team. https://ser.cap.gov/winter-activities/ser-encampment\nMarch 20 - 22 Kentucky Wing Annual Conference Bluegrass Convention Center 1950 Newton Pike, Suite 101. Lexington KY40511\nEARLY REGISTRATION IS NOW OPEN FOR THE 2026 KYWG CONFERENCE Early Bird Registration for the 2026 Kentucky Wing Conference is live. Register in eServices Registration Zone before December 31 and save $5 off the full ticket price. Get your Full Conference Ticket now for a weekend packed with great speakers, learning, and meals (including the Saturday banquet).\nRemember to \"Reply All\" if you have questions or need clarification on anything listed above.`);
      setAiLoading(false);
    }, 2000);
  };
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center flex items-center gap-3">
        Announcements Creator
        <button
          onClick={handleAIGenerate}
          disabled={aiLoading}
          className="ml-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
          title="Use AI to generate a professional announcement template"
        >
          {aiLoading ? 'Generating...' : '✨ AI Assist'}
        </button>
      </h1>
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
