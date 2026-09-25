import { load, save } from './storage';
const KEY = 'practice-progress';
const emptyProgress = {attempted:{},answers:{},lastSession:null};
export function loadPracticeProgress(){return load(KEY,emptyProgress)}
export function savePracticeProgress(progress){save(KEY,progress)}
export function recordAnswer(progress,questionId,answer,isCorrect){
  const date=new Date().toISOString().slice(0,10);
  return {...progress,attempted:{...progress.attempted,[questionId]:{count:(progress.attempted[questionId]?.count||0)+1,correct:(progress.attempted[questionId]?.correct||0)+(isCorrect?1:0),lastDate:date}},answers:{...progress.answers,[questionId]:answer}};
}
export function getStats(progress,questionIds){const attemptedIds=questionIds.filter(id=>progress.attempted[id]);const attempts=attemptedIds.reduce((sum,id)=>sum+progress.attempted[id].count,0);const correct=attemptedIds.reduce((sum,id)=>sum+progress.attempted[id].correct,0);return{attempted:attemptedIds.length,attempts,correct,accuracy:attempts?Math.round(correct/attempts*100):0}}
