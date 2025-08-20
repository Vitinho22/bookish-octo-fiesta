const mercadopago = require('mercadopago');

// Crie uma instância de configuração:
const mp = new mercadopago.MercadoPagoConfig({
  accessToken: 'APP_USR-1576844588957876-081908-e4965a91f36605690cc9006a7af8653e-1205734045'
});

// Para criar preferências, use o client apropriado:
const preference = new mercadopago.Preference(mp);

async function criarPagamento() {
  const pref = {
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
    const response = await preference.create({ body: pref });
    console.log('Link de pagamento:', response.init_point);
  } catch (e) {
    console.error('Erro ao criar preferência:', e);
  }
}

criarPagamento();