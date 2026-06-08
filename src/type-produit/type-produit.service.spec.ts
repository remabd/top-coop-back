import { Test, TestingModule } from '@nestjs/testing';
import { TypeProduitService } from './type-produit.service';
import { PrismaService } from '../prisma.service';

describe('TypeProduitService', () => {
  let service: TypeProduitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeProduitService,
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

    service = module.get<TypeProduitService>(TypeProduitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
