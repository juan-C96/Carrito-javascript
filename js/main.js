const serverUrl = 'http://127.0.0.1:5500/';
const itemsPath = 'json/items-tv.json';
const itemsPath2 = 'json/items-movil.json';
const itemsPath3 = 'json/items-pc.json';
const imagesPath = 'img/';


window.onload = getData();

const items = document.querySelector('.items1');
const items2 = document.querySelector('.items2');
const items3 = document.querySelector('.items3');

function getData() {
    fetch(`${serverUrl}${itemsPath}`)
        .then((res) => res.json())
     //   .then((data) => console.log(data));
        .then((data) => printData(data));

        fetch(`${serverUrl}${itemsPath2}`)
        .then((res) => res.json())
     //   .then((data) => console.log(data));
        .then((data) => printData2(data));

        fetch(`${serverUrl}${itemsPath3}`)
        .then((res) => res.json())
     //   .then((data) => console.log(data));
        .then((data) => printData3(data));
}

function printData(data) {
    const itemContainer = document.createElement('div');
    itemContainer.className = 'row';

    data.forEach((item) => {
        itemContainer.innerHTML += createDomElement(item);
        items.append(itemContainer);
    });
}

function printData2(data) {
    const itemContainer = document.createElement('div');
    itemContainer.className = 'row';

    data.forEach((item) => {
        itemContainer.innerHTML += createDomElement(item);
        items2.append(itemContainer);
    });
}

function printData3(data) {
    const itemContainer = document.createElement('div');
    itemContainer.className = 'row';

    data.forEach((item) => {
        itemContainer.innerHTML += createDomElement(item);
        items3.append(itemContainer);
    });
}

function createDomElement(item) {
    const itemHtml = `
    <div class="col-12 col-md-6">
        <div class="item shadow mb-4">
            <img class="item-image" style="border: 1px solid; color: black;"
                src=${serverUrl}${imagesPath}${item.image}>
            <div>
                <h5 class="item-title">${item.title}</h5>
                <p class="item-codigo">Código: ${item.codigo}</p>
            </div>
            <div class="item-details">
                <p class="description-p"><b>Descripción: </b>${item.caracteristicas}</p>
                <p>Stock: <p class="item-stock" id="text1">${item.stock}</p></p>
            </div>
            <div class="item-details">
                <h4 class="item-price">${item.price}</h4>
                <button class="item-button btn btn-primary addToCart" data-id="1">AÑADIR AL
                    CARRITO</button>
            </div>
        </div>
    </div>`
    return itemHtml;
}

