import { load, save } from './storage';

const KEY = 'question-review';

const empty = { bookmarks: [], notes: {}, wrong: [] };

export function loadReviewData() { return load(KEY, empty); }
export function toggleBookmark(id) {
  const data = loadReviewData();
  const bookmarks = data.bookmarks.includes(id) ? data.bookmarks.filter(x => x !== id) : [...data.bookmarks, id];
  const next = { ...data, bookmarks };
  save(KEY, next); return next;
}
export function saveNote(id, note) {
  const data = loadReviewData();
  const notes = { ...data.notes };
  if (note.trim()) notes[id] = note; else delete notes[id];
  const next = { ...data, notes }; save(KEY, next); return next;
}
export function addWrong(id) {
  const data = loadReviewData();
  const next = data.wrong.includes(id) ? data : { ...data, wrong: [...data.wrong, id] };
  save(KEY, next); return next;
}
export function removeWrong(id) {
  const data = loadReviewData();
  const next = { ...data, wrong: data.wrong.filter(x => x !== id) };
  save(KEY, next); return next;
}
