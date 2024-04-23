const openMenu = document.querySelector('.openMenu');
const closeMenu = document.querySelector('.closeMenu');

const cover = document.querySelector('.cover');
const dataMenu = document.querySelector('.data-container');

cover.style.transition = "250ms ease-in-out";
dataMenu.style.transition = "250ms ease-in-out";

cover.style.display = 'none';
dataMenu.style.display = 'none';

openMenu.addEventListener('click', () => {
    cover.style.opacity = 0;
    dataMenu.style.opacity = 0;

    cover.style.display = 'block';
    dataMenu.style.display = 'flex';

    setTimeout(() => {
        cover.style.opacity = 1;
        dataMenu.style.opacity = 1; 
    }, 100);    
});

closeMenu.addEventListener('click', () => {
    cover.style.opacity = 0;
    dataMenu.style.opacity = 0;

    setTimeout(() => {
        cover.style.display = 'none';
        dataMenu.style.display = 'none';
    }, 250);
});
