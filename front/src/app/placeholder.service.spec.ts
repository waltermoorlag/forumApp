/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaceholderService } from './placeholder.service';

describe('PlaceholderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceholderService]
    });
  });

  it('should ...', inject([PlaceholderService], (service: PlaceholderService) => {
    expect(service).toBeTruthy();
  }));
});
