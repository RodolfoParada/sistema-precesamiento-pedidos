import { OrderProcessor } from './OrderProcessor.js';
import { PercentageDiscount } from './strategies/DiscountStrategies.js';
import { ValidateOrder, CalculateTotal } from './commands/OrderCommands.js';
import { OrderLogger } from './observers/OrderNotifiers.js';

const processor = new OrderProcessor();

// Configuración
processor.setStrategy(new PercentageDiscount(10));
processor.addCommand(new ValidateOrder());
processor.addCommand(new CalculateTotal());
processor.subscribe(new OrderLogger());

// Ejecución
const myOrder = { items: [{ name: 'Laptop', price: 1000 }] };
processor.process(myOrder);