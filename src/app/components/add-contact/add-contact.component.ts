import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/iContact';
import { IGroup } from 'src/app/models/iGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  public loading : boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string = '';
  public groups : IGroup[] = [];

  constructor(
    private contactService: ContactService,
    private router: Router
    ){}
  ngOnInit(){
    this.contactService.getAllGroups().subscribe((data: IGroup[])=> {
      this.groups = data;
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    })

  }
  createSubmit(){
    this.contactService.createContact(this.contact).subscribe((data: IContact)=> {
      this.router.navigate(['/']).then();
      this.contact = data;
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();

    });
    
  }

}
