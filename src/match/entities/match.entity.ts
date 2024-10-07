import { Group } from "src/group/entities/group.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('match')
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Match, match => match.next, { nullable: true })
    predecessors: Match[]

    @ManyToOne(() => Match, match => match.predecessors, { nullable: true })
    next: Match

    @ManyToOne(() => Tournament, tournament => tournament.matches)
    tournament: Tournament

    @ManyToOne(() => Group, group => group.wonMatches, { nullable: true })
    winnerGroup: Group

    @ManyToMany(() => Group, group => group.matches)
    @JoinTable()
    groups: Group[]

    @DeleteDateColumn()
    deletedAt?: Date
}