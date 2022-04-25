document.addEventListener('click', event =>{
  if (event.target && event.target.className.includes('addToCart')){
    addToCartClicked(event)
  }
})

const botonVaciar = document.querySelector('#vaciarButton');

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemStock = item.querySelector('.item-stock').textContent;
  const itemImage = item.querySelector('.item-image').src;
  const itemCodigo = item.querySelector('.item-codigo').textContent;

  if(itemStock != 0){
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
    const elementsStock = document.getElementsByClassName('item-stock');
    const elementsCodigo = document.getElementsByClassName('item-codigo');
    var stock = itemStock;
    for (let i = 0; i < elementsCodigo.length; i++) {
      if (elementsCodigo[i].innerText == itemCodigo) {
        stock = itemStock -1;
        elementsStock[i].innerHTML = stock;
      }
    }
  }else{
    alert("No hay unidades disponibles por el momento");
  }
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0" id="ti">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice" >${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1" disabled>
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('€', ''));
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  const item1 = buttonClicked.closest('.shoppingCartItem');

  const itemTitle1 = item1.querySelector('.shoppingCartItemTitle').textContent;
  const itemStock1 = item1.querySelector('.shoppingCartItemQuantity').value;

  const elementsStock1 = document.getElementsByClassName('item-stock');
  const elementsTittles1 = document.getElementsByClassName('item-title');
  for (let i = 0; i < elementsTittles1.length; i++) {
    if (elementsTittles1[i].innerText == itemTitle1) {
      var number1 = Number(itemStock1);
      var number2 = Number(elementsStock1[i].textContent);
      var stock1 = number1 + number2;
      elementsStock1[i].innerHTML = stock1;
    }
  }
  
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function removeAllShoopingCartItem() {
  
  const elementsTittles1 = document.getElementsByClassName('item-title');
  const elementsStock1 = document.getElementsByClassName('item-stock');

  const elementsTittles2 = document.getElementsByClassName('shoppingCartItemTitle');
  const elementsStock2 = document.getElementsByClassName('shoppingCartItemQuantity');

  for (let i = 0; i < elementsTittles1.length; i++) {
    for (let j = 0; j < elementsTittles2.length; j++) {
      if (elementsTittles1[i].innerText == elementsTittles2[j].innerText) {
        var number1 = Number(elementsStock1[i].textContent);
        var number2 = Number(elementsStock2[j].value);
        var stock1 = number1 + number2;
        elementsStock1[i].innerHTML = stock1;
      }
    }
  }
  
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
  alert("Gracias por su compra, pronto recibirá su pedido");
}



