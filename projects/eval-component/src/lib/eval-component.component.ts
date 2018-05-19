import {
  Component,
  Input,
  AfterViewInit,
  Compiler,
  COMPILER_OPTIONS,
  CompilerFactory,
  OnDestroy,
  OnChanges,
  NgModule,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JitCompiler } from '@angular/compiler';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

// https://github.com/angular/angular/issues/15510#issuecomment-294860905
export function createJitCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@Component({
  selector: 'eval-component',
  template: `
    <ng-template #container></ng-template>
  `,
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS]
    },
    {
      provide: Compiler,
      useFactory: createJitCompiler,
      deps: [CompilerFactory]
    }
  ]
})
export class EvalComponentComponent
  implements AfterViewInit, OnDestroy, OnChanges {
  @Input() template: string;
  @Input() componentDecorator: any = {};
  @Input() componentClass: any = class {};
  @Input() data: any = {};
  @Input()
  moduleDecorator: any = {
    imports: [CommonModule]
  };
  @Input() moduleClass: any = class {};
  @ViewChild('container', {
    read: ViewContainerRef
  })
  container: ViewContainerRef;

  cmpRef: any;

  constructor(private compiler: Compiler) {}

  ngAfterViewInit() {
    this.componentDecorator.template = this.template;

    let DynamicComponent = CreateComponent(
      this.template,
      this.componentClass,
      this.componentDecorator
    );
    let DynamicModule = CreateNgModule(
      DynamicComponent,
      this.moduleClass,
      this.moduleDecorator
    );

    this.compiler
      .compileModuleAndAllComponentsAsync(DynamicModule)
      .then(factories => {
        this.container.clear();
        const f: any = factories.componentFactories[0];
        this.cleanupComponent();
        this.cmpRef = this.container.createComponent(f);
        this.updateData();
      });
  }

  ngOnDestroy() {
    this.cleanupComponent();
  }

  cleanupComponent() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
      this.cmpRef = undefined;
    }
  }

  ngOnChanges(changes) {
    if (changes['data']) {
      this.updateData();
    }
  }

  updateData() {
    if (this.cmpRef && this.cmpRef.instance) {
      this.cmpRef.instance = Object.assign(this.cmpRef.instance, this.data);
    }
  }
}

export function CreateComponent(
  template: string,
  initClass: any,
  decorator: any
) {
  class CustomDynamicComponent extends initClass {}

  CustomDynamicComponent['decorators'] = [
    {
      type: Component,
      args: [Object.assign(decorator, { template: template })]
    }
  ];

  return CustomDynamicComponent;
}

export function CreateNgModule(component: any, initClass: any, decorator: any) {
  class CustomDynamicModule extends initClass {}

  CustomDynamicModule['decorators'] = [
    {
      type: NgModule,
      args: [
        Object.assign(decorator, {
          declarations: [component],
          exports: [component]
        })
      ]
    }
  ];

  return CustomDynamicModule;
}
