import { Test, TestingModule } from '@nestjs/testing';
import { ProduitPanierController } from './produit-panier.controller';
import { ProduitPanierService } from './produit-panier.service';

describe('ProduitPanierController', () => {
  let controller: ProduitPanierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduitPanierController],
      providers: [
        {
          provide: ProduitPanierService,
          useValue: {
            produitPanier: jest.fn(),
            produitPaniers: jest.fn(),
            cree: jest.fn(),
            supprime: jest.fn(),
            modifie: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProduitPanierController>(ProduitPanierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
