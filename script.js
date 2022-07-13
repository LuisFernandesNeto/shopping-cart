/* const { fetchProducts } = require("./helpers/fetchProducts"); */

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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const listOfProducts = async () => {
  const search = await fetchProducts('computador');
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

window.onload = async () => {
  listResults(await listOfProducts());
};
