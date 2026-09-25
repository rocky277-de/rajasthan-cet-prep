import { load, save } from './storage';
const KEY = 'test-history';
export function loadTestHistory(){ return load(KEY, []); }
export function saveTestResult(result){ const history=loadTestHistory(); const next=[result,...history].slice(0,50); save(KEY,next); return next; }
