export class NoDiscount {
  apply(amount) { return amount; }
}

export class PercentageDiscount {
  constructor(percent) { this.percent = percent; }
  apply(amount) { return amount * (1 - this.percent / 100); }
}