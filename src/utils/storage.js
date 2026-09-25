const PREFIX = 'cet12_';
export function load(key, fallback) { try { const v = localStorage.getItem(PREFIX + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } }
export function save(key, value) { localStorage.setItem(PREFIX + key, JSON.stringify(value)); }