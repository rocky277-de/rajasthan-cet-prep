import { useEffect, useMemo, useState } from 'react';
import { getQuestions, getSubjects } from '../data/questionLoader';
import { examConfig } from '../config/examConfig';
import { loadTestState, saveTestState, clearTestState } from '../utils/testStorage';

const makeState = (questions, duration) => ({
  status:'config', questions, current:0, answers:{}, marked:{}, startedAt:null,
  remainingSeconds: duration * 60, durationSeconds: duration * 60
});

export default function MockTest() {
  const [subject, setSubject] = useState('');
  const [count, setCount] = useState(10);
  const [duration, setDuration] = useState(15);
  const [state, setState] = useState(() => loadTestState());
  const questions = useMemo(() => getQuestions({ subject }).slice(0, Number(count)), [subject,count]);

  useEffect(() => {
    if (!state || state.status !== 'running') return;
    const id = setInterval(() => {
      setState(prev => {
        if (!prev || prev.status !== 'running') return prev;
        if (prev.remainingSeconds <= 1) return {...prev,status:'submitted',remainingSeconds:0};
        return {...prev,remainingSeconds:prev.remainingSeconds-1};
      });
    },1000);
    return () => clearInterval(id);
  }, [state?.status]);

  useEffect(() => { if (state) saveTestState(state); }, [state]);

  function start() {
    if (!questions.length) return;
    setState({...makeState(questions, Number(duration)),status:'running',startedAt:Date.now()});
  }
  function answer(i) {
    setState(prev => ({...prev,answers:{...prev.answers,[prev.current]:i}}));
  }
  function toggleMark() {
    setState(prev => ({...prev,marked:{...prev.marked,[prev.current]:!prev.marked[prev.current]}}));
  }
  function submit() { setState(prev => ({...prev,status:'submitted'})); }
  function restart() { clearTestState(); setState(null); }

  if (state?.status === 'running') {
    const q = state.questions[state.current];
    const answered = Object.keys(state.answers).length;
    const marked = Object.values(state.marked).filter(Boolean).length;
    const mins = Math.floor(state.remainingSeconds/60).toString().padStart(2,'0');
    const secs = (state.remainingSeconds%60).toString().padStart(2,'0');
    return <div className="mock-wrap">
      <div className="mock-header"><button className="btn secondary" onClick={submit}>Submit</button><strong>{mins}:{secs}</strong><span>{answered}/{state.questions.length} answered</span></div>
      <div className="mock-body">
        <div className="palette card">{state.questions.map((item,i)=><button key={item.id} className={`palette-btn ${state.current===i?'current ':''}${state.answers[i]!==undefined?'answered ':''}${state.marked[i]?'marked':''}`} onClick={()=>setState(s=>({...s,current:i}))}>{i+1}</button>)}</div>
        <article className="question-card card"><div className="question-meta"><span>Q {state.current+1}</span><span>{q.subject}</span><span>{q.difficulty}</span></div><h2>{q.question}</h2>
          <div className="options">{q.options.map((option,i)=><button key={option} className={`option${state.answers[state.current]===i?' selected':''}`} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>
          <div className="mock-actions"><button className="btn secondary" onClick={()=>setState(s=>({...s,current:Math.max(0,s.current-1)}))} disabled={state.current===0}>← Previous</button><button className={state.marked[state.current]?'btn primary':'btn secondary'} onClick={toggleMark}>{state.marked[state.current]?'Marked':'Mark for review'}</button><button className="btn primary" onClick={()=>setState(s=>({...s,current:Math.min(s.questions.length-1,s.current+1)}))}>{state.current===state.questions.length-1?'Last':'Next →'}</button></div>
          <div className="mock-legend"><span>Answered: {answered}</span><span>Review: {marked}</span></div>
        </article>
      </div>
    </div>;
  }

  if (state?.status === 'submitted') {
    const total = state.questions.length;
    const attempted = Object.keys(state.answers).length;
    const correct = state.questions.reduce((n,q,i)=>n+(state.answers[i]===q.correctAnswer?1:0),0);
    return <div className="page-title"><span className="eyebrow">Test Submitted</span><h1>Mock Test Complete</h1><div className="stats-grid"><div className="card stat-card"><div className="muted">Score</div><strong>{correct}/{total}</strong></div><div className="card stat-card"><div className="muted">Attempted</div><strong>{attempted}</strong></div><div className="card stat-card"><div className="muted">Accuracy</div><strong>{attempted?Math.round(correct/attempted*100):0}%</strong></div></div><button className="btn primary" onClick={restart}>Start New Test</button></div>;
  }

  return <><div className="page-title"><span className="eyebrow">CBT Mock Test</span><h1>Configure Test</h1><p className="muted">Timer, palette, review marking and local state restore are enabled.</p></div>
    <div className="card practice-filters">
      <label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}><option value="">All subjects</option>{getSubjects().map(s=><option key={s}>{s}</option>)}</select></label>
      <label>Questions<select value={count} onChange={e=>setCount(e.target.value)}>{[10,20,30,50].map(n=><option key={n} value={n}>{n}</option>)}</select></label>
      <label>Time<select value={duration} onChange={e=>setDuration(e.target.value)}>{[10,15,30,45,60].map(n=><option key={n} value={n}>{n} minutes</option>)}</select></label>
      <button className="btn primary start-btn" onClick={start} disabled={!questions.length}>Start CBT ({questions.length})</button>
    </div>
    {!questions.length&&<div className="card empty"><h3>No questions available</h3><p className="muted">Add valid question data before starting a mock.</p></div>}
  </>;
}
