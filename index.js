function loadItems() {
    return new Promise((resolve, reject) => {
        const URL = 'http://134.209.138.34/items';
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

loadItems().then(response => {
    document.getElementsByClassName('lazy-load')[0].style.display = 'none';
    response.forEach(elem => {
        const li = document.createElement('LI');
        li.className = 'item';
        const id = document.createElement('DIV');
        const address = document.createElement('DIV');
        const title = document.createElement('DIV');
        const img = document.createElement('IMG');
        const price = document.createElement('DIV');
        const a = document.createElement('A');

        a.setAttribute('href', `http://134.209.138.34/item/${elem.id}`);
        a.className = 'link';
        id.innerHTML = elem.id;
        id.className = 'id';

        address.innerHTML = elem.address;

        title.innerHTML = elem.title;
        title.className = 'title';

        img.src = elem.previewImage;
        img.width = '208';
        img.height = '156';
        a.append(img);
        price.innerHTML = elem.price;

        li.append(a, title, id, address, price);
        ul.appendChild(li);
    });
});

const links = document.getElementsByClassName('link');



