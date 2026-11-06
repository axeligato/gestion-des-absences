import React from "react";
import {ClipboardCheck,FileCheck2,Users,CalendarDays,BriefcaseBusiness,FolderOpen,ArrowRight,Clock3,CheckCircle2} from "lucide-react";
const shortcuts=[["Collaborateurs","people",Users],["Calendrier des équipes","team-calendar",CalendarDays],["Recrutement","recruitment",BriefcaseBusiness],["Dossiers RH","hrcases",FolderOpen]];
export default function HRDashboard({items,documents,activity,people,onNavigate,onOpenRequest}){
 const pending=items.filter(x=>x.status==="En attente");
 const toReview=documents.filter(d=>d.status==="En vérification");
 const corrections=documents.filter(d=>d.status==="À corriger");
 const recent=activity.slice(0,5);
 return <section className="hr-dashboard" aria-label="Tableau de bord RH">
 <div className="hr-dashboard-intro"><div><p className="eyebrow">VUE D'ENSEMBLE</p><h2>Tableau de bord RH</h2><p>Retrouvez les actions prioritaires et les activités de votre espace RH.</p></div></div>
 <div className="hr-kpis">
 <button onClick={()=>onNavigate("people")}><span>Collaborateurs</span><strong>{people.length}</strong><small>Consulter l'annuaire <ArrowRight size={14}/></small></button>
 <button onClick={()=>onNavigate("requests")}><span>Demandes à traiter</span><strong>{pending.length}</strong><small>Consulter les demandes <ArrowRight size={14}/></small></button>
 <button onClick={()=>onNavigate("documents")}><span>Documents à vérifier</span><strong>{toReview.length}</strong><small>Vérifier les pièces <ArrowRight size={14}/></small></button>
 <button onClick={()=>onNavigate("recruitment")}><span>Recrutement</span><strong><BriefcaseBusiness size={25}/></strong><small>Consulter le suivi <ArrowRight size={14}/></small></button>
 </div>
 <div className="hr-dashboard-columns">
 <section className="panel hr-dashboard-block"><div className="hr-block-title"><h3>À traiter</h3><span className="badge pending">{pending.length+toReview.length+corrections.length}</span></div>
 <button className="hr-action-row" onClick={()=>onNavigate("requests")}><ClipboardCheck size={19}/><span>Demandes d'absence en attente</span><strong>{pending.length}</strong><ArrowRight size={16}/></button>
 <button className="hr-action-row" onClick={()=>onNavigate("documents")}><FileCheck2 size={19}/><span>Documents à vérifier</span><strong>{toReview.length}</strong><ArrowRight size={16}/></button>
 <button className="hr-action-row" onClick={()=>onNavigate("documents")}><Clock3 size={19}/><span>Documents à corriger</span><strong>{corrections.length}</strong><ArrowRight size={16}/></button>
 </section>
 <section className="panel hr-dashboard-block"><div className="hr-block-title"><h3>Accès rapides</h3></div><div className="hr-shortcuts">{shortcuts.map(([label,tab,Icon])=><button key={tab} onClick={()=>onNavigate(tab)}><Icon size={19}/><span>{label}</span><ArrowRight size={16}/></button>)}</div></section>
 </div>
 <section className="panel hr-dashboard-block"><div className="hr-block-title"><h3>Activité récente</h3><button className="hr-text-action" onClick={()=>onNavigate("activity")}>Tout voir <ArrowRight size={15}/></button></div>{recent.length===0?<p className="hint">Aucune activité récente. Les nouvelles demandes et décisions apparaîtront ici.</p>:recent.map(e=><div className="hr-activity-row" key={e.id}><CheckCircle2 size={18}/><div><strong>{e.title}</strong><small>{e.actorName} · {new Date(e.at).toLocaleString("fr-FR")}</small><p>{e.message}</p></div>{e.requestId&&<button onClick={()=>onOpenRequest(e.requestId)}>Voir la demande</button>}</div>)}</section>
 </section>
}
