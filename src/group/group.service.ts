import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './DTO/create_group.dto';
import {  UpdateGroupDto } from './DTO/update_group.dto';
import { Tournament } from 'src/tournament/entities/tournament.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  // Método para crear un grupo
  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const { name, seeding, tournamentId } = createGroupDto;

    // Buscar el torneo relacionado
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId } });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    const newGroup = this.groupRepository.create({
      name,
      seeding,
      tournament,
    });

    return await this.groupRepository.save(newGroup);
  }

  // Método para obtener un grupo por su ID
  async getGroupByID(id: string) {
    try {
      const group = await this.groupRepository.findOne({ where: { id } });
      if (!group) { throw new NotFoundException }

      return group
  } catch (e) { this.handleException(e) }
  }

  // Método para obtener todos los grupos de un torneo específico
  async getGroupsByTournamentID(tournamentId: string): Promise<Group[]> {
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId }, relations: ['groups'] });
    
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    return tournament.groups;
  }

  // Método para obtener todos los grupos de un torneo específico
  async getGroupBySeed(tournamentId: string, seeding: number): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { seeding, tournament: { id: tournamentId } } });
    
    if (!group) {
      throw new NotFoundException
    }

    return group
  }

  async getGroupCount(tournamentId: string): Promise<number> {
    const count = await this.groupRepository.count({ where: { tournament: { id: tournamentId } } });
    
    if (!count) {
      throw new NotFoundException
    }

    return count
  }

  // Método para actualizar un grupo
  async updateGroup(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    // Actualizar los campos que se necesiten
    Object.assign(group, updateGroupDto);

    return await this.groupRepository.save(group);
  }

  // Método para eliminar un grupo lógicamente (soft delete)
  async softDeleteGroup(id: string): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    await this.groupRepository.softDelete(id);

    return group
  }

  private handleException(e: any) {
    if (e.code === "23505") { throw new BadRequestException("The group is not found.") }
    else if (e.code === "22P02") { throw new BadRequestException("The given ID isn't valid.") }
    else { throw e }
  }
}
