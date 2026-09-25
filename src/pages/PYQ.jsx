import { useMemo, useState } from 'react';
import { getQuestions, getSubjects, getTopics, getDifficulties, getYears, getShifts } from '../data/questionLoader';
import { loadPracticeProgress, savePracticeProgress, recordAnswer } from '../utils/practiceStorage';

export default function PYQ() {
  const [year, setYear] = useState('');
  const [shift, setShift] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [mode, setMode] = useState('');
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(loadPracticeProgress());

  const filtered = useMemo(() => getQuestions({year, shift, subject, topic, difficulty}), [year, shift, subject, topic, difficulty]);
  const topics = useMemo(() => getTopics(subject), [subject]);
  const activeQuestions = useMemo(() => {
    if (mode === 'topic') return filtered;
    if (mode === 'subject') return filtered;
    if (mode === 'random') return [...filtered].sort(() => Math.random() - 0.5).slice(0, Math.min(20, filtered.length));
    return filtered;
  }, [filtered, mode]);
  const current = activeQuestions[index];

  function start(nextMode) {
    if (!filtered.length) return;
    setMode(nextMode); setIndex(0); setSelected(null); setStarted(true);
  }
  function answer(i) {
    if (selected !== null || !current) return;
    const next = recordAnswer(progress, current.id, i, i === current.correctAnswer);
    setProgress(next); savePracticeProgress(next); setSelected(i);
  }
  function next() {
    if (index < activeQuestions.length - 1) { setIndex(v => v + 1); setSelected(null); }
    else setStarted(false);
  }

  if (started && current) {
    const correct = selected === current.correctAnswer;
    return <><div className="practice-top"><button className="btn secondary" onClick={() => setStarted(false)}>← PYQ Filters</button><span className="badge">{index+1} / {activeQuestions.length}</span></div>
      <article className="question-card card"><div className="question-meta"><span>{current.year}</span><span>{current.shift}</span><span>{current.subject}</span><span>{current.topic}</span></div><h2>{current.question}</h2>
        <div className="options">{current.options.map((option,i)=>{const state=selected===null?'':i===current.correctAnswer?' correct':selected===i?' wrong':'';return <button key={option} className={`option${state}`} onClick={()=>answer(i)} disabled={selected!==null}><span>{String.fromCharCode(65+i)}</span>{option}</button>})}</div>
        {selected!==null&&<div className={correct?'feedback correct-feedback':'feedback wrong-feedback'}><strong>{correct?'Correct!':'Not quite.'}</strong><p>{current.explanation}</p></div>}
        {selected!==null&&<button className="btn primary next-btn" onClick={next}>{index===activeQuestions.length-1?'Finish PYQ':'Next Question →'}</button>}
      </article></>;
  }

  return <><div className="page-title"><span className="eyebrow">Previous Year Questions</span><h1>PYQ Practice</h1><p className="muted">Filter real question data by year, shift, subject, topic and difficulty.</p></div>
    <div className="filters card">
      <select value={year} onChange={e=>setYear(e.target.value)}><option value="">All Years</option>{getYears().map(y=><option key={y} value={y}>{y}</option>)}</select>
      <select value={shift} onChange={e=>setShift(e.target.value)}><option value="">All Shifts</option>{getShifts().map(s=><option key={s}>{s}</option>)}</select>
      <select value={subject} onChange={e=>{setSubject(e.target.value);setTopic('')}}><option value="">All Subjects</option>{getSubjects().map(s=><option key={s}>{s}</option>)}</select>
      <select value={topic} disabled={!subject} onChange={e=>setTopic(e.target.value)}><option value="">All Topics</option>{topics.map(t=><option key={t}>{t}</option>)}</select>
      <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option value="">All Difficulty</option>{getDifficulties().map(d=><option key={d}>{d}</option>)}</select>
    </div>
    <div className="pyq-summary card"><strong>{filtered.length}</strong><span>matching questions</span></div>
    <div className="mode-grid">
      {[['full','Full PYQ Paper','Complete filtered paper'],['subject','Subject-wise PYQ','Practice selected subject'],['topic','Topic-wise PYQ','Target selected topic'],['random','Random PYQ','Mixed set from filters']].map(([id,title,desc])=>
        <button key={id} className="card mode" onClick={()=>start(id)} disabled={!filtered.length}><strong>{title}</strong><span>{desc}</span></button>)}
    </div>
    {!filtered.length&&<div className="card empty"><h3>No PYQs available</h3><p className="muted">Add legally usable PYQ data to the validated question database.</p></div>}
  </>;
}
