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
    return true;
  });
}

export function getSubjects(questionsList = validation.validQuestions) {
  return [...new Set(questionsList.map((q) => q.subject))].sort();
}

export function getTopics(subject, questionsList = validation.validQuestions) {
  return [...new Set(
    questionsList.filter((q) => !subject || q.subject === subject).map((q) => q.topic)
  )].sort();
}

export function getDifficulties(questionsList = validation.validQuestions) {
  return [...new Set(questionsList.map((q) => q.difficulty))].sort();
}
