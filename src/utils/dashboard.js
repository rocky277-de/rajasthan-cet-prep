import { getQuestions } from '../data/questionLoader';
import { loadPracticeProgress } from './practiceStorage';
import { loadTestHistory } from './analyticsStorage';
import { getWeakTopics } from './revisionEngine';

export function getDashboardData(target=30){
  const questions=getQuestions(); const progress=loadPracticeProgress(); const history=loadTestHistory();
  const ids=Object.keys(progress.attempted);
  const attempts=ids.reduce((n,id)=>n+progress.attempted[id].count,0);
  const correct=ids.reduce((n,id)=>n+progress.attempted[id].correct,0);
  const accuracy=attempts?Math.round(correct/attempts*100):0;
  const completedToday=ids.filter(id=>progress.attempted[id]?.lastDate===todayKey()).reduce((n,id)=>n+1,0);
  const preparation=questions.length?Math.round(ids.length/questions.length*100):0;
  const weak=getWeakTopics().filter(x=>x.attempts>=2).slice(0,3);
  return {target,completedToday,remaining:Math.max(0,target-completedToday),attempted:ids.length,accuracy,tests:history.length,preparation,weakSubjects:weak.map(x=>x.topic),streak:calculateStreak(progress)};
}
export function todayKey(){return new Date().toISOString().slice(0,10)}
export function calculateStreak(progress){
  const dates=new Set(Object.values(progress.attempted).map(x=>x.lastDate).filter(Boolean)); let streak=0; const d=new Date();
  while(dates.has(d.toISOString().slice(0,10))){streak++;d.setDate(d.getDate()-1)}
  return streak;
}
