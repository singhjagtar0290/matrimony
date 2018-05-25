// Import Libraries
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Import Services
import { UserService } from '../../services/user.service';

// Import Models
import { User } from '../../domain/matrimony_db/user';

// START - USED SERVICES
/*
 *	UserService.create
 *		PARAMS: 
 *		
 *
 *	UserService.get
 *		PARAMS: 
 *					ObjectId id - Id 
 *		
 *
 *	UserService.update
 *		PARAMS: 
 *					ObjectId id - Id
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * UserService  
 */
// END - REQUIRED RESOURCES

/**
 * Edit component for UserEdit
 */
@Component({
    selector: 'user-edit',
    templateUrl : './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    item: User;
    model: User;
    
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init item
        this.item = new User();
    }

    ngOnInit(): void {
            this.route.params.subscribe(param => {
                let id: string = param['id'];
                if (id !== 'new') {
                    // Get item from server 
                    this.userService.get(id).subscribe(item => this.item = item);
                    
                    
                }
            });
    }

    /**
     * Save Item
     */
    save (formValid:boolean, item: User): void{
        if (formValid) {
            if(item._id){
                this.userService.update(item).subscribe(data => this.goBack());
            } else {
                this.userService.create(item).subscribe(data => this.goBack());
            }  
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }
    

}