const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = [...document.querySelectorAll('.nav-link')];
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu.classList.toggle('open', !isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});
const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));
}
const animatedItems = document.querySelectorAll('.service-card, .skill-row, .project-card, .about-card, .toolbox, .contact-panel');
animatedItems.forEach(item => item.classList.add('reveal'));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animatedItems.forEach(item => revealObserver.observe(item));
} else {
  animatedItems.forEach(item => item.classList.add('visible'));
}
document.getElementById('year').textContent = new Date().getFullYear();
// Replace this placeholder with 's real Facebook profile URL.
const facebookProfileUrl = 'https://www.facebook.com/jefferson.ostia';
['facebookCta', 'facebookText'].forEach(id => {
  const link = document.getElementById(id);
  link.href = facebookProfileUrl;
});

// Numbered photo gallery and full-screen preview.
const photoCards=[...document.querySelectorAll('.photo-card')];
const photoViewer=document.getElementById('photoViewer');
const viewerImage=document.getElementById('viewerImage');
const viewerTitle=document.getElementById('viewerTitle');
const viewerCount=document.getElementById('viewerCount');
const viewerClose=document.getElementById('viewerClose');
const viewerPrev=document.getElementById('viewerPrev');
const viewerNext=document.getElementById('viewerNext');
let activePhotoIndex=0, previouslyFocusedElement=null;
const photoItems=photoCards.map((card,index)=>({src:card.querySelector('img').getAttribute('src'),alt:`PHOTO ${index+1}`,card}));
function showPhoto(index){activePhotoIndex=(index+photoItems.length)%photoItems.length;const photo=photoItems[activePhotoIndex];viewerImage.src=photo.src;viewerImage.alt=photo.alt;viewerTitle.textContent=photo.alt;viewerCount.textContent=`${activePhotoIndex+1} / ${photoItems.length}`;}
function openPhoto(index){if(!photoItems.length)return;previouslyFocusedElement=document.activeElement;showPhoto(index);photoViewer.classList.add('is-open');photoViewer.setAttribute('aria-hidden','false');document.body.classList.add('viewer-active');viewerClose.focus();}
function closePhoto(){photoViewer.classList.remove('is-open');photoViewer.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-active');viewerImage.src='';if(previouslyFocusedElement)previouslyFocusedElement.focus();}
photoCards.forEach((card,index)=>card.addEventListener('click',()=>openPhoto(index)));
viewerClose.addEventListener('click',closePhoto);
viewerPrev.addEventListener('click',()=>showPhoto(activePhotoIndex-1));
viewerNext.addEventListener('click',()=>showPhoto(activePhotoIndex+1));
photoViewer.addEventListener('click',event=>{if(event.target===photoViewer)closePhoto();});
document.addEventListener('keydown',event=>{if(!photoViewer.classList.contains('is-open'))return;if(event.key==='Escape')closePhoto();if(event.key==='ArrowLeft')showPhoto(activePhotoIndex-1);if(event.key==='ArrowRight')showPhoto(activePhotoIndex+1);});
