// Command.js
export class Command {
  execute(order) { throw new Error("Método execute no implementado"); }
  undo(order) { throw new Error("Método undo no implementado"); }
}