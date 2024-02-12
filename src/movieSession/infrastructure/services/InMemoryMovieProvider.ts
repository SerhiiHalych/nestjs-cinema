import { Injectable } from '@nestjs/common';

import {
  IMovieProvider,
  MovieInfo,
} from '../../application/services/IMovieProvider';

@Injectable()
export class InMemoryMovieProvider implements IMovieProvider {
  public async getMovieInfo(movieId: string): Promise<MovieInfo | null> {
    return new Promise((res) =>
      setTimeout(() => {
        res({
          id: movieId,
          name: 'The Shawshank Redemption',
          thumbnailUrl: 'https://dummy-url.com/shawshank.jpg',
        });
      }, 500),
    );
  }
}
