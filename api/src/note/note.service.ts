import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.repository.find();
  }
}
