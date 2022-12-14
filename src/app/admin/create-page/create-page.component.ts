import { Router } from '@angular/router';
import { AlertService } from './../shared/services/alert.service';
import { PostService } from './../../shared/services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/dto/form.interface';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private $post: PostService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]],
      author: [null, [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    };

    this.$post.create(post).subscribe(() => {
      this.form.reset();
      this.alert.success('Пост был создан');
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
