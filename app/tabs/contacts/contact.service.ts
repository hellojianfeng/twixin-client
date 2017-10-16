import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";

import { getString, setString } from "application-settings";

import { BackendService } from "../../shared";

const headers = new Headers();
const apiUrl = BackendService.apiUrl;

@Injectable()
export class ContactService {

  constructor(private http: Http) {
    headers.append("Authorization", "Bearer " + BackendService.token);
   }

  public listContactGroup(){
		return this.http.get(BackendService.apiUrl + "/ugroups/user", {headers})
    .map((res: Response) => res.json())
    .catch(this.__handleError);
	}

	public listContactUser(){
		return this.http.get(BackendService.apiUrl + "/contacts", {headers})
    .map((res: Response) => res.json())
    .catch(this.__handleError);
	}

	public addContactUser(oUser){
		const contact = { user: oUser.username};

		return this.http.post(BackendService.apiUrl + "/contacts", contact, {headers})
		 .map((res: Response) => res.json())
		 .catch(this.__handleError);
	}

	public addContactGroup(groupData){
//
	}

	public removeContactUser(user){
//
	}

	public removeContactGroup(group){
//
	}

	public isGroupAdmin(group, user?){
//
	}

	public list(){
		// combine users and groups
		return this.listContactUser()
		.switchMap( contacts =>
			 this.listContactGroup().map(groups => contacts.concat(groups)),
		);
	}

	public searchUser(text){

		const oSearch = { search: text};

		return this.http.post(BackendService.apiUrl + "/users/search", oSearch)
		 .map((res: Response) => res.json())
		 .catch(this.__handleError);
	}

	private __handleError(err: Response | any){
		return Observable.throw( JSON.stringify(err) || "Unknown Error");
	}
}
