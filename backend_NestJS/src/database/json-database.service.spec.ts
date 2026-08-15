import { Test, TestingModule } from '@nestjs/testing';
import { JsonDatabaseService } from './json-database.service';

describe('JsonDatabaseService', () => {
  let service: JsonDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonDatabaseService],
    }).compile();

    service = module.get<JsonDatabaseService>(JsonDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
