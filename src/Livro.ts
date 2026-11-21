import { ItemAcervo } from "./ItemAcervo";
import { Reservavel } from "./Reservavel";
import { ReservaInvalidaError } from "./erros";

export class Livro extends ItemAcervo implements Reservavel {
  private _reservadoPor: string | null = null;

  constructor(
    titulo: string,
    anoPublicacao: number,
    private _autor: string
  ) {
    super(titulo, anoPublicacao);
  }

  get autor(): string {
    return this._autor;
  }

  get estaReservado(): boolean {
    return this._reservadoPor !== null;
  }

  reservar(nomeUsuario: string): void {
    if (this._reservadoPor !== null) {
      throw new ReservaInvalidaError(`"${this.titulo}" já está reservado por ${this._reservadoPor}.`);
    }
    this._reservadoPor = nomeUsuario;
  }

  cancelarReserva(): void {
    if (this._reservadoPor === null) {
      throw new ReservaInvalidaError(`"${this.titulo}" não possui reserva.`);
    }
    this._reservadoPor = null;
  }

  override calcularMulta(diasAtraso: number): number {
    return diasAtraso * 0.5;
  }
}
