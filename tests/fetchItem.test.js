require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('fetch should be called with fetchitem(MLB1615760527)', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('fetch should use endpoint https://api.mercadolibre.com/items/MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('fetchItem should return an object equal to item', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(data).toEqual(item);
  });
  it('It should return `You must provide an url` if fetchItem does not have an argument', async () => {
    const answer = await fetchItem();
    expect(answer).toEqual('You must provide an url');
  });
});
