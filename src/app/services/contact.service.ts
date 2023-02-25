import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/iContact';
import { IGroup } from '../models/iGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public serverUrl: string = 'http://localhost:9000'; // json server url
  constructor(private httpClient: HttpClient) { }

    //Get All Contacts

  public getAllContacts(): Observable<IContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }
  public GetContactById(contactId: string): Observable<IContact>{
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }
  public createContact(contact: IContact): Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }
  public updateContact(contact: IContact,contactId: string): Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }
  public deleteContact(contactId: string): Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }

  //Get All Groups
  public getAllGroups(): Observable<IGroup[]>{
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }
  public GetGropById(groupId: string): Observable<IGroup>{
    let dataUrl = `${this.serverUrl}/groups/${groupId}`;
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));
  }
  public createGroup(group: IGroup): Observable<IGroup>{
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.post<IGroup>(dataUrl,group).pipe(catchError(this.handleError));
  }
  public updateGroup(group: IGroup,groupId: string): Observable<IGroup>{
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.put<IGroup>(dataUrl,group).pipe(catchError(this.handleError));
  }
  public deleteGroup(groupId: string): Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`
    }else{
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`
    }
    return throwError(errorMessage);
  }
}

