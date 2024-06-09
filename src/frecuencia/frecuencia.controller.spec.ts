import { Test, TestingModule } from '@nestjs/testing';
import { FrecuenciaController } from './frecuencia.controller';

describe('FrecuenciaController', () => {
  let controller: FrecuenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrecuenciaController],
    }).compile();

    controller = module.get<FrecuenciaController>(FrecuenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
