import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'NO CONTENT';

  onAddPost(): any {
    this.newPost = this.enteredValue;
  }
}
