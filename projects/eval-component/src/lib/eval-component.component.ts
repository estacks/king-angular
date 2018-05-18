import { Component, HostListener, Input, NgModuleRef, Compiler, Injector, AfterViewInit, OnDestroy, OnChanges, NgModule, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
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
    private _injector: Injector,
    private _compiler: Compiler
  ) {

  }

  ngAfterViewInit() {
    if (!this.template) return false;

    this.container.clear();

    console.log('Beginning compile', this.container, this.data);

    this.componentDecorator.template = this.template;
    const tmpCmp = Component(this.componentDecorator)(this.componentClass);

    this.moduleDecorator.declarations = [ tmpCmp ];
    const tmpModule = NgModule(this.moduleDecorator)(this.moduleClass);

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        this.cleanupComponent();
        this.cmpRef = this.container.createComponent(f);//f.create(this._injector, [], null, this._m);
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
