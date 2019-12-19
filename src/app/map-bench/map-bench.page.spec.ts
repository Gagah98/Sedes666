import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapBenchPage } from './map-bench.page';

describe('MapBenchPage', () => {
  let component: MapBenchPage;
  let fixture: ComponentFixture<MapBenchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBenchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapBenchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
