export class ErroAcervo extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = new.target.name;
  }
}

export class ItemIndisponivelError extends ErroAcervo {}

export class ItemNaoEncontradoError extends ErroAcervo {}

export class ReservaInvalidaError extends ErroAcervo {}
