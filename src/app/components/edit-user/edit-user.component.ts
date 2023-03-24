import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    public userForm!: FormGroup;
    public userData: any;
    
    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.paramMap.subscribe((param) => {
            var id = String(param.get('id'));
            this.getById(id);
        });
        this.userForm = new FormGroup({
            id : new FormControl(''),
            firstName : new FormControl('', [Validators.required]),
            lastName : new FormControl('', [Validators.required]),
            email : new FormControl('', [Validators.required, Validators.email])
        });
    }

    ngOnInit(): void {
    }

    getById(id: any) {
        this.userService.getUserById(id).subscribe((data: any) => {
            this.userForm.patchValue({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
           });
        });
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    update() {
        if (this.userForm.invalid) {
            for (const control of Object.keys(this.userForm.controls)) {
                this.userForm.controls[control].markAsTouched();
            }
            return;
        }

        const payload =  {
            id: this.userForm.value.id,
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            email: this.userForm.value.email,
        }

        this.userService.updateUser(payload).subscribe(() => {
            this.router.navigate(['/']);
        });
    }

}
