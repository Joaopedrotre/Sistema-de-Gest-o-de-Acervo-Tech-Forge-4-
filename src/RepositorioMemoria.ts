import { ItemNaoEncontradoError } from "./erros";

export class RepositorioMemoria<T extends { readonly id: number }> {
  private _itens: T[] = [];

  adicionar(item: T): void {
    this._itens.push(item);
  }

  buscarPorId(id: number): T {
    const item = this._itens.find((i) => i.id === id);
    if (item === undefined) {
      throw new ItemNaoEncontradoError(`Item com id ${id} não encontrado.`);
    }
    return item;
  }

  remover(id: number): void {
    const indice = this._itens.findIndex((i) => i.id === id);
    if (indice === -1) {
      throw new ItemNaoEncontradoError(`Item com id ${id} não encontrado.`);
    }
    this._itens.splice(indice, 1);
  }

  listar(): readonly T[] {
    return [...this._itens];
  }
}
