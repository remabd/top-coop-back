import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';

describe('ParticipationController', () => {
  let controller: ParticipationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationController],
      providers: [
        {
          provide: ParticipationService,
          useValue: {
            participation: jest.fn(),
            participations: jest.fn(),
            cree: jest.fn(),
            supprime: jest.fn(),
            modifie: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ParticipationController>(ParticipationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
