// Task 1: Observer Pattern (8 minutos)
// Notificación automática de cambios a múltiples objetos.

// ❌ Código sin patrón - acoplamiento fuerte
class NewsPublisher {
  constructor() {
    this.subscribers = [];
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  publish(news) {
    // Notificación manual y propensa a errores
    this.subscribers.forEach(sub => {
      if (sub.notify) sub.notify(news);
    });
  }
}

class NewsReader {
  notify(news) {
    console.log(`Noticia: ${news}`);
  }
}

// ✅ Observer Pattern - desacoplamiento
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class NewsPublisher extends Subject {
  publish(news) {
    console.log(`Publicando: ${news}`);
    this.notify(news);
  }
}

class NewsReader {
  constructor(name) {
    this.name = name;
  }

  update(news) {
    console.log(`${this.name} recibió: ${news}`);
  }
}

// Uso
const publisher = new NewsPublisher();
const reader1 = new NewsReader('Juan');
const reader2 = new NewsReader('María');

publisher.subscribe(reader1);
publisher.subscribe(reader2);

publisher.publish('¡Nuevo artículo publicado!');
// Output:
// Publicando: ¡Nuevo artículo publicado!
// Juan recibió: ¡Nuevo artículo publicado!
// María recibió: ¡Nuevo artículo publicado!