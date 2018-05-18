import {
  Component,
  HostListener,
  Input,
  NgModuleRef,
  AfterViewInit,
  Compiler,
  OnDestroy,
  OnChanges,
  NgModule,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eval-component',
  template: `
    <ng-template #container></ng-template>
  `,
  styles: []
})
export class EvalComponentComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() template: string;
  @Input() componentDecorator: any = {};
  @Input() componentClass: any = class {};
  @Input() data: any = {};
  @Input() moduleDecorator: any = {
    imports: [CommonModule]
  };
  @Input() moduleClass: any = class {};
  @ViewChild('container', {
    read: ViewContainerRef
  }) container: ViewContainerRef;

  cmpRef: any;

  constructor(
    private _m: NgModuleRef<any>,
    private _compiler: Compiler,
    private _resolver: ComponentFactoryResolver
  ) {

  }

  ngAfterViewInit() {
    if (!this.template) return false;

    this.container.clear();

    console.log('Beginning compile', this, NgModule);

    this.componentDecorator.template = this.template;


    let DynamicType:any = CustomComponent(this.template);
    let DynamicModule = CustomNgModule(DynamicType);

    this._compiler.compileModuleAndAllComponentsAsync(DynamicModule)
      .then((factories) => {
        const f:any = factories.componentFactories[0];
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

export function CustomComponent(template: string) {
  class CustomDynamicComponent {}
  CustomDynamicComponent['decorators'] = [{
    type: Component,
    args: [{
      selector: 'dynamic-component',
      template: template
    }]
  }];

  return CustomDynamicComponent;
}

export function CustomNgModule(component: any) {
  class CustomDynamicModule {};
  CustomDynamicModule['decorators'] = [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [component],
      exports: [component]
    }]
  }];

  return CustomDynamicModule;
}
