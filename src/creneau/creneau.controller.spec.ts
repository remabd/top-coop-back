import { Test, TestingModule } from '@nestjs/testing';
import { CreneauController } from './creneau.controller';
import { CreneauService } from './creneau.service';

describe('CreneauController', () => {
  let controller: CreneauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreneauController],
      providers: [
        {
          provide: CreneauService,
          useValue: {
            creneau: jest.fn(),
            creneaux: jest.fn(),
            creeCreneau: jest.fn(),
            supprimeCreneau: jest.fn(),
            modifieCreneau: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreneauController>(CreneauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
