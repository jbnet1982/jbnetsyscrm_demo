import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormComponentComponent } from './company-form.component';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponentComponent;
  let fixture: ComponentFixture<CompanyFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
