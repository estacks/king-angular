import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { EvalComponentComponent } from './eval-component.component';


@NgModule({
  imports: [BrowserModule],
  declarations: [EvalComponentComponent],
  exports: [EvalComponentComponent],
  entryComponents: [EvalComponentComponent]
})
export class EvalComponentModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const customElement = createCustomElement(EvalComponentComponent, { injector: this.injector });
    customElements.define('eval-component', customElement);
  }
}
