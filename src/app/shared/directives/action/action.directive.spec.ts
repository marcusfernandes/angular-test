import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionDirective } from './action.directive';
import { ActionModule } from './action.module';
describe(ActionDirective.name, () => {

  let fixture: ComponentFixture<ActionDirectiveTestComponent> = null;
  let component: ActionDirectiveTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[ActionDirectiveTestComponent],
      imports:[ActionModule]
    }).compileComponents();


    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;

  });


  it(`(D) (@Output appAction) sould emit event with payload  when ENTER key is pressed`, () => {
    //const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');

    const divEl = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;

    const event = new KeyboardEvent('keyup', {key:'Enter'});

    divEl.dispatchEvent(event);

    expect(component.hasEvent()).toBe(true)
  })


  it(`(D) (@Output appAction) sould emit event with payload when clicked`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');

    divEl.click();

    expect(component.hasEvent()).toBe(true)
  });


})

@Component({
  template:`<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
  private event: Event = null;

  actionHandler(event: Event) :void {
    this.event = event;
  }

  hasEvent(): boolean{
    return !!this.event;
  }

}
