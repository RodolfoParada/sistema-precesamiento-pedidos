export class OrderLogger {
  update(event) {
    if (event.type === 'processed') {
      console.log(`📧 Email: Pedido ${event.order.id} procesado con éxito.`);
    }
  }
}