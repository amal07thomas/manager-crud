import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/models/iContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent {
  public loading:boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string| null = null;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private contactService: ContactService
    ){}
  ngOnInit(){
    this.activeRoute.paramMap.subscribe((param: ParamMap)=> {
      this.contactId = param.get('contactId')
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

    }
    

}
