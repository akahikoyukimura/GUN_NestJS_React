import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { generateId } from '../common/utils/generate-id.util';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    const users = await this.userRepository.findAll();

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.pass, 10);

    const now = new Date();

    const user: User = {
      id: generateId(users),

      email: createUserDto.email,
      pass: hashedPassword,
      name: createUserDto.name,
      role: createUserDto.role,

      isActive: true,
      emailVerified: false,
      failedLoginAttempts: 0,
      lockedUntil: null,

      createdAt: now,
      updatedAt: now,
    };

    return this.userRepository.save(user);
  }
}
