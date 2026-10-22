'use strict';
(()=>{
 const $=(selector,root=document)=>root.querySelector(selector);
 const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
 const flows={
  player:{code:'PL–01',title:'Plan and play a match',steps:[
   ['Open MatchPoint','Entry point','Know immediately what matters next.','A home screen prioritises the nearest fixture over secondary content.','Can players find their next match without searching?'],
   ['Next fixture','Planning','See which game I have coming up.','One next-match card with opponent, sport and status.','Can a player recognise their next match at a glance?'],
   ['View court & time','Wayfinding','Find my court and start time before leaving home.','Venue, court number, time and opponent are grouped at the top.','Do people locate court and time in under a few seconds?'],
   ['Arrive & play','In the moment','Focus on the game rather than admin.','Minimal controls, fast feedback and visible match state.','Can the interface be used courtside with minimal disruption?'],
   ['Record score','Scorekeeping','Keep an accurate record throughout the match.','Sport-specific point scoring with undo and confirmation.','Can players recover confidently from a mistaken tap?'],
   ['Follow standings','After play','Know where my team stands and when I play next.','Verified results feed a table and future fixture list.','Do players trust result status and find the next fixture?']
  ]},
  captain:{code:'TC–02',title:'Coordinate a team',steps:[
   ['Open team hub','Overview','Understand what the team needs this week.','A team-first dashboard lists outstanding tasks and next fixtures.','Does the next action stand out?'],
   ['Review schedule','Fixtures','Know which matches, courts and start times are booked.','A single schedule groups matches by date and venue.','Can a captain spot an overlap or time change?'],
   ['Check players','Availability','Know who can attend a scheduled match.','An availability step makes readiness visible before play.','What level of coordination is needed by different clubs?'],
   ['Confirm line-up','Preparation','Make player assignments clear.','A simple, reviewable team list linked to each fixture.','Does the flow work for doubles as well as singles?'],
   ['Submit result','After match','Record what happened without duplicate messages.','A result submission flow with review and confirmation.','Can captains spot and correct score errors?'],
   ['See league table','Outcome','Track progress and the next scheduled game.','Fixtures, results and rankings remain connected.','Does the table reflect the league rules people expect?']
  ]},
  organiser:{code:'LO–03',title:'Run a league',steps:[
   ['Create season','Setup','Set up teams and format without repeating admin.','A guided league configuration and settings review.','Which league formats require custom rules?'],
   ['Register teams','Participants','Know who is taking part.','Team and participant records use consistent data fields.','What minimum information is required?'],
   ['Assign courts','Scheduling','Allocate court, venue and time without clashes.','A schedule with conflict cues and clear publishing state.','Can organisers see competing court bookings?'],
   ['Publish fixtures','Communication','Tell everyone where and when they need to play.','One publish action updates the player and captain views.','How should late changes be communicated?'],
   ['Review results','Governance','Verify scores before standings change.','A simple review queue separates submitted from verified.','Who has authority to approve or dispute a score?'],
   ['Update standings','Transparency','Keep rankings and future games current.','Confirmed results recalculate the league view.','Do ties and points rules match the league agreement?']
  ]}
 };
 const flow=$('#mp-flow-explorer');
 if(flow){
  let persona='player',step=0;
  const nodes=$('#mp-flow-nodes');
  const draw=()=>{
   const data=flows[persona];
   $('#mp-flow-code').textContent=data.code;
   $('#mp-flow-title').textContent=data.title;
   nodes.replaceChildren();
   data.steps.forEach((item,i)=>{
    if(i){const arrow=document.createElement('span');arrow.className='mp-flow-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';nodes.append(arrow)}
    const button=document.createElement('button');button.type='button';button.className='mp-flow-node'+(i===step?' is-selected':'');button.dataset.mpStep=String(i);button.setAttribute('aria-pressed',String(i===step));
    const idx=document.createElement('span');idx.className='mp-step-index';idx.textContent=String(i+1).padStart(2,'0');
    const title=document.createElement('strong');title.textContent=item[0];
    const desc=document.createElement('small');desc.textContent=item[1];
    button.append(idx,title,desc);button.addEventListener('click',()=>{step=i;draw()});nodes.append(button)
   });
   const selected=data.steps[step];
   $('#mp-flow-stage').textContent='STEP '+String(step+1).padStart(2,'0')+' / '+selected[1].toUpperCase();
   $('#mp-flow-detail-title').textContent=selected[0];
   $('#mp-flow-need').textContent=selected[2];
   $('#mp-flow-response').textContent=selected[3];
   $('#mp-flow-test').textContent=selected[4];
   $$('[data-mp-flow]',flow).forEach(b=>{const active=b.dataset.mpFlow===persona;b.classList.toggle('is-active',active);b.setAttribute('aria-selected',String(active))});
  };
  $$('[data-mp-flow]',flow).forEach(b=>b.addEventListener('click',()=>{persona=b.dataset.mpFlow;step=0;draw()}));
  draw();
 }
 const app=$('#mp-league-app');
 if(app){
  const views={next:{title:'Your next match',objective:'Remove ambiguity before play begins.'},schedule:{title:'Fixtures & courts',objective:'Make court allocations and changes easy to find.'},standings:{title:'League standings',objective:'Keep team rankings transparent and current.'}};
  const switchView=(view)=>{
   if(!views[view])return;
   $$('[data-mp-view]',app).forEach(button=>{let active=button.dataset.mpView===view;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active))});
   Object.keys(views).forEach(key=>{const panel=$('#mp-app-'+key);panel.hidden=key!==view;panel.classList.toggle('active',key===view)});
   $('#mp-app-view-title').textContent=views[view].title;
   $('#mp-app-objective').textContent=views[view].objective;
   $$('.mp-app-progress span',app).forEach((s,i)=>s.classList.toggle('active',i===Object.keys(views).indexOf(view)));
  };
  $$('[data-mp-view]',app).forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.mpView)));
  $$('[data-mp-go]',app).forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.mpGo)));
  $('#mp-fixture-filter')?.addEventListener('change',(event)=>{
   const selected=event.target.value;
   const names=['Northside','Riverside','Willow','Eastfield'];
   $$('.mp-fixture',app).forEach(row=>{const match=row.querySelector('strong')?.textContent||'';row.hidden=selected!=='all'&&!match.includes(selected)});
  });
  switchView('next');
 }
})();
