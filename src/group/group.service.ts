import { Injectable, NotFoundException } from '@nestjs/common';
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

    return this.groupRepository.save(newGroup);
  }

  // Método para obtener un grupo por su ID
  async getGroupByID(id: string): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id }, relations: ['tournament', 'members', 'matches'] });
    
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  // Método para obtener todos los grupos de un torneo específico
  async getGroupsByTournamentID(tournamentId: string): Promise<Group[]> {
    const tournament = await this.tournamentRepository.findOne({ where: { id: tournamentId }, relations: ['groups'] });
    
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    return tournament.groups;
  }

  // Método para actualizar un grupo
  async updateGroup(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    // Actualizar los campos que se necesiten
    Object.assign(group, updateGroupDto);

    return this.groupRepository.save(group);
  }

  // Método para eliminar un grupo lógicamente (soft delete)
  async softDeleteGroup(id: string): Promise<void> {
    const group = await this.groupRepository.findOne({ where: { id } });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    await this.groupRepository.softDelete(id);
  }
}
