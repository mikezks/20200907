import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlComponent } from './graphql.component';

describe('GraphqlComponent', () => {
  let component: GraphqlComponent;
  let fixture: ComponentFixture<GraphqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
