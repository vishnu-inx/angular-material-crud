import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
    },
    {
        path: 'create-user',
        component: AddUserComponent
    },
    {
        path: 'edit-user/:id',
        component: EditUserComponent,
    },
    {
        path: 'post/:id',
        component: PostsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
