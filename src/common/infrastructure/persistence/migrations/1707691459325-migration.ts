import { MigrationInterface, QueryRunner } from 'typeorm';

import { MovieSessionStatus } from '../../../../movieSession/domain/enums/MovieSessionStatus';

export class Migration1707691459325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cinemaHallNumbers = [...new Array(3)].map((_, index) => index + 1);

    const cinemaHallSeatNumbers = [...new Array(50)].map(
      (_, index) => index + 1,
    );

    const createdCinemaHalls: { cinema_hall_id: string }[] =
      await queryRunner.query(`
            INSERT INTO "cinema_hall" ("cinema_hall_id", "cinema_hall_number")
            VALUES ${cinemaHallNumbers
              .map((hallNumber) => `(uuid_generate_v4(), ${hallNumber})`)
              .join(',')}
            RETURNING cinema_hall_id
        `);

    await queryRunner.query(`
        INSERT INTO "cinema_hall_seat" ("cinema_hall_seat_id", "seat_number", "cinema_hall_id")
        VALUES ${createdCinemaHalls
          .map((cinemaHall) =>
            cinemaHallSeatNumbers
              .map(
                (seatNumber) =>
                  `(uuid_generate_v4(), ${seatNumber}, '${cinemaHall.cinema_hall_id}')`,
              )
              .join(','),
          )
          .join(',')}
    `);

    const createdMovieSessions: { movie_session_id: string }[] =
      await queryRunner.query(`
        INSERT INTO "movie_session" ("movie_session_id", "movie_id", "cinema_hall_id", "start_time", "end_time", "movie_session_status")
        VALUES ${createdCinemaHalls
          .map(
            (cinemaHall) =>
              `(uuid_generate_v4(), uuid_generate_v4(), '${cinemaHall.cinema_hall_id}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '2 hours', '${MovieSessionStatus.OPEN}')`,
          )
          .join(',')}
        RETURNING movie_session_id
    `);

    await queryRunner.query(`
        INSERT INTO "ticket" ("ticket_id", "movie_session_id", "visitor_id", "seat_number", "price")
        VALUES ${createdMovieSessions
          .map((movieSession) =>
            cinemaHallSeatNumbers
              .map(
                (seatNumber, index) =>
                  `(uuid_generate_v4(), '${movieSession.movie_session_id}', ${
                    index % 2 === 0 ? 'uuid_generate_v4()' : 'NULL'
                  }, ${seatNumber}, 19.99)`,
              )
              .join(','),
          )
          .join(',')}
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {
    const tables = [
      'cinema_hall',
      'cinema_hall_seat',
      'movie_session',
      'ticket',
    ];

    await queryRunner.query(
      `TRUNCATE ${tables.map((table) => table).join(', ')} CASCADE`,
    );
  }
}
