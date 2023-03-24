import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { Post } from 'src/app/core/interfaces/post';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
    uuid = uuid.v4();
    public userForm!: FormGroup;
    userId: any;
    postId: any;

    constructor(
        public dialogRef: MatDialogRef<AddPostComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Post,
        public dataService: UserService,
    ) {
        this.dataService.userId.subscribe((id: any) => {
            this.userId = id;
        })

        this.dataService.getAllPost().subscribe((post: any) => {
            this.postId = post.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id))[0].id;
        })
        
        this.userForm = new FormGroup({
            userId : new FormControl(this.userId),
            id : new FormControl(''),
            title : new FormControl('', [Validators.required]),
            body : new FormControl('', [Validators.required]),
        });
     }

     public checkError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public confirmAdd(): void {
        this.postId += 1;
        if (this.userForm.invalid) {
            for (const control of Object.keys(this.userForm.controls)) {
                this.userForm.controls[control].markAsTouched();
            }
            return;
        }

        const payload =  {
            userId: this.userForm.value.userId,
            id: this.postId,
            title: this.userForm.value.title,
            body: this.userForm.value.body,
        }
        
        this.dataService.createPost(payload).subscribe((data: any) => {
            if (data) {
                this.dialogRef.close();
            }
        })
    }

}
