import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogUserComponent } from '../delete-dialog-user/delete-dialog-user.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    userSource: User[] = [];
    displayedColumns: string[] = ['id','firstName','lastName', 'email','actions'];

    constructor(
        private userService: UserService,
        public dialog: MatDialog
        ) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers().subscribe((data) => {
            this.userSource = data;
        });
    }

    openDeleteModal(id: string) {
        const dialogRef = this.dialog.open(DeleteDialogUserComponent, {
            width: '250px',
            data: { id },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.userSource = this.userSource.filter(
                    (_) => _.id !== id
                );
            }
        });
    }

}
