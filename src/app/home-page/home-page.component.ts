import { Observable } from 'rxjs';
import { PostService } from './../shared/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/dto/form.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<Post[]>

  constructor(private posts: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.posts.getAll()
  }

}
