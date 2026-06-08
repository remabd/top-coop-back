import { Test, TestingModule } from '@nestjs/testing';
import { PanierService } from './panier.service';
import { PrismaService } from '../prisma.service';

describe('PanierService', () => {
  let service: PanierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PanierService,
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

    service = module.get<PanierService>(PanierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
