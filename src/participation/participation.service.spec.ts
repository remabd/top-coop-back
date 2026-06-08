import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationService } from './participation.service';
import { PrismaService } from '../prisma.service';

describe('ParticipationService', () => {
  let service: ParticipationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipationService,
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

    service = module.get<ParticipationService>(ParticipationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
