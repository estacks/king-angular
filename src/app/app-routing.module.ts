import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { EvalComponentModule } from 'projects/eval-component/src/public_api';
//import { EvalComponentModule } from 'eval-component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Layouts
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

//Shared components
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { ListRepliesComponent } from './components/list-replies/list-replies.component';

//Routed pages
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { WpPageComponent } from './pages/wp-page/wp-page.component';
import { WpPageResolver } from './pages/wp-page/wp-page-resolver.service';
import { WpPostComponent } from './pages/wp-post/wp-post.component';
import { WpPostResolver } from './pages/wp-post/wp-post-resolver.service';
import { WpListPostsComponent } from './pages/wp-list-posts/wp-list-posts.component';
import { WpListPostsResolver } from './pages/wp-list-posts/wp-list-posts-resolver.service';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'blog', component: WpListPostsComponent,  resolve: { posts: WpListPostsResolver }},
    { path: 'page/:slug', component: WpPageComponent, resolve: { pages: WpPageResolver } },
    { path: 'post/:slug', component: WpPostComponent, resolve: { posts: WpPostResolver } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: HeaderComponent, outlet: 'header' },
    { path: '', component: FooterComponent, outlet: 'footer' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollToModule,
    NgbModule,
    EvalComponentModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    AuthenticationComponent,
    UserListComponent,
    PostNewComponent,
  ],
  declarations: [
    AuthenticationComponent,
    UserListComponent,
    PostNewComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WpPageComponent,
    ListRepliesComponent,
    NotFoundComponent,
    WpPostComponent,
    WpListPostsComponent
  ],
  providers: [
    WpPageResolver,
    WpPostResolver,
    WpListPostsResolver
  ]
})
export class AppRoutingModule { }
