import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717686034928 {
    name = ' $npmConfigName1717686034928'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "note" integer NOT NULL,
                "movie_id" integer,
                "user_id" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movies" (
                "movie_id" integer PRIMARY KEY NOT NULL,
                "movie_name" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "pseudo" varchar NOT NULL,
                "birthdate" varchar NOT NULL,
                "password" varchar NOT NULL,
                "salt" varchar NOT NULL,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "note" integer NOT NULL,
                "movie_id" integer,
                "user_id" integer,
                CONSTRAINT "FK_7cd2497f6e6160d6576755a8f16" FOREIGN KEY ("movie_id") REFERENCES "movies" ("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_69746f362d6a94e48c90f8f4bbc" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_user"("id", "note", "movie_id", "user_id")
            SELECT "id",
                "note",
                "movie_id",
                "user_id"
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
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "note" integer NOT NULL,
                "movie_id" integer,
                "user_id" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_user"("id", "note", "movie_id", "user_id")
            SELECT "id",
                "note",
                "movie_id",
                "user_id"
            FROM "temporary_movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "movies"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_user"
        `);
    }
}
