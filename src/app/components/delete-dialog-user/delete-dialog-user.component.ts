import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-delete-dialog-user',
    templateUrl: './delete-dialog-user.component.html',
    styleUrls: ['./delete-dialog-user.component.css']
})
export class DeleteDialogUserComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteDialogUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService
    ) { }

    ngOnInit(): void {
    }

    confirmDelete() {
        this.userService.delete(this.data.id).subscribe(() => {
            this.dialogRef.close(this.data.id);
        });
    }

}
