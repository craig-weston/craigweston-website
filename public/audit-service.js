/* Self-contained, accessible opportunity model: no network calls, no tracking. */
(()=>{'use strict';
 const ids=['audit-visitors','audit-conversion','audit-order','audit-uplift','audit-enquiries','audit-cost','audit-reduction'];
 const inputs=ids.map(id=>document.getElementById(id));
 if(inputs.some(x=>!x))return;
 const out={revenue:document.getElementById('audit-added-revenue'),saved:document.getElementById('audit-saved-cost'),total:document.getElementById('audit-total-opportunity')};
 const gbp=new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0});
 function read(el){const n=Number(el.value);return Number.isFinite(n)?Math.max(Number(el.min)||0,Math.min(Number(el.max)||Number.MAX_SAFE_INTEGER,n)):0}
 function update(){const [visits,rate,value,uplift,contacts,cost,reduction]=inputs.map(read);
 const possible=Math.max(0,Math.min(uplift,100-rate));
 const revenue=visits*(possible/100)*value;
 const saved=contacts*cost*(reduction/100);
 out.revenue.textContent=gbp.format(revenue);out.saved.textContent=gbp.format(saved);out.total.textContent=gbp.format(revenue+saved);
 }
 for(const input of inputs)input.addEventListener('input',update);
 update();
})();