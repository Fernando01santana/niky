import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class insertForegnKey1663993288124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'student',
            new TableForeignKey({
                columnNames: ['address'],
                referencedTableName: 'address',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
