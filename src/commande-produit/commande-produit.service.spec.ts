import { Test, TestingModule } from '@nestjs/testing';
import { CommandeProduitService } from './commande-produit.service';
import { PrismaService } from '../prisma.service';

describe('CommandeProduitService', () => {
  let service: CommandeProduitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandeProduitService,
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

    service = module.get<CommandeProduitService>(CommandeProduitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
