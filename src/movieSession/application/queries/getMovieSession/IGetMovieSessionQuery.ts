import { MovieSessionStatus } from '../../../domain/enums/MovieSessionStatus';

export interface GetMovieSessionQueryInput {
  id: string;
}

export interface GetMovieSessionQueryOutput {
  movieSession: {
    id: string;
    movieName: string;
    thumbnailUrl: string;
    cinemaHallNumber: number;
    status: MovieSessionStatus;
    seats: {
      ticketId: string | null;
      seatNumber: number;
      price: number | null;
      isAvailable: boolean;
    }[];
    startTime: Date;
    endTime: Date;
  } | null;
}

export interface IGetMovieSessionQuery {
  execute(
    inputData: GetMovieSessionQueryInput,
  ): Promise<GetMovieSessionQueryOutput>;
}
