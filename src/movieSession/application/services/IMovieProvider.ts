export interface MovieInfo {
  id: string;
  name: string;
  thumbnailUrl: string;
}

export interface IMovieProvider {
  getMovieInfo(movieId: string): Promise<MovieInfo | null>;
}
