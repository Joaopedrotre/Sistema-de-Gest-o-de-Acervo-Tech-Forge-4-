import { ItemIndisponivelError } from "./erros";

const MS_POR_DIA = 1000 * 60 * 60 * 24;

export abstract class ItemAcervo {
  private static _contadorId = 0;

  readonly id: number = ++ItemAcervo._contadorId;
  private _emprestadoEm: Date | null = null;

  constructor(
    private _titulo: string,
    private _anoPublicacao: number
  ) {}

  get titulo(): string {
    return this._titulo;
  }

  get anoPublicacao(): number {
    return this._anoPublicacao;
  }

  get statusDisponibilidade(): string {
    return this._emprestadoEm === null ? "Disponível" : "Emprestado";
  }

  get diasEmprestado(): number {
    if (this._emprestadoEm === null) {
      return 0;
    }
    return Math.floor((Date.now() - this._emprestadoEm.getTime()) / MS_POR_DIA);
  }

  emprestar(): void {
    if (this._emprestadoEm !== null) {
      throw new ItemIndisponivelError(`"${this._titulo}" já está emprestado.`);
    }
    this._emprestadoEm = new Date();
  }

  devolver(): void {
    if (this._emprestadoEm === null) {
      throw new ItemIndisponivelError(`"${this._titulo}" não está emprestado.`);
    }
    this._emprestadoEm = null;
  }

  abstract calcularMulta(diasAtraso: number): number;
}
