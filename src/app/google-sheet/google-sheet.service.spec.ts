import { TestBed, inject } from '@angular/core/testing';

import { GoogleSheetService } from './google-sheet.service';

describe('GoogleSheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleSheetService]
    });
  });

  it('should be created', inject([GoogleSheetService], (service: GoogleSheetService) => {
    expect(service).toBeTruthy();
  }));
});
