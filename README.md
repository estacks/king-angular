# King Angular

This is the Angular 6 + Wordpress integrated theme that I created for my personal website. The front page is hard-coded to minimize load time, but the theme includes resolvers to interface with the Wordpress REST API and a small Angular library, eval-component, that can generate dynamic components on the fly from any template string. This allows Angular templates to be written directly in Wordpress, without having to be hard coded and compiled. As far as I know there are NO existing Angular + Wordpress solutions like this and dynamic component generation of this nature is also a pretty rare subject.

The Wordpress side is spartan, purely to fit my needs, and includes a couple custom REST hooks to handle things like email and contact forms. The Wordpress Plugin `Better Rest API Featured Images` is necessary for featured images on posts to work correctly: https://wordpress.org/plugins/better-rest-api-featured-images/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. The `dist/king-angular` folder is the full theme build including PHP files. `index.html` needs to be updated after builds with the links to the CSS and script files being populated with the proper path, such as: `wp-content/themes/king-angular/script.[hash].js`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
