import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddPostComponent } from '../add-post/add-post.component';
import { Post } from 'src/app/core/interfaces/post';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    id: any;
    userPosts: any;
    commentId: any;
    userData: any;
    public commentForm!: FormGroup;
    submitted = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) {
        this.route.paramMap.subscribe((param) => {
            this.id = Number(param.get('id'));
            this.userService.userId.next(this.id);
        });
        this.commentForm = new FormGroup({
            postId: new FormControl(''),
            id: new FormControl(''),
            name: new FormControl('', [Validators.required]),
            email: new FormControl(''),
            body: new FormControl(''),
        });
     }

    ngOnInit(): void {
        this.getPosts();
        this.getUser();
    }

    getUser() {
        this.userService.getUserById(this.id).subscribe((res: any) => {
            this.userData = res;
        })
    }

    getPosts() {
        this.userService.getAllPost().subscribe((data: Post[]) => {
            this.getAllComments(data)
        })
    }

    getAllComments(postData: any) {
        this.userService.getAllComments().subscribe((data: any) => {
            this.commentId = data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id))[0].id;
            this.userPosts = postData.map((p: any) => {
                return {
                    ...p,
                    comments: data.filter((c: any) => p.id === c.postId)
                }
            }).filter((el: any) => el.userId === this.id).sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));  
        })       
    }

    addNewPost() {
        const dialogRef = this.dialog.open(AddPostComponent, {});
        dialogRef.afterClosed().subscribe(result => {
            this.getPosts();
        });
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.commentForm.controls[controlName].hasError(errorName);
    }

    async addNewComment(pid: any) {
        this.submitted = true;
        this.commentId += 1;
        
        if (this.commentForm.invalid) {
            for (const control of Object.keys(this.commentForm.controls)) {
                this.commentForm.controls[control].markAsTouched();
            }
            return;
        }

        const payload =  {
            postId: pid,
            id: this.commentId ,
            name: this.commentForm.value.name,
            email: this.commentForm.value.email,
            body: this.commentForm.value.body,
        }

        this.userService.createComment(payload).subscribe((data: any) => {
            this.getPosts();
            this.commentForm.reset();
            this.submitted = false;
        })
        
    }

}
