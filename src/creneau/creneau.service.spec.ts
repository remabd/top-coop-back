import { Test, TestingModule } from '@nestjs/testing';
import { CreneauService } from './creneau.service';
import { PrismaService } from '../prisma.service';

describe('CreneauService', () => {
  let service: CreneauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreneauService,
        {
          provide: PrismaService,
          useValue: {
            findUniqueOrThrow: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreneauService>(CreneauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
