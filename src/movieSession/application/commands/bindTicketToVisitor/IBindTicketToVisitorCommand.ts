export interface BindTicketToVisitorCommandInput {
  ticketId: string;
  visitorId: string;
}

export interface IBindTicketToVisitorCommand {
  execute(inputData: BindTicketToVisitorCommandInput): Promise<void>;
}
