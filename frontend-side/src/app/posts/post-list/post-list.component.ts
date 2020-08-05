import { Component, Input } from '@angular/core';

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

  @Input() posts = [];
}
