import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { AddDataPage } from '../../pages/add-data/add-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 dataArray = { name:"Jammie", user_name:"Oliver", location:"Pretoria"};
 myData: any = [];



  constructor(public navCtrl: NavController, public databaseService: MyDataProvider) {

  }

  //Do this When the HomePage loads
  ionViewDidLoad(){
  this.getUserData();
  console.log("ionViewDidLoad");
}
//Do this before HomePage starts
  ionViewWillEnter(){this.getUserData();}

  //opening another view - AddDataPage
saveData(){this.navCtrl.push(AddDataPage);}

getUserData()
{
  console.log("getUserData")

  this.databaseService.getUserData().then((result) => {
    this.myData = <Array<Object>>result;
  },(error) => {
    console.log("ERROR: ",error);
  });
}

}
