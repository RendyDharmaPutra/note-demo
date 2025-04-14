import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from './note.dto';
import { Note } from './note.entity';
import { CustomParseIntPipe } from 'src/common/transform/parse_int_pipe';

@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  async getNotes(): Promise<SuccessResponseType<Note[]>> {
    const notes = await this.service.findNotes();

    return {
      success: true,
      message: 'Berhasil mendapatkan Catatan',
      data: {
        data: notes,
        length: notes.length,
      },
    };
  }

  @Get(':id')
  async getNote(
    @Param('id', new CustomParseIntPipe('mendapatkan Catatan')) id: number,
  ): Promise<SuccessResponseType<Note>> {
    const note = await this.service.findNote(id);

    return {
      success: true,
      message: 'Berhasil mendapatkan Catatan',
      data: note,
    };
  }

  @Post()
  async createNote(
    @Body() noteDto: NoteDto,
  ): Promise<SuccessResponseType<null>> {
    await this.service.saveNote(noteDto);

    return {
      success: true,
      message: 'Berhasil menambahkan Catatan',
      data: null,
    };
  }

  @Put(':id')
  async updateNote(
    @Param('id', new CustomParseIntPipe('mengubah Catatan')) id: number,
    @Body() noteDto: NoteDto,
  ): Promise<SuccessResponseType<null>> {
    await this.service.editNote(id, noteDto);

    return {
      success: true,
      message: 'Berhasil mengubah Catatan',
      data: null,
    };
  }

  @Delete(':id')
  async deleteNote(
    @Param('id', new CustomParseIntPipe('menghapus Catatan')) id: number,
  ) {
    await this.service.removeNote(id);

    return {
      success: true,
      message: 'Berhasil menghapus Catatan',
      data: null,
    };
  }
}
