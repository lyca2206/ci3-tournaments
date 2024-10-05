import { Group } from "src/group/entities/group.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('match')
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Match, match => match.next)
    next: Match

    @ManyToOne(() => Tournament, tournament => tournament.matches)
    tournament: Tournament

    @ManyToOne(() => Group, group => group.wonMatches)
    winnerGroup: Group

    @ManyToMany(() => Group, group => group.matches)
    groups: Group[]
}