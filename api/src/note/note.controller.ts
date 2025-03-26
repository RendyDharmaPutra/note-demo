import { Controller, Get } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  getAllNotes() {
    return this.service.findAll();
  }
}
