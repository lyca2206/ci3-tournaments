import { Group } from "src/group/entities/group.entity";
import { Match } from "src/match/entities/match.entity";
import { User } from "src/user/entities/user.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Tournament {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    name: string

    @Column('text', { nullable: true })
    description: string

    @OneToMany(() => Match, match => match.tournament)
    matches: Match[]

    @ManyToOne(() => User, user => user.createdTournaments)
    creator: User

    @OneToMany(() => Group, group => group.tournament)
    groups: Group[]
}