const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
};

const cartItems = document.querySelector('.cart__items');

// 8

const saveStorage = () => {
  const cart = cartItems.innerHTML;
  saveCartItems(cart);
};  

const sumAll = () => {
  const lis = document.querySelectorAll('li');
  let sum = 0;
  lis.forEach((li) => {
    const arr = li.innerText.match(/[\d,.]+/g);
    // Créditos ao Gabriel Gonçalves - Turma 23 - Tribo A por ter encontrado esse regex.
    sum += parseFloat(arr[arr.length - 1]);
  });
  document.querySelector('#total').innerText = sum;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  saveStorage();
  sumAll();
};

const loading = () => {
  const createElement = createCustomElement('h2', 'loading', 'carregando...');
  const container = document.querySelector('.container');
  container.appendChild(createElement);
};

const removeLoading = () => {
  const h2 = document.querySelector('.loading');
  h2.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const listOfProducts = async () => {
  loading();
  const search = await fetchProducts('computador');
  removeLoading();
  const { results } = search;
  return results;
};

const listResults = (searchs) => {
  const items = document.querySelector('.items');
  const result = searchs.forEach((search) => {
    const { id, title, thumbnail } = search;
    const elements = createProductItemElement({ sku: id, name: title, image: thumbnail });
    items.appendChild(elements);
  });
  return result;
};

const itemToCart = async (idItem) => {
  loading();
  const item = getSkuFromProductItem(idItem.target.parentNode);
  const result = await fetchItem(item);
  removeLoading();
  const { id, title, price } = result;
  const elements = createCartItemElement({ sku: id, name: title, salePrice: price });
  cartItems.appendChild(elements);
  saveStorage();
  sumAll();
};

const addToCartButtons = () => {
  const addItem = document.querySelectorAll('.item__add');
  addItem.forEach((item) => {
    item.addEventListener('click', itemToCart);
  });
};

// 8

const getItemsfromStorage = () => {
 const get = getSavedCartItems('cartItems');
 cartItems.innerHTML = get;
 const lis = document.querySelectorAll('li');
 lis.forEach((li) => {
  li.addEventListener('click', cartItemClickListener);
 });
};

const empty = document.querySelector('.empty-cart');

empty.addEventListener('click', () => {
  const lis = document.querySelectorAll('li');
  lis.forEach((li) => {
    li.remove();
  });
  saveStorage();
  sumAll();
});

window.onload = async () => {
  listResults(await listOfProducts());
  addToCartButtons();
  getItemsfromStorage();
  sumAll();
};
