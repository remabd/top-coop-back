import { Test, TestingModule } from '@nestjs/testing';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';

describe('ProduitController', () => {
  let controller: ProduitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduitController],
      providers: [
        {
          provide: ProduitService,
          useValue: {
            produit: jest.fn(),
            produits: jest.fn(),
            cree: jest.fn(),
            supprime: jest.fn(),
            modifie: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProduitController>(ProduitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
