import { useState } from 'react';
import { parseQuestionImport } from '../utils/contentImport';

export default function ContentImport(){
 const [raw,setRaw]=useState(''); const [result,setResult]=useState(null);
 function validate(){try{setResult(parseQuestionImport(raw))}catch(e){setResult({valid:false,errors:[{index:0,errors:[e.message]}]})}}
 return <><div className="page-title"><span className="eyebrow">Content Tools</span><h1>Question Import Validator</h1><p className="muted">Paste JSON to validate before adding it to the question database.</p></div><div className="card import-card"><textarea value={raw} onChange={e=>setRaw(e.target.value)} placeholder={'Paste question JSON here...'} aria-label="Question JSON"/><button className="btn primary" onClick={validate}>Validate JSON</button></div>{result&&<div className={result.valid?'card validation-success':'card validation-error'}><strong>{result.valid?'✓ Valid content':'⚠ Validation failed'}</strong>{result.valid?<p>{result.questions.length} question(s) passed validation.</p>:<ul>{result.errors.map((x,i)=><li key={i}>Index {x.index}: {x.errors.join(' ')}</li>)}</ul>}</div>}</>;
}
