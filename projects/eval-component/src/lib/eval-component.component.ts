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
  NO_ERRORS_SCHEMA,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eval-component',
  template: `
    <ng-template #container></ng-template>
  `,
  styles: []
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
  @Input() imports: any = [CommonModule];
  @ViewChild('container', {
    read: ViewContainerRef
  })
  container: ViewContainerRef;

  cmpRef: any;

  constructor(
    private _m: NgModuleRef<any>,
    private _compiler: Compiler,
    private _resolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit() {
    if (!this.template) return false;
    console.log('IMPORTS INIT', this.imports);

    this.container.clear();

    console.log('Beginning compile', this, NgModule);

    this.componentDecorator.template = this.template;

    let DynamicType = CustomComponent(this.template);
    let DynamicModule = CustomNgModule(DynamicType, this.imports);

    this._compiler
      .compileModuleAndAllComponentsAsync(DynamicModule)
      .then(factories => {
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

export function CustomComponent(template: string) {
  @Component({
    selector: 'dynamic-component',
    template: template
  })
  class CustomDynamicComponent {}

  return CustomDynamicComponent;
}

export function CustomNgModule(component: any, imports: Array<any>) {
  @NgModule({
    imports: imports,
    declarations: [component],
    exports: [component],
    schemas: [NO_ERRORS_SCHEMA]
  })
  class CustomDynamicModule {}

  return CustomDynamicModule;
}
