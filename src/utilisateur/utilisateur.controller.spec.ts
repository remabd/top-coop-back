import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';

describe('UtilisateurController', () => {
  let controller: UtilisateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilisateurController],
      providers: [
        {
          provide: UtilisateurService,
          useValue: {
            utilisateur: jest.fn(),
            utilisateurs: jest.fn(),
            cree: jest.fn(),
            supprime: jest.fn(),
            modifie: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UtilisateurController>(UtilisateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
