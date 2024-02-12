import { MovieSessionStatus } from '../../../domain/enums/MovieSessionStatus';

export interface ListMovieSessionsQueryInput {
  movieId: string | null;
}

export interface ListMovieSessionsQueryOutput {
  movieSessions: {
    id: string;
    movieName: string;
    status: MovieSessionStatus;
    thumbnailUrl: string;
    availableSeats: number;
    totalSeats: number;
    startTime: Date;
    endTime: Date;
  }[];
}

export interface IListMovieSessionsQuery {
  execute(
    inputData: ListMovieSessionsQueryInput,
  ): Promise<ListMovieSessionsQueryOutput>;
}
