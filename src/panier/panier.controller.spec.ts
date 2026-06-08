import { Test, TestingModule } from '@nestjs/testing';
import { PanierController } from './panier.controller';
import { PanierService } from './panier.service';

describe('PanierController', () => {
  let controller: PanierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanierController],
      providers: [
        {
          provide: PanierService,
          useValue: {
            panier: jest.fn(),
            paniers: jest.fn(),
            cree: jest.fn(),
            supprime: jest.fn(),
            modifie: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PanierController>(PanierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
