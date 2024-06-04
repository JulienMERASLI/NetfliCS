import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717505152959 {
    name = ' $npmConfigName1717505152959'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "status" integer NOT NULL,
                "note" integer NOT NULL,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "averageRating" integer NOT NULL,
                "category" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "pseudo" varchar NOT NULL,
                "birthdate" varchar NOT NULL,
                "password" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_user"
        `);
    }
}
