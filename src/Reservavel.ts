export interface Reservavel {
  readonly estaReservado: boolean;
  reservar(nomeUsuario: string): void;
  cancelarReserva(): void;
}
