import { Command } from '../patterns/Command.js';

export class ValidateOrder extends Command {
  execute(order) {
    if (!order.items.length) throw new Error("Pedido vacío");
    console.log("✅ Pedido validado");
  }
}

export class CalculateTotal extends Command {
  execute(order) {
    order.total = order.items.reduce((acc, item) => acc + item.price, 0);
    console.log(`💰 Subtotal: ${order.total}`);
  }
}