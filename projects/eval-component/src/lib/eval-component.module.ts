import { NgModule, Injector, COMPILER_OPTIONS, Compiler, CompilerFactory } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { JitCompiler } from '@angular/compiler';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { EvalComponentComponent } from './eval-component.component';

// https://github.com/angular/angular/issues/15510#issuecomment-294860905
export function createJitCompiler (compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  imports: [BrowserModule],
  declarations: [EvalComponentComponent],
  exports: [EvalComponentComponent],
  entryComponents: [EvalComponentComponent],
  providers: [
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createJitCompiler, deps: [CompilerFactory]}
  ]
})
export class EvalComponentModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const customElement = createCustomElement(EvalComponentComponent, { injector: this.injector });
    customElements.define('eval-component', customElement);
  }
}
