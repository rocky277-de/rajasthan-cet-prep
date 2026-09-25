export const REQUIRED_FIELDS = [
  'id','exam','year','shift','subject','topic','difficulty',
  'question','options','correctAnswer','explanation','source','language'
];

const DIFFICULTIES = new Set(['easy','medium','hard']);
const LANGUAGES = new Set(['hi','en','hinglish']);

export function validateQuestion(question, index = 0) {
  const errors = [];
  if (!question || typeof question !== 'object' || Array.isArray(question)) {
    return { valid: false, errors: ['Question must be an object.'], index };
  }

  for (const field of REQUIRED_FIELDS) {
    if (question[field] === undefined || question[field] === null || question[field] === '') {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (typeof question.id !== 'string') errors.push('id must be a string.');
  if (typeof question.exam !== 'string') errors.push('exam must be a string.');
  if (!Number.isInteger(question.year) || question.year < 2000) errors.push('year must be an integer >= 2000.');
  if (typeof question.shift !== 'string' || !question.shift.trim()) errors.push('shift must be a non-empty string.');
  if (typeof question.subject !== 'string' || !question.subject.trim()) errors.push('subject must be a non-empty string.');
  if (typeof question.topic !== 'string' || !question.topic.trim()) errors.push('topic must be a non-empty string.');
  if (!DIFFICULTIES.has(question.difficulty)) errors.push('difficulty must be easy, medium, or hard.');
  if (typeof question.question !== 'string' || !question.question.trim()) errors.push('question must be a non-empty string.');

  if (!Array.isArray(question.options) || question.options.length !== 4) {
    errors.push('options must contain exactly 4 items.');
  } else if (question.options.some(option => typeof option !== 'string' || !option.trim())) {
    errors.push('every option must be a non-empty string.');
  }

  if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer > 3) {
    errors.push('correctAnswer must be an integer from 0 to 3.');
  }

  if (typeof question.explanation !== 'string') errors.push('explanation must be a string.');
  if (typeof question.source !== 'string' || !question.source.trim()) errors.push('source must be a non-empty string.');
  if (!LANGUAGES.has(question.language)) errors.push('language must be hi, en, or hinglish.');

  return { valid: errors.length === 0, errors, index, id: question.id };
}

export function validateQuestions(questions) {
  const errors = [];
  const ids = new Map();

  if (!Array.isArray(questions)) {
    return { valid: false, errors: [{ index: -1, errors: ['Question data must be an array.'] }], validQuestions: [] };
  }

  questions.forEach((question, index) => {
    const result = validateQuestion(question, index);
    if (!result.valid) errors.push(result);
    if (question?.id) {
      const firstIndex = ids.get(question.id);
      if (firstIndex !== undefined) {
        errors.push({ index, id: question.id, errors: [`Duplicate id; first seen at index ${firstIndex}.`] });
      } else {
        ids.set(question.id, index);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    validQuestions: questions.filter((question, index) => validateQuestion(question, index).valid)
  };
}
