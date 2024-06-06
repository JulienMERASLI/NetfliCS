import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717659719756 {
    name = ' $npmConfigName1717659719756'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "note" integer NOT NULL,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_user"("movie_id", "user_id", "note")
            SELECT "movie_id",
                "user_id",
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
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_user"("movie_id", "user_id", "note")
            SELECT "movie_id",
                "user_id",
                "note"
            FROM "temporary_movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_user"
        `);
    }
}
