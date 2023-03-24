import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    uuid = uuid.v4();
    public userForm!: FormGroup;
    userId: any;
    
    constructor(
        private userService: UserService,
        private router: Router
    ) { 
        this.userService.getUsers().subscribe((data: any) => {
            this.userId = data.sort((a: any, b: any) => Number(b.id) - Number(a.id))[0].id += 1;
        })
        this.userForm = new FormGroup({
            id : new FormControl(''),
            firstName : new FormControl('', [Validators.required]),
            lastName : new FormControl('', [Validators.required]),
            email : new FormControl('', [Validators.required, Validators.email])
        });
    }

    ngOnInit(): void {
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    create() {
        if (this.userForm.invalid) {
            for (const control of Object.keys(this.userForm.controls)) {
                this.userForm.controls[control].markAsTouched();
            }
            return;
        }

        const payload =  {
            id: this.userId,
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            email: this.userForm.value.email,
        }
        
        this.userService.createUser(payload).subscribe(() => {
            this.userForm.reset();
            this.router.navigate(['/']);
        });
    }

}
