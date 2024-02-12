export interface CancelMovieSessionCommandInput {
  id: string;
}

export interface ICancelMovieSessionCommand {
  execute(inputData: CancelMovieSessionCommandInput): Promise<void>;
}
