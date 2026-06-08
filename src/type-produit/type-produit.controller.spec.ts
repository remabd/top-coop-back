import { Test, TestingModule } from '@nestjs/testing';
import { TypeProduitController } from './type-produit.controller';
import { TypeProduitService } from './type-produit.service';

describe('TypeProduitController', () => {
  let controller: TypeProduitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeProduitController],
      providers: [
        {
          provide: TypeProduitService,
          useValue: {
            typeProduit: jest.fn(),
            typeProduits: jest.fn(),
            cree: jest.fn(),
            supprime: jest.fn(),
            modifie: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TypeProduitController>(TypeProduitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
