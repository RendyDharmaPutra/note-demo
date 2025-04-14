import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { NoteDto } from './note.dto';
import { CommonException } from 'src/common/exception/common_exception';
import { unhandledError } from 'src/common/exception/unhandled_exception';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}

  async findNotes(): Promise<Note[]> {
    try {
      return this.repository.find();
    } catch (error) {
      throw unhandledError('mendapatkan Catatan', error);
    }
  }

  async findNote(id: number): Promise<Note> {
    try {
      const note = await this.repository.findOne({ where: { id } });

      if (!note)
        throw new CommonException(
          'Gagal mendapatkan Catatan',
          'Catatan tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );

      return note;
    } catch (error) {
      if (error instanceof CommonException) throw error;

      throw unhandledError('mendapatkan Catatan', error);
    }
  }

  async saveNote(noteDto: NoteDto): Promise<void> {
    try {
      const note = this.repository.create(noteDto);

      const result = await this.repository.insert(note);

      if (result.identifiers.length < 1)
        throw new CommonException(
          'Gagal menambahkan Catatan',
          'Catatan tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
    } catch (error) {
      if (error instanceof CommonException) throw error;

      throw unhandledError('menambahkan Catatan', error);
    }
  }

  async editNote(id: number, noteDto: NoteDto): Promise<void> {
    try {
      const result = await this.repository.update(id, noteDto);

      if (result.affected === 0)
        throw new CommonException(
          'Gagal mengubah Catatan',
          'Catatan tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
    } catch (error) {
      if (error instanceof CommonException) throw error;

      throw unhandledError('mengubah Catatan', error);
    }
  }

  async removeNote(id: number): Promise<void> {
    try {
      const result = await this.repository.delete(id);

      if (result.affected === 0)
        throw new CommonException(
          'Gagal menghapus Catatan',
          'Catatan tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
    } catch (error) {
      if (error instanceof CommonException) throw error;

      throw unhandledError('menghapus Catatan', error);
    }
  }
}
