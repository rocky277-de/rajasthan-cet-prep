import fs from 'node:fs';
import { validateQuestions } from '../src/utils/questionValidation.js';

const file = new URL('../src/data/questions.json', import.meta.url);
let questions;

try {
  questions = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  console.error('Question JSON could not be parsed:', error.message);
  process.exit(1);
}

const result = validateQuestions(questions);

if (!result.valid) {
  console.error(`Question validation failed: ${result.errors.length} issue(s).`);
  for (const item of result.errors) {
    console.error(`- index ${item.index}${item.id ? ` (${item.id})` : ''}: ${item.errors.join(' ')}`);
  }
  process.exit(1);
}

console.log(`Question validation passed: ${questions.length} question(s).`);
