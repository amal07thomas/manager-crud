import { Component } from '@angular/core';
import { IContact } from 'src/app/models/iContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent {
  public searchText!: string;
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string = '';
  constructor(private contactService: ContactService){}
  ngOnInit(){
    this.getAllContacts();
  }
  public getAllContacts(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data: IContact[]) => {
      this.contacts = data;
      this.loading = false;
    },(error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }
 
  deleteContact(contactId:any){
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe((data: {})=>{
        this.getAllContacts();
      },(error)=>{
        this.errorMessage= error;
      })
    }

  }
}
