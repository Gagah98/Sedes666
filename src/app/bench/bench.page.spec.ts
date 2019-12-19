import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BenchPage } from './bench.page';

describe('BenchPage', () => {
  let component: BenchPage;
  let fixture: ComponentFixture<BenchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BenchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
