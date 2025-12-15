// Legacy: get only announcements array
export function getAnnouncements() {
  try {
    return JSON.parse(localStorage.getItem('announcements') || '[]');
  } catch {
    return [];
  }
}

// New: get all sections (announcements, links, ongoing, wing)
export function getFullAnnouncements() {
  try {
    return JSON.parse(localStorage.getItem('announcements_full') || 'null');
  } catch {
    return null;
  }
}

// Save only announcements array (legacy)
export function saveAnnouncements(announcements: any[]) {
  localStorage.setItem('announcements', JSON.stringify(announcements));
}

// Save all sections as a single object
export function saveFullAnnouncements(full: { announcements: any[]; links: string[]; ongoing: string[]; wing: string[] }) {
  localStorage.setItem('announcements_full', JSON.stringify(full));
}
