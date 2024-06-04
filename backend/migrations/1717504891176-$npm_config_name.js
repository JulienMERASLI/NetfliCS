import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717504891176 {
    name = ' $npmConfigName1717504891176'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "status" integer NOT NULL,
                "note" integer NOT NULL,
                "movieId" integer,
                "userId" integer,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_user"(
                    "movie_id",
                    "user_id",
                    "status",
                    "note",
                    "movieId",
                    "userId"
                )
            SELECT "movie_id",
                "user_id",
                "status",
                "note",
                "movieId",
                "userId"
            FROM "movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_user"
                RENAME TO "movie_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "status" integer NOT NULL,
                "note" integer NOT NULL,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_user"("movie_id", "user_id", "status", "note")
            SELECT "movie_id",
                "user_id",
                "status",
                "note"
            FROM "movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_user"
                RENAME TO "movie_user"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie_user"
                RENAME TO "temporary_movie_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "status" integer NOT NULL,
                "note" integer NOT NULL,
                "movieId" integer,
                "userId" integer,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_user"("movie_id", "user_id", "status", "note")
            SELECT "movie_id",
                "user_id",
                "status",
                "note"
            FROM "temporary_movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_user"
                RENAME TO "temporary_movie_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "status" integer NOT NULL,
                "note" integer NOT NULL,
                "movieId" integer,
                "userId" integer,
                CONSTRAINT "FK_78c4c379746cc5047efcb47a74f" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_be7a2782d8147a7d94d5382e840" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_user"(
                    "movie_id",
                    "user_id",
                    "status",
                    "note",
                    "movieId",
                    "userId"
                )
            SELECT "movie_id",
                "user_id",
                "status",
                "note",
                "movieId",
                "userId"
            FROM "temporary_movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_user"
        `);
    }
}
