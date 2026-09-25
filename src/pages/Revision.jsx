import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { buildRevisionQueue, getWeakTopics } from '../utils/revisionEngine';

export default function Revision(){
  const queue=useMemo(()=>buildRevisionQueue(30),[]);
  const weak=useMemo(()=>getWeakTopics().slice(0,8),[]);
  return <><div className="page-title"><span className="eyebrow">Smart Revision</span><h1>Revision Engine</h1><p className="muted">Your revision queue prioritizes mistakes, low accuracy and saved questions.</p></div>
    <div className="stats-grid"><div className="card stat-card"><div className="muted">Revision queue</div><strong>{queue.length}</strong></div><div className="card stat-card"><div className="muted">Weak topics</div><strong>{weak.length}</strong></div></div>
    <div className="revision-actions"><Link className="btn primary" to="/practice">Quick Practice</Link><Link className="btn secondary" to="/review">Review Saved</Link></div>
    <h2>Weak Topics</h2>{weak.length?<div className="analytics-list">{weak.map(x=><div className="card analytics-row" key={x.topic}><strong>{x.topic}</strong><span>{x.attempts} attempts</span><b>{x.accuracy}%</b></div>)}</div>:<div className="card empty"><h3>Not enough data yet</h3><p className="muted">Practice questions to build topic-level accuracy.</p></div>}
    <h2>Priority Revision</h2><div className="revision-list">{queue.map(q=><article className="card revision-card" key={q.id}><div className="question-meta"><span>{q.subject}</span><span>{q.topic}</span>{q.accuracy!==null&&<span>{q.accuracy}% accuracy</span>}</div><h3>{q.question}</h3><p className="muted">{q.attempts ? (q.attempts+' attempts') : 'Not attempted'} · {q.priority>=100?'Needs revision':q.priority>=50?'Review soon':'Fresh practice'}</p></article>)}</div>
  </>;
}
