export class User {
  id!: number;
  email!: string;
  pass!: string;
  name!: string;
  role!: string;
  isActive!: boolean;
  emailVerified!: boolean;
  failedLoginAttempts!: number;
  lockedUntil!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}