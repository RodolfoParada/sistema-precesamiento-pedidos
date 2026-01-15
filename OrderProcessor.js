import { Subject } from './patterns/Subject.js';

export class OrderProcessor extends Subject {
  constructor() {
    super();
    this.commands = [];
    this.strategy = null;
  }

  setStrategy(s) { this.strategy = s; }
  addCommand(c) { this.commands.push(c); }

  process(order) {
    console.log("--- Iniciando Procesamiento ---");
    this.commands.forEach(cmd => cmd.execute(order));
    
    if (this.strategy) {
      order.total = this.strategy.apply(order.total);
    }

    order.id = Date.now();
    this.notify({ type: 'processed', order });
    return order;
  }
}