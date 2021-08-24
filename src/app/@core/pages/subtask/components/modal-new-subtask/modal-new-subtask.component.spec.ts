import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewSubtaskComponent } from './modal-new-subtask.component';

describe('ModalNewSubtaskComponent', () => {
  let component: ModalNewSubtaskComponent;
  let fixture: ComponentFixture<ModalNewSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewSubtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
