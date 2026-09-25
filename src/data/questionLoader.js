import questions from './questions.json';
import { validateQuestions } from '../utils/questionValidation';

const validation = validateQuestions(questions);
export const questionValidation = validation;

export function getQuestions(filters = {}) {
  return validation.validQuestions.filter((q) => {
    if (filters.subject && q.subject !== filters.subject) return false;
    if (filters.topic && q.topic !== filters.topic) return false;
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
    if (filters.year && String(q.year) !== String(filters.year)) return false;
    if (filters.shift && q.shift !== filters.shift) return false;
    return true;
  });
}
export function getSubjects(list = validation.validQuestions) { return [...new Set(list.map(q => q.subject))].sort(); }
export function getTopics(subject, list = validation.validQuestions) { return [...new Set(list.filter(q => !subject || q.subject === subject).map(q => q.topic))].sort(); }
export function getDifficulties(list = validation.validQuestions) { return [...new Set(list.map(q => q.difficulty))].sort(); }
export function getYears(list = validation.validQuestions) { return [...new Set(list.map(q => q.year))].sort((a,b) => b-a); }
export function getShifts(list = validation.validQuestions) { return [...new Set(list.map(q => q.shift))].sort(); }
