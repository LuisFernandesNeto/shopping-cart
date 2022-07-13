const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;

  try {
    const request = await fetch(url);
    const data = await request.json();
    return data;
    } catch (error) {
      return 'You must provide an url';
    }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
