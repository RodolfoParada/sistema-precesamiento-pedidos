// Task 3: Command Pattern (8 minutos)
// Encapsula requests como objetos.

// ❌ Código sin patrón - ejecución directa
class RemoteControl {
  constructor(tv) {
    this.tv = tv;
  }

  pressPower() {
    this.tv.power();
  }

  pressVolumeUp() {
    this.tv.volumeUp();
  }

  pressVolumeDown() {
    this.tv.volumeDown();
  }

  // Problema: no se puede undo, queue, log, etc.
}

// ✅ Command Pattern - requests encapsulados
class Command {
  execute() { throw new Error('Implement in subclass'); }
  undo() { throw new Error('Implement in subclass'); }
}

class PowerCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
  }

  execute() {
    this.device.power();
  }

  undo() {
    this.device.power(); // Toggle power
  }
}

class VolumeUpCommand extends Command {
  constructor(device) {
    super();
    this.device = device;
  }

  execute() {
    this.device.volumeUp();
  }

  undo() {
    this.device.volumeDown();
  }
}

class RemoteControl {
  constructor() {
    this.history = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  undoLastCommand() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Uso
const tv = new TV();
const remote = new RemoteControl();

const powerCmd = new PowerCommand(tv);
const volumeCmd = new VolumeUpCommand(tv);

remote.executeCommand(powerCmd);    // Enciende TV
remote.executeCommand(volumeCmd);   // Sube volumen
remote.undoLastCommand();           // Baja volumen (undo)