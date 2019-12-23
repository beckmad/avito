'use strict';

function loadJSON(url) {
    return new Promise((resolve, reject) => {
        const URL = url;
        const xhr = new XMLHttpRequest();

        xhr.open('GET', URL);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status === 200) {
                const result = JSON.parse(xhr.response);
                resolve(result)
            } else {
                reject('Loading error')
            }
        };
    });
}

const ul = document.getElementsByClassName('list')[0];

loadJSON('http://134.209.138.34/items').then(response => {
    document.getElementsByClassName('lazy-load')[0].style.display = 'none';
    response.forEach(elem => {
        const li = document.createElement('LI');
        li.className = 'item';
        const id = document.createElement('DIV');
        const address = document.createElement('DIV');
        const title = document.createElement('A');
        const img = document.createElement('IMG');
        const price = document.createElement('DIV');

        title.setAttribute('href', `http://134.209.138.34/item/${elem.id}`);
        id.textContent = elem.id;
        id.className = 'id';

        address.textContent = elem.address;

        title.textContent = elem.title;
        title.className = 'title';

        img.src = elem.previewImage;
        img.width = '208';
        img.height = '156';

        price.textContent = elem.price;

        li.append(img, title, id, address, price);
        ul.appendChild(li);
    });
});

ul.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.tagName !== 'A') return;
    const URL = e.target.href;
    loadJSON(URL).then(response => {
        const rsp = response[0];
        const box = document.createElement('DIV');
        box.className = 'box';
        const name = document.createElement('DIV');
        const desc = document.createElement('DIV');
        const img = document.createElement('IMG');
        const imgLinks = rsp.images;
        const prev = document.createElement('BUTTON');
        const next = document.createElement('BUTTON');

        prev.textContent = 'prev';
        next.textContent = 'next';
        img.src = imgLinks[0];
        img.dataset.links = imgLinks;
        name.textContent = rsp.sellerName;
        name.className = 'title';
        desc.textContent = rsp.description;
        desc.className = 'desc';
        box.append(img, prev, next, name, desc);
        const w = window.open();
        w.document.open();


        w.document.write('<!doctype html>\n' +
            '<html lang="ru">\n' +
            '<head>\n' +
            '    <meta charset="UTF-8">\n' +
            '    <meta name="viewport"\n' +
            '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n' +
            '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
            '    <link rel="stylesheet" href="css/normalize.css">\n' +
            '    <link rel="stylesheet" href="css/main.css">\n' +
            '    <title>Document</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '</body>\n' +
            '<script src="js/slider.js"></script>' +
            '</html>');
        w.document.body.append(box);
        w.document.close();
    });


});



