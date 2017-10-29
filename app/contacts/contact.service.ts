import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";


import { getString, setString } from "application-settings";

import { BackendService } from "../shared";

const headers = new Headers();
const apiUrl = BackendService.apiUrl;

@Injectable()
export class ContactService {

	public static status_invited = "invited";
	public static status_confirmed = "confirmed";
	public static status_pending_friend= "pending_for_confirm";

  constructor(private http: Http) {
    headers.append("Authorization", "Bearer " + BackendService.token);
   }

  public listContactGroup() {
		return this.http.get(BackendService.apiUrl + "/ugroups/user", {headers})
    .map((res: Response) => res.json())
    .catch(this.__handleError);
	}

	public listContactUser(query?){
		let sQuery = '';
		if(typeof query === 'string'){
			sQuery = query;
		}
		if(typeof query === 'object'){
			for(const key in query){
				sQuery = sQuery === '' ? '?'+sQuery: '&'+sQuery;
				sQuery += key + '=' + query[key];
			}
		}
		return this.http.get(BackendService.apiUrl + "/contacts"+sQuery, {headers})
    .map((res: Response) => res.json())
    .catch(this.__handleError);
	}

	public addContactUser(contact){

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

	_searchUser(text) {

		const oSearch = { search: text};

		return this.http.post(BackendService.apiUrl + "/users/search", oSearch)
		 .map((res: Response) => res.json());
	}

	public searchUsers(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
			.switchMap(term => this._searchUser(term))
			.catch(this.__handleError);
	}

	public searchContacts(query: any){
		let queryString: String;

		if (query.status){
			queryString += "status=" + query.status;
		}
		let url = BackendService.apiUrl + "/contacts";
		if (queryString){
			url += "?" + queryString;
		}
		return this.http.get(url)
		.map((res: Response) => res.json());
	}

	private __handleError(err: Response | any){
		return Observable.throw( JSON.stringify(err) || "Unknown Error");
	}
}
