import { load, save } from './storage';

const KEY = 'mock-test-state';

export function loadTestState() { return load(KEY, null); }
export function saveTestState(state) { save(KEY, state); }
export function clearTestState() { localStorage.removeItem('cet12_' + KEY); }
