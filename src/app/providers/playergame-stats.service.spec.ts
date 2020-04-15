import { TestBed } from '@angular/core/testing';

import { PlayergameStatsService } from './playergame-stats.service';

describe('PlayergameStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayergameStatsService = TestBed.get(PlayergameStatsService);
    expect(service).toBeTruthy();
  });
});
