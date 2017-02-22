import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {Routes, RouterModule} from '@angular/router'
import { API_URL, PlaceholderService} from './placeholder.service';
import{store, AppStore} from './redux/store';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { FocusDirective } from './focus.directive';

const routes:Routes=[
{path:"", redirectTo:"posts", pathMatch:"full"},
{path:"posts", component : PostsComponent},
{path:"users", component: UserComponent},
{path:"profile", component: ProfileComponent},
{path:"login",component:LoginComponent},
{path:"post", component:PostComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ProfileComponent,
    PostComponent,
    PostsComponent,
    CommentsComponent,
    FocusDirective
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
    ],

  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy} ,{provide:AppStore, useValue:store},
  {provide: API_URL, useValue: API_URL},
  PlaceholderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
