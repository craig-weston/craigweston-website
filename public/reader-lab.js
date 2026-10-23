/* Curated book finder — all information and selection remain in the browser. */
(()=>{'use strict';
const root=document.querySelector('#reading-guide');if(!root)return;
const books={
 design:{label:'YOUR STARTING POINT / DESIGN',title:'UX Is Dead, Long Live UX',description:'An approachable guide to understanding people, questioning assumptions and making digital products genuinely useful. Start here if you like ideas that work beyond the next trend.',img:'assets/ux-is-dead-long-live-ux.webp',alt:'Cover artwork representing UX Is Dead, Long Live UX',width:1280,height:2048,detail:'ux-book.html',buy:'https://www.amazon.co.uk/dp/B0HN889S5K'},
 spirits:{label:'YOUR STARTING POINT / FOLKLORE',title:'Ghosts of Old Japan',description:'Enter a world of yūrei, haunted places and stories of the dead. A richly illustrated doorway into the eerie, moving and surprisingly human side of Japanese folklore.',img:'assets/ghosts-3.webp',alt:'Ghosts of Old Japan illustrated book cover',width:950,height:1425,detail:'japan-books.html',buy:'https://www.amazon.co.uk/s?k=Ghosts+of+Old+Japan+Craig+Weston&i=stripbooks'},
 warriors:{label:'YOUR STARTING POINT / HISTORY',title:'Samurai of Old Japan',description:'For readers drawn to honour, conflict and the people behind the legends. Explore the world of the samurai without losing sight of the complicated history beneath the armour.',img:'assets/samurai-8.webp',alt:'Samurai of Old Japan illustrated book cover',width:950,height:1425,detail:'japan-books.html',buy:'https://www.amazon.co.uk/s?k=Samurai+of+Old+Japan+Craig+Weston&i=stripbooks'},
 culture:{label:'YOUR STARTING POINT / CULTURE',title:'Everyday Life in Old Japan',description:'Follow the smaller details that make history feel alive: daily routines, social customs and the fascinating habits of people whose lives were not so different from ours.',img:'assets/everyday-9.webp',alt:'Everyday Life in Old Japan illustrated book cover',width:950,height:1425,detail:'japan-books.html',buy:'https://www.amazon.co.uk/s?k=Everyday+Life+in+Old+Japan+Craig+Weston&i=stripbooks'}
};
const $=id=>document.getElementById(id),buttons=[...root.querySelectorAll('[data-reader-topic]')];
function choose(key){const book=books[key];if(!book)return;
 buttons.forEach(btn=>{const selected=btn.dataset.readerTopic===key;btn.classList.toggle('is-selected',selected);btn.setAttribute('aria-pressed',String(selected))});
 $('reader-kicker').textContent=book.label;$('reader-title').textContent=book.title;$('reader-description').textContent=book.description;
 const img=$('reader-cover');img.src=book.img;img.alt=book.alt;img.width=book.width;img.height=book.height;
 $('reader-deep-link').href=book.detail;$('reader-buy-link').href=book.buy;
}
buttons.forEach(btn=>btn.addEventListener('click',()=>choose(btn.dataset.readerTopic)));
})();
