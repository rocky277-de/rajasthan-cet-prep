import { getQuestions } from '../data/questionLoader';
import { loadPracticeProgress } from './practiceStorage';
import { loadReviewData } from './reviewStorage';

export function buildRevisionQueue(limit=20){
  const questions=getQuestions();
  const progress=loadPracticeProgress();
  const review=loadReviewData();
  return questions.map(q=>{
    const p=progress.attempted[q.id]||{count:0,correct:0};
    const accuracy=p.count?Math.round(p.correct/p.count*100):null;
    const wrong=review.wrong.includes(q.id);
    const bookmarked=review.bookmarks.includes(q.id);
    let priority=0;
    if(wrong) priority+=100;
    if(accuracy!==null) priority+=Math.max(0,100-accuracy);
    if(bookmarked) priority+=20;
    if(p.count===0) priority+=10;
    return {...q,accuracy,attempts:p.count,priority};
  }).sort((a,b)=>b.priority-a.priority).slice(0,limit);
}

export function getWeakTopics(){
  const questions=getQuestions();
  const progress=loadPracticeProgress();
  const buckets={};
  questions.forEach(q=>{
    const p=progress.attempted[q.id];
    if(!p) return;
    const key=q.topic;
    buckets[key] ||= {topic:key,attempts:0,correct:0,questions:0};
    buckets[key].attempts+=p.count; buckets[key].correct+=p.correct; buckets[key].questions++;
  });
  return Object.values(buckets).map(x=>({...x,accuracy:x.attempts?Math.round(x.correct/x.attempts*100):0})).sort((a,b)=>a.accuracy-b.accuracy);
}
