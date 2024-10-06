import { Group } from "src/group/entities/group.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column('text', { unique: true })
    username: string

    @Column('text', { select: false })
    password: string

    @OneToMany(() => Tournament, tournament => tournament.creator)
    createdTournaments: Tournament[]

    @ManyToMany(() => Group, group => group.members)
    groups: Group[]
    
    @BeforeInsert()
    convertToLowerCase(): void { this.username = this.username.toLowerCase() }

    @BeforeUpdate()
    beforeUpdate(): void { this.convertToLowerCase() }

    @DeleteDateColumn()
    deletedAt?: Date
}