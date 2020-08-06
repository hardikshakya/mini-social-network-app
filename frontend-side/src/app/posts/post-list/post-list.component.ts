import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First post', content: 'ahha hahhaha hahahah'},
  //   {title: 'Second post', content: 'ahha hahhaha hahahah'},
  //   {title: 'Third post', content: 'ahha hahhaha hahahah'}
  // ];

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.posts = this.postsService.getPosts();
    this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
