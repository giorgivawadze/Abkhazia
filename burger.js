
const menuBtn  = document.querySelector('.burger');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
   if(!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
   } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
   }
   

});
const toggleButton = document.querySelector ('.burger')
const navbarLinks = document.querySelector ('.ultag')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle ('active')
})