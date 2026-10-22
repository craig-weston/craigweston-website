'use strict';
(function(){
 const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
 const nav=$('#nav-links'),toggle=$('#menu-toggle');
 if(toggle)toggle.addEventListener('click',()=>{let open=!nav.classList.contains('open');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');toggle.textContent=open?'×':'☰'});
 $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open navigation menu')}));
 const modal=$('#purchase-modal');
 let beforeModal=null;
 function closeModal(){if(!modal||!modal.classList.contains('open'))return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';beforeModal?.focus?.();beforeModal=null}
 function openModal(book,amazon){if(!modal)return;beforeModal=document.activeElement; $('#purchase-title').textContent='Make '+book+' yours.';const a=$('#modal-amazon');if(amazon){a.hidden=false;a.href=amazon}else{a.hidden=true}const direct=$('#modal-direct');direct.href='mailto:craig.weston1@gmail.com?subject='+encodeURIComponent('Direct book order enquiry: '+book);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('[data-close-modal]',modal)?.focus()}
 $$('[data-buy]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.buy,b.dataset.amazon)));
 $$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModal));
 modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeModal();if(nav?.classList.contains('open')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open navigation menu');toggle?.focus()}}
  if(e.key==='Tab'&&modal?.classList.contains('open')){const focusables=$$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',modal).filter(el=>!el.hidden&&getComputedStyle(el).display!=='none');if(focusables.length){const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}
 });
 const cards=$$('.catalog-card'),filterButtons=$$('.filter');
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  const cat=btn.dataset.filter;let count=0;
  filterButtons.forEach(b=>{const on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
  cards.forEach(c=>{const visible=cat==='All'||c.dataset.category===cat;c.classList.toggle('hidden',!visible);if(visible)count++});
  $('#book-count').textContent='Showing '+count+' '+(count===1?'volume':'volumes');
 }));
 // Sports scoring prototype: singles rules. State is local to the browser, no accounts.
 const sport=$('#sport-select');
 if(sport){
  let state,history=[];
  const fresh=()=>({gamePoints:[0,0],games:[0,0],sets:[0,0],tie:false,finished:false,notice:'READY TO PLAY'});
  const reset=()=>{state=fresh();history=[];render()};
  function addPoint(winner){if(state.finished)return;history.push(JSON.parse(JSON.stringify(state)));const loser=1-winner;
   if(sport.value==='badminton'){
    state.gamePoints[winner]++;
    const a=state.gamePoints[winner],b=state.gamePoints[loser];
    if((a>=21&&a-b>=2)||a===30){state.sets[winner]++;state.gamePoints=[0,0];state.notice='GAME TO '+(winner===0?'CRAIG':'OPPONENT');if(state.sets[winner]===2){state.finished=true;state.notice='MATCH COMPLETE'}}else{state.notice='RALLY POINT RECORDED'}
   }else{
    if(state.tie){state.gamePoints[winner]++;const a=state.gamePoints[winner],b=state.gamePoints[loser];if(a>=7&&a-b>=2){winGame(winner,true)}else{state.notice='TIE-BREAK IN PLAY'}
    }else{
     state.gamePoints[winner]++;
     const a=state.gamePoints[winner],b=state.gamePoints[loser];
     if(a>=4&&a-b>=2){winGame(winner,false)}else if(a>=3&&b>=3&&Math.abs(a-b)===0){state.notice='DEUCE'}else if(a>=4||b>=4){state.notice='ADVANTAGE '+(a>b?'CRAIG':'OPPONENT')}else{state.notice='POINT RECORDED'}
    }
   }
   render();
  }
  function winGame(winner,wasTie){state.games[winner]++;state.gamePoints=[0,0];state.tie=false;const a=state.games[winner],b=state.games[1-winner];if((a>=6&&a-b>=2)||(wasTie&&a===7)){state.sets[winner]++;state.games=[0,0];state.notice='SET TO '+(winner===0?'CRAIG':'OPPONENT');if(state.sets[winner]===2){state.finished=true;state.notice='MATCH COMPLETE'}}else if(state.games[0]===6&&state.games[1]===6){state.tie=true;state.notice='TIE-BREAK'}else{state.notice='GAME TO '+(winner===0?'CRAIG':'OPPONENT')}}
  function tennisPoint(i){const mine=state.gamePoints[i],opp=state.gamePoints[1-i];if(state.tie)return String(mine);if(mine>=3&&opp>=3){if(mine===opp)return '40';if(mine>opp)return 'Ad';return '40'}return ['0','15','30','40'][Math.min(mine,3)]}
  function render(){
   $('#score-points-0').textContent=sport.value==='tennis'?tennisPoint(0):state.gamePoints[0];
   $('#score-points-1').textContent=sport.value==='tennis'?tennisPoint(1):state.gamePoints[1];
   $('#score-games-0').textContent=sport.value==='tennis'?state.games[0]:state.sets[0];
   $('#score-games-1').textContent=sport.value==='tennis'?state.games[1]:state.sets[1];
   $('#score-sets').textContent=(sport.value==='tennis'?'SET SCORE ':'GAMES WON ')+state.sets.join('–');
   $('#score-status').textContent=state.notice;
   $$('.demo-score-grid.player-head strong').forEach(e=>e.textContent='');
   $('.demo-score-grid.player-head').lastElementChild.textContent='POINTS';
   $('.demo-score-grid.player-head').children[1].textContent=sport.value==='tennis'?'GAMES':'WON';
   $('#score-explanation').textContent=sport.value==='tennis'?'Tennis: 0, 15, 30, 40, deuce & advantage. First to six games by two wins a set; tie-break at 6–6. Best of three sets.':'Badminton singles: every rally scores. First to 21, win by two, capped at 30 points. Best of three games.';
   $('#undo-point').disabled=history.length===0;
   $('#point-0').disabled=state.finished;$('#point-1').disabled=state.finished;
  }
  sport.addEventListener('change',reset);
  $('#point-0').addEventListener('click',()=>addPoint(0));$('#point-1').addEventListener('click',()=>addPoint(1));
  $('#undo-point').addEventListener('click',()=>{if(history.length)state=history.pop();render()});$('#reset-score').addEventListener('click',reset);
  reset();
 }
 // Premium motion layer
 const revealTargets=$$('.section-pad, .capability-card, .intro-strip, .pullquote, .final-cta, .catalog-card, .method, .process-step, .principle-card, .interest-card, .about-social-panel a');
 revealTargets.forEach(el=>el.classList.add('reveal'));
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reducedMotion||!('IntersectionObserver' in window)){revealTargets.forEach(el=>el.classList.add('is-visible'))}else{const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});revealTargets.forEach(el=>io.observe(el))}
 const heroVisual=$('.hero-image');
 window.addEventListener('scroll',()=>{const y=window.scrollY||0; if(heroVisual&&!reducedMotion&&window.innerWidth>900){heroVisual.style.transform='translateY('+(y*0.035).toFixed(2)+'px) scale(1.035)';} const hdr=document.querySelector('.site-header'); if(hdr){hdr.style.boxShadow=y>10?'0 14px 34px rgba(15,24,22,.08)':'0 10px 25px rgba(15,24,22,.04)';}} ,{passive:true});
 
})();
