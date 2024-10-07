import { Match } from "../../match/entities/match.entity";
import { Tournament } from "../../tournament/entities/tournament.entity";
import { User } from "../../user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('group')
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    name: string

    @Column('integer')
    seeding: number

    @ManyToMany(() => Match, match => match.groups)
    matches: Match[]

    @OneToMany(() => Match, match => match.winnerGroup)
    wonMatches: Match[]

    @ManyToOne(() => Tournament, tournament => tournament.groups)
    tournament: Tournament

    @ManyToMany(() => User, user => user.groups)
    members: User[]

    @DeleteDateColumn()
    deletedAt?: Date
}