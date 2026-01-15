// Task 4: State Pattern (6 minutos)
// Permite cambiar comportamiento según estado interno.

// ❌ Código sin patrón - condicionales basados en estado
class TrafficLight {
  constructor() {
    this.state = 'red';
  }

  change() {
    if (this.state === 'red') {
      this.state = 'green';
      console.log('Ahora verde');
    } else if (this.state === 'green') {
      this.state = 'yellow';
      console.log('Ahora amarillo');
    } else if (this.state === 'yellow') {
      this.state = 'red';
      console.log('Ahora rojo');
    }
  }

  getColor() {
    return this.state;
  }
}

// ✅ State Pattern - estados como objetos
class TrafficLightState {
  handle(light) {
    throw new Error('Implement in subclass');
  }
}

class RedState extends TrafficLightState {
  handle(light) {
    console.log('Cambiando a verde');
    light.setState(new GreenState());
  }
}

class GreenState extends TrafficLightState {
  handle(light) {
    console.log('Cambiando a amarillo');
    light.setState(new YellowState());
  }
}

class YellowState extends TrafficLightState {
  handle(light) {
    console.log('Cambiando a rojo');
    light.setState(new RedState());
  }
}

class TrafficLight {
  constructor() {
    this.state = new RedState();
  }

  setState(state) {
    this.state = state;
  }

  change() {
    this.state.handle(this);
  }

  getColor() {
    if (this.state instanceof RedState) return 'red';
    if (this.state instanceof GreenState) return 'green';
    if (this.state instanceof YellowState) return 'yellow';
  }
}

// Uso
const light = new TrafficLight();
console.log(light.getColor()); // 'red'
light.change(); // 'Cambiando a verde'
console.log(light.getColor()); // 'green