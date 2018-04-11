import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the AddDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {

  data = { name:"", user_name:"", location:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseService: MyDataProvider, private toast: Toast) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDataPage');
  }

  //Save data from html to database - Call the databaseService - myData provider

  saveUserData(){
 this.data = {name:this.data.name, user_name:this.data.user_name, location:this.data.location}
 this.databaseService.saveUserData(this.data);
 this.toast.show('Data saved', '5000', 'center').subscribe(
     toast => {
       this.navCtrl.popToRoot();
     }
   );
}


}
