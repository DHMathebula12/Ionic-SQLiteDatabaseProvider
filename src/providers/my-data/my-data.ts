import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the MyDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyDataProvider {

  db:any;
  private isOpen: boolean;

  constructor(public _http: HttpClient, public _platform: Platform, private sqlite: SQLite) {
     console.log('Hello Database Provider');

     this._platform.ready().then(() => {

      if(!this.isOpen) {
             this.sqlite = new SQLite();
             this.sqlite.create({name: "user.db", location: "default"}).then((db: SQLiteObject) => {
                  //create table
                  db.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, user_name TEXT, location TEXT)', {})
                  .then(() => console.log('Executed SQL - user'))
                  .catch(e => console.log("Create User Exception :" + e));
                  //create table
                  db.executeSql('CREATE TABLE IF NOT EXISTS userofflinedata (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)', {})
                  .then(() => console.log('Executed SQL - offlinedata'))
                  .catch(e => console.log("Create User Exception : " + e));
              })
              .catch(e => console.log("Open Database Exception :" + e));
      }


      });
   }

//SaveData - user table
   public saveUserData(dataArray){
   console.log ("dataArray:nme:" + dataArray.name)
this.sqlite.create({
  name: 'user.db',
  location: 'default'
  })
  .then((db: SQLiteObject) => {
       db.executeSql("INSERT INTO user (name, user_name, location) VALUES (?,?,?)", [dataArray.name, dataArray.user_name, dataArray.location]).then((data) => {
       console.log("INSERTED: " + JSON.stringify(data))
       }, (error) => {
       console.log("insert exception - user: " + JSON.stringify(error.err))
    });
})
 .catch(e => console.log("Insert Exception :" + e));
}

//get User Data
public getUserData() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
      name: 'user.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM user", {}).then(res => {
            let dataArray = []
                for(var i = 0; i<res.rows.length; i++) {
                    dataArray.push({
                        name: res.rows.item(i).name,
                        user_name: res.rows.item(i).user_name,
                        location: res.rows.item(i).location
                    })

                    console.log("Name From Array:" + dataArray[i].name)
                }


            resolve(dataArray)

        }, (error) => {
            reject("There's an exception:" + error)
        }).catch(e => console.log('Select Exception. :' + e))
      })
     .catch(e => console.log("GetUserData Exception :" + e))
    });
}

//delete userOfflineData
public deleteUserData(){
this.sqlite.create({
  name: 'user.db',
  location: 'default'
  })
  .then((db: SQLiteObject) => {
       db.executeSql("DELETE FROM user",[]).then((data) => {
       console.log("DELETED: " + JSON.stringify(data));
       }, (error) => {
       console.log("Delete exception - user: " + JSON.stringify(error.err));
    });
})
 .catch(e => console.log(e));
}

//Insert into UserOfflineData
public saveOfflineData(DataArrayTwo){
this.sqlite.create({
  name: 'user.db',
  location: 'default'
  })
  .then((db: SQLiteObject) => {
       db.executeSql("INSERT INTO userofflinedata (firstname, lastname) VALUES (?,?)", [DataArrayTwo.firstname, DataArrayTwo.lastname]).then((data) => {
       console.log("INSERTED: " + JSON.stringify(data));
       }, (error) => {
       console.log("Insert Error - userofflinedata: " + JSON.stringify(error.err));
    });
})
 .catch(e => console.log(e));
}

//getMyOfflineData
public getMyOfflineData() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
      name: 'user.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM userofflinedata", []).then((data) => {
            let LocalArrayTwo = [];
            if(data.rows.length > 0) {
                for(let i = 0; i < data.rows.length; i++) {
                    LocalArrayTwo.push({
                        firstname: data.rows.item(i).firstname,
                        lastname: data.rows.item(i).lastname
                    });
                }
            }
            resolve(LocalArrayTwo);
        }, (error) => {
            reject(error);
        });
      })
     .catch(e => console.log(e));
    });
}

//deleteMyOfflineData
public deleteMyOfflineData(){
this.sqlite.create({
  name: 'user.db',
  location: 'default'
  })
  .then((db: SQLiteObject) => {
       db.executeSql("DELETE FROM userofflinedata",[]).then((data) => {
       console.log("DELETED: " + JSON.stringify(data));
       }, (error) => {
       console.log("exception Delete - userofflinedata: " + JSON.stringify(error.err));
    });
})
 .catch(e => console.log(e));
}

}
