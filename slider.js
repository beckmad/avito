const img = document.querySelectorAll('img')[0];
const prev = document.querySelectorAll('button')[0];
const next = document.querySelectorAll('button')[1];
let imgs = img.dataset.links.split(',');
let i = 0;
prev.addEventListener('click', () => {
    i--;
    if (i === -1) {
        i = imgs.length - 1;
    }
    img.src = imgs[i];
});
next.addEventListener('click', () => {
    i++;
    if (i === imgs.length) {
        i = 0;
    }
    img.src = imgs[i];
});