import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class JsonDatabaseService {

  private readonly dataPath = join(process.cwd(), 'data');

  async read<T>(fileName: string): Promise<T[]> {
    const filePath = join(this.dataPath, fileName);

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async write<T>(fileName: string, data: T[]): Promise<void> {
    const filePath = join(this.dataPath, fileName);

    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      'utf-8',
    );
  }
}