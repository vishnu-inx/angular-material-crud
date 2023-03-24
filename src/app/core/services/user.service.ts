import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Post } from '../interfaces/post';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public userId = new BehaviorSubject<string>('');

    constructor(private httpClient: HttpClient) { }

    // User

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>('http://localhost:3000/users');
    }

    getUserById(id: any): Observable<User[]> {
        return this.httpClient.get<User[]>(`http://localhost:3000/users/${id}`);
    }

    createUser(payload: User) {
        return this.httpClient.post<User>('http://localhost:3000/users', payload);
    }

    updateUser(payload: User): Observable<User> {
        return this.httpClient.put<User>(
            `http://localhost:3000/users/${payload.id}`,
            payload
        );
    }

    delete(id: any) {
        return this.httpClient.delete(`http://localhost:3000/users/${id}`);
    }

    // Posts

    getAllPost(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`http://localhost:3000/posts`);
    }

    createPost(payload: Post) {
        return this.httpClient.post<Post>('http://localhost:3000/posts', payload);
    }

    // Comments

    getAllComments(): Observable<any> {
        return this.httpClient.get<any>(`http://localhost:3000/comments`);
    }

    createComment(payload: any) {
        return this.httpClient.post<any>('http://localhost:3000/comments', payload);
    }

}
