import { loadTestHistory } from '../utils/analyticsStorage';
import { formatDuration } from '../utils/analytics';

export default function Analytics(){
  const history=loadTestHistory();
  const totalTests=history.length;
  const avgAccuracy=totalTests?Math.round(history.reduce((n,x)=>n+x.accuracy,0)/totalTests):0;
  const totalAttempted=history.reduce((n,x)=>n+x.attempted,0);
  return <><div className="page-title"><span className="eyebrow">Performance</span><h1>Analytics</h1><p className="muted">Your saved mock-test performance on this device.</p></div>
    <div className="stats-grid"><div className="card stat-card"><div className="muted">Tests</div><strong>{totalTests}</strong></div><div className="card stat-card"><div className="muted">Avg accuracy</div><strong>{avgAccuracy}%</strong></div><div className="card stat-card"><div className="muted">Questions attempted</div><strong>{totalAttempted}</strong></div></div>
    <h2>Recent Tests</h2>{history.length?<div className="analytics-list">{history.map((x,i)=><div className="card analytics-row" key={x.completedAt||i}><div><strong>{x.subject}</strong><small>{new Date(x.completedAt).toLocaleString()}</small></div><span>{x.correct}/{x.total}</span><b>{x.accuracy}%</b><em>{formatDuration(x.timeUsedSeconds)}</em></div>)}</div>:<div className="card empty"><h3>No test history yet</h3><p className="muted">Complete a mock test to build your analytics.</p></div>}
  </>;
}
