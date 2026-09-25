import { useMemo, useState } from 'react';
import { getQuestions } from '../data/questionLoader';
import { loadReviewData, toggleBookmark, saveNote, removeWrong } from '../utils/reviewStorage';

export default function Review(){
  const [data,setData]=useState(loadReviewData()); const [tab,setTab]=useState('bookmarks'); const [noteId,setNoteId]=useState(null);
  const questions=useMemo(()=>getQuestions(),[]);
  const ids=tab==='bookmarks'?data.bookmarks:tab==='wrong'?data.wrong:Object.keys(data.notes);
  const items=ids.map(id=>questions.find(q=>q.id===id)).filter(Boolean);
  function remove(id){setData(tab==='wrong'?removeWrong(id):toggleBookmark(id))}
  function note(id){setData(saveNote(id,data.notes[id]||''))}
  return <><div className="page-title"><span className="eyebrow">Review</span><h1>Saved Questions</h1><p className="muted">Keep important questions, mistakes and personal notes together.</p></div><div className="review-tabs"><button className={tab==='bookmarks'?'active':''} onClick={()=>setTab('bookmarks')}>Bookmarks ({data.bookmarks.length})</button><button className={tab==='wrong'?'active':''} onClick={()=>setTab('wrong')}>Wrong ({data.wrong.length})</button><button className={tab==='notes'?'active':''} onClick={()=>setTab('notes')}>Notes ({Object.keys(data.notes).length})</button></div><div className="review-list">{items.map(q=><article className="card review-card" key={q.id}><div className="question-meta"><span>{q.subject}</span><span>{q.topic}</span><span>{q.difficulty}</span></div><h3>{q.question}</h3>{tab==='notes'&&<textarea value={data.notes[q.id]||''} onChange={e=>setData(d=>({...d,notes:{...d.notes,[q.id]:e.target.value}}))} onBlur={()=>note(q.id)} placeholder="Your note..."/>}{tab!=='notes'&&<p className="muted">{tab==='wrong'?'Marked wrong during practice.':'Bookmarked for revision.'}</p>}<button className="btn secondary" onClick={()=>remove(q.id)}>{tab==='wrong'?'Remove from wrong':tab==='bookmarks'?'Remove bookmark':'Save note'}</button></article>)}{!items.length&&<div className="card empty"><h3>Nothing saved yet</h3><p className="muted">Bookmark questions, make notes, or answer incorrectly during practice.</p></div>}</div></>;
}
