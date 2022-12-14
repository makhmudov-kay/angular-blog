import { Post } from 'src/app/shared/dto/form.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input()
  post!: Post;
  
  constructor() {}

  ngOnInit(): void {}
}
