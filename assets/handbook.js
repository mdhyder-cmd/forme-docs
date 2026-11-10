
const menu=document.querySelector('.nav-open'),side=document.querySelector('.sidebar'),shade=document.querySelector('.nav-shade');
function closeMenu(){document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');if(innerWidth<=760)side.inert=true;}
menu.addEventListener('click',()=>{const open=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));side.inert=!open&&innerWidth<=760;});shade.addEventListener('click',closeMenu);
addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){closeMenu();menu.focus();}});
const mq=matchMedia('(max-width:760px)');function adapt(){if(!mq.matches)closeMenu();side.inert=mq.matches&&!document.body.classList.contains('menu-open');}mq.addEventListener('change',adapt);adapt();
const dialog=document.querySelector('.search-dialog'),input=dialog.querySelector('input'),results=dialog.querySelector('.search-results'),status=dialog.querySelector('[role=status]');
let opener;
function openSearch(){closeMenu();opener=document.activeElement;dialog.showModal();input.focus();render();}
document.querySelector('.search-open').addEventListener('click',openSearch);dialog.querySelector('.search-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(!dialog.open)openSearch();}});
function render(){const q=input.value.trim().toLowerCase(),tokens=q.split(/\s+/).filter(Boolean),list=window.FORME_SEARCH.filter(p=>!q||tokens.every(t=>p.search.includes(t))).slice(0,20);results.replaceChildren();for(const p of list){const a=document.createElement('a');a.href=p.url;const title=document.createElement('span');title.textContent=p.title;const sub=document.createElement('p');sub.textContent=p.subtitle;a.append(title,sub);results.append(a);}status.textContent=q?(list.length?list.length+' matching guides':'No matching guides. Try a setting name, section, or shorter phrase.'):'Browse guides, or search a setting, section, or issue.';}
input.addEventListener('input',render);
