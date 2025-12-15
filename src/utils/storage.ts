export function getAnnouncements() {
  try {
    return JSON.parse(localStorage.getItem('announcements') || '[]');
  } catch {
    return [];
  }
}
export function saveAnnouncements(announcements: any[]) {
  localStorage.setItem('announcements', JSON.stringify(announcements));
}
