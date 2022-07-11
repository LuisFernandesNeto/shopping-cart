require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('It should be a function', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('Execute a função fetchProducts com o argumento `computador` e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento `computador`, a função fetch utiliza o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=computador`', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=computador`);
  });
  it('fetchProducts with argument `computador` should return equal to `ComputadorSearch`', async () => {
    const computer = await fetchProducts('computador');
    expect(computer).toEqual(computadorSearch);
  });
  it('It should return `You must provide an url` if fetchProducts does not have an argument', async () => {
    const retorno = await fetchProducts();
    expect(retorno).toEqual('You must provide an url');
  });
});
