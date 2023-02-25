import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  public href: string = 'null';
  constructor(private router: Router){}
  ngOnInit(){
    this.href = this.router.url;
    console.log(this.href);
  }

}
