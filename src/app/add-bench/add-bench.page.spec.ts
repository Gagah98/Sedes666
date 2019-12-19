import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBenchPage } from './add-bench.page';

describe('AddBenchPage', () => {
  let component: AddBenchPage;
  let fixture: ComponentFixture<AddBenchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBenchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBenchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
