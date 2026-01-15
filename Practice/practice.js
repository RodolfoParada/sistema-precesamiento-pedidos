// Practical exercise to apply the concepts learned.
// Sistema de procesamiento de pedidos con múltiples estrategias:

// Strategy + Command + Observer combinados
class OrderProcessor extends Subject {
  constructor() {
    super();
    this.commands = [];
    this.discountStrategy = null;
  }

  setDiscountStrategy(strategy) {
    this.discountStrategy = strategy;
  }

  addCommand(command) {
    this.commands.push(command);
  }

  processOrder(order) {
    // Aplicar descuento si existe estrategia
    if (this.discountStrategy) {
      order.total = this.discountStrategy.apply(order.total);
    }

    // Ejecutar comandos
    this.commands.forEach(command => command.execute(order));

    // Notificar observers
    this.notify({ type: 'order_processed', order });

    return order;
  }
}

// Estrategias de descuento
class NoDiscountStrategy {
  apply(amount) { return amount; }
}

class PercentageDiscountStrategy {
  constructor(percentage) {
    this.percentage = percentage;
  }

  apply(amount) {
    return amount * (1 - this.percentage / 100);
  }
}

// Comandos
class ValidateOrderCommand {
  execute(order) {
    if (!order.items || order.items.length === 0) {
      throw new Error('Pedido vacío');
    }
    console.log('Pedido validado');
  }
}

class CalculateTotalCommand {
  execute(order) {
    order.total = order.items.reduce((sum, item) => sum + item.price, 0);
    console.log(`Total calculado: ${order.total}`);
  }
}

class SaveOrderCommand {
  execute(order) {
    order.id = Date.now();
    console.log(`Pedido guardado con ID: ${order.id}`);
  }
}

// Observer
class OrderLogger {
  update(event) {
    if (event.type === 'order_processed') {
      console.log(`Pedido procesado: ${event.order.id}`);
    }
  }
}

// Uso
const processor = new OrderProcessor();
processor.setDiscountStrategy(new PercentageDiscountStrategy(10));
processor.addCommand(new ValidateOrderCommand());
processor.addCommand(new CalculateTotalCommand());
processor.addCommand(new SaveOrderCommand());
processor.subscribe(new OrderLogger());

const order = {
  items: [
    { name: 'Producto 1', price: 100 },
    { name: 'Producto 2', price: 50 }
  ]
};

const processedOrder = processor.processOrder(order);
console.log(`Total final: ${processedOrder.total}`); // 135 (10% descuento)
// Requerimientos:
// # No se requieren dependencias especiales
// # Los patrones se implementan con JavaScript vanilla