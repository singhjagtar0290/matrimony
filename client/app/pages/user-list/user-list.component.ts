// Import Libraries
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalRemoveComponent } from '../../components/modal-remove.component';


// Import Services
import { UserService } from '../../services/user.service';

// Import Models
import { User } from '../../domain/matrimony_db/user';

// START - USED SERVICES
/*
 *	UserService.delete
 *		PARAMS: 
 *					ObjectId id - Id
 *		
 *
 *	UserService.list
 *		PARAMS: 
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * UserService  
 */
// END - REQUIRED RESOURCES

@Component({
    selector: "user-list",
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    
    // Attributes
    list: User[];
    search: any = {};
    idSelected: string;
    
    // Constructor
    constructor(
        private userService: UserService, 
        public dialog: MatDialog) {}

    // Functions
    ngOnInit(): void {
        this.userService.list().subscribe(list => this.list = list);
    }

    openModal(id: string): void {
        let dialogRef = this.dialog.open(ModalRemoveComponent, {
            width: '250px',
            data: () => {
                // Execute on confirm
                this.userService.remove(id).subscribe(() => {
                    dialogRef.close();
                });
                this.list = this.list.filter(item => item._id != id);
            }
        });
    }

}