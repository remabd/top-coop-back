import { Test, TestingModule } from '@nestjs/testing';
import { CommandeService } from './commande.service';
import { PrismaService } from '../prisma.service';

describe('CommandeService', () => {
  let service: CommandeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandeService,
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

    service = module.get<CommandeService>(CommandeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
