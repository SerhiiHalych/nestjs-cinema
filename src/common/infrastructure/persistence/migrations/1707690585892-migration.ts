import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1707690585892 implements MigrationInterface {
  name = 'Migration1707690585892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cinema_hall_seat" ("cinema_hall_seat_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seat_number" integer NOT NULL, "cinema_hall_id" uuid NOT NULL, CONSTRAINT "PK_658f1fae7f5b566043325bcf66a" PRIMARY KEY ("cinema_hall_seat_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cinema_hall" ("cinema_hall_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cinema_hall_number" integer NOT NULL, CONSTRAINT "PK_8fc9e9a42944ef5a958c3fd000e" PRIMARY KEY ("cinema_hall_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."movie_session_movie_session_status_enum" AS ENUM('OPEN', 'CLOSED', 'CANCELED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_session" ("movie_session_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie_id" uuid NOT NULL, "cinema_hall_id" uuid NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "movie_session_status" "public"."movie_session_movie_session_status_enum" NOT NULL, CONSTRAINT "PK_35391b8be591dda7f3b3de9aafe" PRIMARY KEY ("movie_session_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("ticket_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie_session_id" uuid NOT NULL, "visitor_id" uuid, "seat_number" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_a7b0a31430509c3d3e22832e341" PRIMARY KEY ("ticket_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cinema_hall_seat" ADD CONSTRAINT "FK_fed34b121777c222b202e6f4785" FOREIGN KEY ("cinema_hall_id") REFERENCES "cinema_hall"("cinema_hall_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_session" ADD CONSTRAINT "FK_6b99509be30e8cca95f92a35825" FOREIGN KEY ("cinema_hall_id") REFERENCES "cinema_hall"("cinema_hall_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_1272ba1259533ae6f95c1727358" FOREIGN KEY ("movie_session_id") REFERENCES "movie_session"("movie_session_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_1272ba1259533ae6f95c1727358"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_session" DROP CONSTRAINT "FK_6b99509be30e8cca95f92a35825"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cinema_hall_seat" DROP CONSTRAINT "FK_fed34b121777c222b202e6f4785"`,
    );
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "movie_session"`);
    await queryRunner.query(
      `DROP TYPE "public"."movie_session_movie_session_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "cinema_hall"`);
    await queryRunner.query(`DROP TABLE "cinema_hall_seat"`);
  }
}
