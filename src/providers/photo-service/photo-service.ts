import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PhotoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhotoServiceProvider {
  data: any;
  constructor(public http: Http) {
    console.log('Hello PhotoServiceProvider Provider');
  }
  load() {
  if (this.data) {
    // already loaded data
    return Promise.resolve(this.data);
  }

  // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('https://randomuser.me/api/?results=10')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);});
    	});
	}

}
