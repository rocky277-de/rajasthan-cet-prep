import {NavLink, Outlet} from 'react-router-dom';
import {examConfig} from '../config/examConfig';
import '../styles/app.css';

const nav = [
  ['/', '⌂', 'Home'], ['/', '▣', 'Practice'], ['/pyq', '◫', 'PYQ'], ['/tests', '⏱', 'Tests'], ['/profile', '●', 'Profile']
];
export default function AppShell(){
  return <div className="app-shell">
    <header className="topbar"><div><div className="brand">CET Prep</div><div className="subbrand">{examConfig.title} · {examConfig.level}</div></div><button className="icon-btn" aria-label="Toggle theme">☾</button></header>
    <main className="page"><Outlet/></main>
    <nav className="bottom-nav" aria-label="Primary navigation">{nav.map(([to,icon,label])=><NavLink key={label} to={to} className={({isActive})=>isActive?'nav-item active':'nav-item'}><span>{icon}</span><small>{label}</small></NavLink>)}</nav>
  </div>
}