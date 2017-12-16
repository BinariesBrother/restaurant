import { TestBed, inject } from '@angular/core/testing';

import { SheetWrapperService } from './sheet-wrapper.service';

describe('SheetWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetWrapperService]
    });
  });

  it('should be created', inject([SheetWrapperService], (service: SheetWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
