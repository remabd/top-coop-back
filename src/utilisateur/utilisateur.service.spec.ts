import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurService } from './utilisateur.service';
import { PrismaService } from '../prisma.service';

describe('UtilisateurService', () => {
  let service: UtilisateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilisateurService,
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

    service = module.get<UtilisateurService>(UtilisateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
