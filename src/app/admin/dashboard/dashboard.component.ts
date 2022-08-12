import { AlertService } from './../shared/services/alert.service';
import { Post } from 'src/app/shared/dto/form.interface';
import { PostService } from './../../shared/services/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  posts!: Post[];
  pSub!: Subscription;
  dSub!: Subscription;
  searchText = '';

  constructor(private postService: PostService, private alert: AlertService) {}

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe((res) => {
      this.posts = res;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.alert.danger('Пост был удален');
    });
  }
}
