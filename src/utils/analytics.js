export function calculateTestResult(state) {
  const total = state.questions.length;
  const attempted = Object.keys(state.answers).length;
  const correct = state.questions.reduce((n,q,i)=>n+(state.answers[i]===q.correctAnswer?1:0),0);
  const wrong = attempted - correct;
  const unanswered = total - attempted;
  const accuracy = attempted ? Math.round(correct / attempted * 100) : 0;
  const timeUsedSeconds = Math.max(0, (state.durationSeconds || 0) - (state.remainingSeconds || 0));
  const bySubject = {};
  const byTopic = {};
  state.questions.forEach((q,i)=>{
    const answered = state.answers[i] !== undefined;
    const isCorrect = answered && state.answers[i] === q.correctAnswer;
    for (const [bucket,key] of [[bySubject,q.subject],[byTopic,q.topic]]) {
      bucket[key] ||= {total:0,attempted:0,correct:0,wrong:0,accuracy:0};
      bucket[key].total++;
      if (answered) { bucket[key].attempted++; if (isCorrect) bucket[key].correct++; else bucket[key].wrong++; }
      bucket[key].accuracy = bucket[key].attempted ? Math.round(bucket[key].correct/bucket[key].attempted*100) : 0;
    }
  });
  return { total, attempted, correct, wrong, unanswered, accuracy, timeUsedSeconds, bySubject, byTopic };
}

export function formatDuration(seconds) {
  const mins = Math.floor(seconds/60);
  const secs = seconds%60;
  return mins ? `${mins}m ${secs}s` : `${secs}s`;
}
