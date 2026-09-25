import { validateQuestions } from './questionValidation';

export function parseQuestionImport(raw){
  const parsed=typeof raw==='string'?JSON.parse(raw):raw;
  const questions=Array.isArray(parsed)?parsed:parsed?.questions;
  if(!Array.isArray(questions)) throw new Error('Import must be a question array or an object with a questions array.');
  const result=validateQuestions(questions);
  return {questions, ...result};
}

export function exportQuestionBundle(questions){
  return JSON.stringify({version:1,updatedAt:new Date().toISOString(),questions},null,2);
}
