import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable} from 'rxjs/Observable';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  actionUrl: string;
  items: any[] = [];
  //items:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
     this.actionUrl = "http://127.0.0.1:8000/api/photos";
     
     /*http.get(this.actionUrl)
      .map(res => res.json())
      .subscribe(cosas => this.items = cosas);*/
      //this.items = http.get(this.actionUrl).map(res => res.json());
  }
  ngOnInit(){
    console.log("iniciando");
    this.getPhotos();
    console.log("terminando");
    console.log("DATA: ",this.items);
    //console.log(this.items);
  }




  getPhotos(){
    console.log("estamos en getphotos");
    this.http.get(this.actionUrl).map((res:any) => res.json()).subscribe(data => {
      this.items.push(data);
      console.log("la data es: ",data);
      console.debug(this.items[0]);
      });
  }

}
