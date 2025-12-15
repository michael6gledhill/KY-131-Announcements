export function parseFullAnnouncementsText(text: string) {
  const blocks = text.split(/\n\s*\n/);
  let announcements: any[] = [];
  let links: string[] = [];
  let ongoing: string[] = [];
  let wing: string[] = [];
  let current: any = {};
  let section = '';
  for (let block of blocks) {
    const lines = block.trim().split(/\n/).map(l=>l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    if (/^SQUADRON ANNOUNCEMENTS/i.test(lines[0])) { section = 'squadron'; continue; }
    if (/^WING AND HIGHER/i.test(lines[0])) { section = 'wing'; continue; }
    if (/^ONGOING PROGRAMS/i.test(lines[0])) { section = 'ongoing'; continue; }
    if (/^\d{1,2} [A-Za-z]+ -/.test(lines[0])) {
      if (current.date) announcements.push(current);
      current = {};
      const m = lines[0].match(/^(\d{1,2} [A-Za-z]+) - (.+)$/);
      if (m) { current.date = m[1]; current.title = m[2]; }
      for (let i=1; i<lines.length; ++i) {
        let l = lines[i];
        if (/^Location:/i.test(l)) current.location = l.replace(/^Location:/i,'').trim();
        else if (/^UOD:/i.test(l)) current.uod = l.replace(/^UOD:/i,'').trim();
        else if (/^Details:/i.test(l)) current.details = l.replace(/^Details:/i,'').trim();
        else if (/^Cadets?:/i.test(l)) current.cadets = l.replace(/^Cadets?:/i,'').trim();
        else if (/^Primary AM:/i.test(l)) current.primaryAM = l.replace(/^Primary AM:/i,'').trim();
        else if (/https?:\/+/.test(l)) {
          const match = l.match(/https?:\/\/\S+/);
          if (match) current.link = match[0];
        }
        else if (/NO MEETING/i.test(l)) current.title = 'NO MEETING';
        else if (current.details) current.details += '\n'+l;
        else current.details = l;
      }
    } else if (/NO MEETING/i.test(lines[0])) {
      if (current.date) announcements.push(current);
      current = { title: 'NO MEETING' };
    } else if (/https?:\/+/.test(lines[0])) {
      if (section === 'ongoing') ongoing.push(lines[0]);
      else links.push(lines[0]);
    } else if (section === 'wing') {
      wing.push(block);
    } else if (section === 'ongoing') {
      ongoing.push(block);
    } else if (/facebook|photos|classroom|wreathsacrossamerica/i.test(block)) {
      ongoing.push(block);
    }
  }
  if (current.date) announcements.push(current);
  return { announcements, links, ongoing, wing };
}
