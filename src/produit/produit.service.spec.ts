import { Test, TestingModule } from '@nestjs/testing';
import { ProduitService } from './produit.service';
import { PrismaService } from '../prisma.service';

describe('ProduitService', () => {
  let service: ProduitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProduitService,
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

    service = module.get<ProduitService>(ProduitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
