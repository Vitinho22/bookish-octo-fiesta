const mercadopago = require('mercadopago');

// Cole seu Access Token abaixo
mercadopago.configurations.setAccessToken('APP_USR-1576844588957876-081908-e4965a91f36605690cc9006a7af8653e-1205734045');

async function criarPagamento() {
  const preference = {
    items: [
      {
        title: 'Produto de exemplo',
        quantity: 1,
        unit_price: 50.0,
        currency_id: "BRL"
      }
    ]
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    console.log('Link de pagamento:', response.body.init_point);
  } catch (e) {
    console.error('Erro ao criar preferência:', e);
  }
}

criarPagamento();