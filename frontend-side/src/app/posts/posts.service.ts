import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(): any {
    this.http
      .get<{ message: string; data: Post[]; code: number }>(
        'http://localhost:3000/api/v1/post/post-list'
      )
      .subscribe((postData) => {
        this.posts = postData.data;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(): any {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string): any {
    const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string; data: Post[]; code: number }>(
        'http://localhost:3000/api/v1/post/post-create',
        post
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
  }
}
