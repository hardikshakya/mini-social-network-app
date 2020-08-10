import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(): any {
    this.http
      .get<{ message: string; data: any; code: number }>(
        'http://localhost:3000/api/v1/post/post-list'
      )
      .pipe(
        map((postData) => {
          return postData.data.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
              imagePath: post.imagePath,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(): any {
    return this.postUpdated.asObservable();
  }

  // Fetch Single Post Data
  getPost(id: string): any {
    return this.http.get<{ message: string; data: any; code: number }>(
      'http://localhost:3000/api/v1/post/post-data/' + id
    );
  }

  addPost(title: string, content: string, image: File): any {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; data: Post; code: number }>(
        'http://localhost:3000/api/v1/post/post-create',
        postData
      )
      .subscribe((responseData) => {
        const post: Post = {
          id: responseData.data.id,
          title,
          content,
          imagePath: responseData.data.imagePath,
        };
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string): any {
    const post: Post = { id, title, content, imagePath: null };
    this.http
      .put('http://localhost:3000/api/v1/post/post-update/' + id, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string): any {
    this.http
      .delete('http://localhost:3000/api/v1/post/post-delete/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }
}
