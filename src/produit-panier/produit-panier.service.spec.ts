import { Test, TestingModule } from '@nestjs/testing';
import { ProduitPanierService } from './produit-panier.service';
import { PrismaService } from '../prisma.service';

describe('ProduitPanierService', () => {
  let service: ProduitPanierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProduitPanierService,
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

    service = module.get<ProduitPanierService>(ProduitPanierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
