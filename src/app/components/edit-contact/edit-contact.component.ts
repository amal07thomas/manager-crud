import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/models/iContact';
import { IGroup } from 'src/app/models/iGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent {
  contactId: any;
  public contact: IContact = {} as IContact;
  public groups: IGroup[] = [];
  errorMessage: any;
  public loading:boolean = false;
  constructor(
    private activeRoute : ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ){

  }
  ngOnInit(){
    this.activeRoute.paramMap.subscribe((param: ParamMap)=> {
      this.contactId = param.get('contactId');
      console.log(this.contactId);
    })

    if(this.contactId){
      this.contactService.GetContactById(this.contactId).subscribe((data: IContact) => {
        this.contact = data;
        this.loading = false;
      },(error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
    this.contactService.getAllGroups().subscribe((data: IGroup[]) => {
      this.groups = data;
      console.log(this.groups);
    },(error) =>{
      this.errorMessage = error;
      this.loading = false;
    });
    
  }
  public submitUpdate(){
    if(this.contactId){
      this.contactService.updateContact(this.contact,this.contactId).subscribe((data: IContact)=> {
        this.router.navigate(['/']).then();
      },(error)=>{
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
  
      });
    }
  }

}
