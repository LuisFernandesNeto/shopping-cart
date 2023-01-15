const fetchProducts = async (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

  try {
  const request = await fetch(url);
  const data = await request.json();
  return data;
  } catch (error) {
    return 'You must provide an url';
  }
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}