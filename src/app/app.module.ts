import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

import { AuthInterceptorProvider } from './auth/auth-interceptor.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { Crop } from '@ionic-native/crop/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), LeafletModule.forRoot()],
  providers: [
    Crop,
    StatusBar,
    SplashScreen,
    Geolocation,
    FileTransfer,
    FileTransferObject,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
