import { Group } from "../../group/entities/group.entity";
import { Match } from "../../match/entities/match.entity";
import { User } from "../../user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tournament')
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

    @DeleteDateColumn()
    deletedAt?: Date
}