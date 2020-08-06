import { Component, Input } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   {title: 'First post', content: 'ahha hahhaha hahahah'},
  //   {title: 'Second post', content: 'ahha hahhaha hahahah'},
  //   {title: 'Third post', content: 'ahha hahhaha hahahah'}
  // ];

  @Input() posts: Post[] = [];
}
