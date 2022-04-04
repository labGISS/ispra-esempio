import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataSearchResultItemComponent } from './metadata-search-result-item.component';

describe('MetadataSearchResultItemComponent', () => {
  let component: MetadataSearchResultItemComponent;
  let fixture: ComponentFixture<MetadataSearchResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataSearchResultItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataSearchResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
