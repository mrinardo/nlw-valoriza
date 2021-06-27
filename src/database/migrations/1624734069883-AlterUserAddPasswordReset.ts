import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddPasswordReset1624734069883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "users",
            [
                new TableColumn({
                    name: "reset_password_token",
                    type: "varchar",
                    isNullable: true
                }),
                new TableColumn({
                    name: "reset_password_expires_at",
                    type: "timestamp",
                    isNullable: true
                }),
                new TableColumn({
                    name: "reset_password_token_used",
                    type: "boolean",
                    default: false
                })
            ]

        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "reset_password_token");
        await queryRunner.dropColumn("users", "reset_password_expires_at");
        await queryRunner.dropColumn("users", "reset_password_token_used");
    }

}
