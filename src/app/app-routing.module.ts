import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaLoaderService,
  RecaptchaModule,
  RecaptchaFormsModule
} from 'ng-recaptcha';

import { EvalComponentModule } from 'projects/eval-component/src/public_api';
//import { EvalComponentModule } from 'eval-component';

//Layouts
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

//Shared components
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ListRepliesComponent } from './components/list-replies/list-replies.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

//Routed pages
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { WpPageComponent } from './pages/wp-page/wp-page.component';
import { WpPostComponent } from './pages/wp-post/wp-post.component';
import { WpListPostsComponent } from './pages/wp-list-posts/wp-list-posts.component';

//WpResolver service which retrieves the data from Wordpress REST endpoints
import { WpResolver } from './services/wp-resolver.service';
import { generateTitle } from './services/head.service';

//Route definitions
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { pages: WpResolver },
    //Data is passed to the WpResolver and component itself, check WpResolver
    //  for more info
    data: {
      title: generateTitle('Home'),
      url: 'pages',
      setParams: {
        _embed: 1,
        slug: 'angular-test'
      },
      cache: true
    }
  },
  {
    path: 'blog',
    component: WpListPostsComponent,
    resolve: { posts: WpResolver },
    data: {
      url: 'posts',
      setParams: {
        _embed: 1,
        categories: 13
      },
      cache: true,
      title: generateTitle('Blog')
    }
  },
  {
    path: 'services',
    component: WpPageComponent,
    resolve: { pages: WpResolver },
    data: {
      url: 'pages',
      setParams: {
        _embed: 1,
        slug: 'services'
      }
    }
  },
  {
    path: 'contact',
    component: WpPageComponent,
    resolve: { pages: WpResolver },
    data: {
      url: 'pages',
      setParams: {
        _embed: 1,
        slug: 'contact'
      }
    }
  },
  {
    path: 'page/:slug',
    component: WpPageComponent,
    resolve: { pages: WpResolver },
    data: {
      url: 'pages',
      setParams: {
        _embed: 1
      },
      paramMap: {
        slug: 'slug'
      }
    }
  },
  {
    path: 'post/:slug',
    component: WpPostComponent,
    resolve: { posts: WpResolver },
    data: {
      url: 'posts',
      setParams: {
        _embed: 1
      },
      paramMap: {
        slug: 'slug'
      }
    }
  },
  {
    path: 'projects',
    component: WpListPostsComponent,
    resolve: { posts: WpResolver },
    data: {
      url: 'posts',
      setParams: {
        _embed: 1,
        categories: 3
      },
      cache: true,
      title: generateTitle('Projects')
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HeaderComponent, outlet: 'header' },
  { path: '', component: FooterComponent, outlet: 'footer' },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: generateTitle('404 Not Found') }
  }
];

const recaptchaSettings: RecaptchaSettings = {
  siteKey: '6LeZ2WIUAAAAAKgvioAJEOl5gxwGMP8vQitPSVz-'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule,
    EvalComponentModule,
    MDBBootstrapModule,
    RouterModule.forRoot(routes),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  exports: [RouterModule, FormsModule],
  declarations: [
    AuthenticationComponent,
    LoadingSpinnerComponent,
    UserListComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WpPageComponent,
    ListRepliesComponent,
    NotFoundComponent,
    WpPostComponent,
    WpListPostsComponent,
    ContactFormComponent
  ],
  providers: [
    WpResolver,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: recaptchaSettings
    }
  ],
  schemas: [
    /*NO_ERRORS_SCHEMA*/
  ]
})
export class AppRoutingModule {}
