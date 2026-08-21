import { Injectable } from '@nestjs/common';
import { JsonDatabaseService } from '../database/json-database.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly fileName = 'users.json';

  constructor(private readonly db: JsonDatabaseService) {}

  async findAll(): Promise<User[]> {
    return this.db.read<User>(this.fileName);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const users = await this.findAll();

    return users.find((user) => user.email === email);
  }

  async save(user: User): Promise<User> {
    const users = await this.findAll();

    users.push(user);

    await this.db.write(this.fileName, users);

    return user;
  }
}
