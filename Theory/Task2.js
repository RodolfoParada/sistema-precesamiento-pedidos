// Task 2: Strategy Pattern (8 minutos)
// Encapsula algoritmos intercambiables.

// ❌ Código sin patrón - condicionales complejos
class ShoppingCart {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
    this.items = [];
  }

  checkout() {
    const total = this.calculateTotal();

    if (this.paymentMethod === 'credit') {
      // Lógica específica de tarjeta de crédito
      return this.processCreditCard(total);
    } else if (this.paymentMethod === 'paypal') {
      // Lógica específica de PayPal
      return this.processPayPal(total);
    } else if (this.paymentMethod === 'crypto') {
      // Lógica específica de cripto
      return this.processCrypto(total);
    }
  }
}

// ✅ Strategy Pattern - algoritmos intercambiables
class PaymentStrategy {
  pay(amount) {
    throw new Error('Implement in subclass');
  }
}

class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber, expiryDate, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
  }

  pay(amount) {
    console.log(`Pagando ${amount} con tarjeta ${this.cardNumber}`);
    return { success: true, transactionId: 'cc_' + Date.now() };
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }

  pay(amount) {
    console.log(`Pagando ${amount} con PayPal ${this.email}`);
    return { success: true, transactionId: 'pp_' + Date.now() };
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }

  checkout() {
    const total = this.calculateTotal();
    return this.paymentStrategy.pay(total);
  }

  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// Uso
const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardStrategy('1234-5678-9012-3456', '12/25', '123'));
const result = cart.checkout();