import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { BehaviorSubject, Subject } from "rxjs";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

	private api = "http://localhost:3000/api/notification";

	constructor(
		private $Http: Http,
	) { }

	public getCurrent() {
		/**
		 * todo: should handle below scenarios:
		 * 1. just after login success, should save user with user token locally
		 * 2. should check user token each time call this function, if http token is same as saved token ,just return this currentUser
		 * 3. if http token is different with saved token, should redirct to login page to login again and do step 1 again.
		 */
		return this.$Http.get("api/users/current");
	}
}
