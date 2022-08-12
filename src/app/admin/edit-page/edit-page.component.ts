import { AlertService } from './../shared/services/alert.service';
import { Post } from 'src/app/shared/dto/form.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './../../shared/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  post!: Post;
  pSub!: Subscription;
  submited = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getPost(params['id']);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.form = this.fb.group({
          title: [post.title, [Validators.required]],
          text: [post.text, [Validators.required]],
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submited = true;

    this.pSub = this.postService
      .update({
        ...this.post,
        title: this.form.value.title,
        text: this.form.value.text,
      })
      .subscribe(() => {
        this.submited = false;
        this.alert.warning('Пост был изменен');
        this.router.navigate(['/admin', 'dashboard']);
      });
  }
}
