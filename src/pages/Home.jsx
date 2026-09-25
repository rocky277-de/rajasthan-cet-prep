import {Link} from 'react-router-dom';
import StatCard from '../components/StatCard'; import Section from '../components/Section';
import { getDashboardData } from '../utils/dashboard';
export default function Home(){
 const d=getDashboardData();
 return <><section className="hero"><div><span className="eyebrow">12th Level · Smart Practice</span><h1>Rajasthan CET 2026 Preparation</h1><p>Practice, PYQs aur mock tests — ek hi focused platform par.</p><div className="hero-actions"><Link className="btn primary" to="/practice">Start Practice</Link><Link className="btn ghost" to="/tests">Take Mock Test</Link><Link className="text-btn" to="/pyq">Practice PYQs →</Link></div></div></section>
 <Section title="Today's Target"><div className="target card"><div><strong>{d.completedToday} / {d.target}</strong><p className="muted">Questions completed today</p></div><div className="progress"><span style={{width:(Math.min(100,d.completedToday/d.target*100)+'%')}}/></div><span className="badge">{d.remaining} left</span></div></Section>
 <Section title="Your Progress"><div className="stats-grid"><StatCard label="Preparation" value={d.preparation+'%'}/><StatCard label="Attempted" value={d.attempted}/><StatCard label="Accuracy" value={d.attempted?d.accuracy+'%':'—'}/><StatCard label="Tests" value={d.tests}/><StatCard label="Streak" value={d.streak+' days'}/><StatCard label="Weak topics" value={d.weakSubjects.length?d.weakSubjects[0]:'—'}/></div></Section>
 <Section title="Continue Practice"><div className="card continue"><div><strong>Smart Revision</strong><p className="muted">{d.weakSubjects.length?'Focus: '+d.weakSubjects.join(', '):'Build practice data to unlock weak-topic guidance.'}</p></div><Link className="btn primary" to="/revision">Revise</Link></div></Section>
 <Section title="Quick Practice"><div className="quick-grid">{[10,20,30,50].map(n=><Link key={n} to={'/practice?count='+n} className="quick card"><strong>{n}</strong><span>Questions</span></Link>)}</div></Section>
 </>}
