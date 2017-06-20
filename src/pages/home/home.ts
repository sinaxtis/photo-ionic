import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  public pos: any;
  public latitud:any;
  public longitud:any;
  constructor(private camera: Camera, private geolocation: Geolocation, public http: Http) {

  }


  takePicture(){

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.pos = position;
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
    });


}
  cancelPhoto(){
    this.base64Image ="";
  }
  sendPhoto(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let photo = {
      Latitud: this.latitud,
      Longitud: this.longitud,
      Picture: this.base64Image
    }
     this.http.post("http://127.0.0.1:8000/api/photos/", photo, options)
      .subscribe(data => {
        console.log(data);
       }, (err) => {
        console.log(err);// Error getting the data
      });
      this.base64Image= "";
  }

}
