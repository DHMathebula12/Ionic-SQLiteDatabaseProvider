import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { HttpClientModule } from '@angular/common/http';
//import { DatabaseService } from '../providers/my-data';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyDataProvider } from '../providers/my-data/my-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
//    DatabaseService,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyDataProvider
  ]
})
export class AppModule {}
