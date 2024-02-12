export interface CancelTicketReservationCommandInput {
  ticketId: string;
}

export interface ICancelTicketReservationCommand {
  execute(inputData: CancelTicketReservationCommandInput): Promise<void>;
}
