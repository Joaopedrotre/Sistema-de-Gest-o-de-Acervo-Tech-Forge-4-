import { ItemAcervo } from "./ItemAcervo";

export class JogoEletronico extends ItemAcervo {
  constructor(
    titulo: string,
    anoPublicacao: number,
    private _plataforma: string
  ) {
    super(titulo, anoPublicacao);
  }

  get plataforma(): string {
    return this._plataforma;
  }

  override calcularMulta(diasAtraso: number): number {
    return diasAtraso * 2 + 5;
  }
}
