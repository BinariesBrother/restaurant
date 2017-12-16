import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {GoogleInfo} from './google-info';

@Injectable()
export class GoogleSheetService {

  infos:GoogleInfo;

  private rest:HttpClient;
  constructor(http: HttpClient) {
    this.rest = http;
  }

  getInfo():Promise<GoogleInfo>{
    let promise: Promise<GoogleInfo>;
    if(this.infos){
      promise = new Promise<GoogleInfo>((resolve, reject) => {
        resolve(this.infos);
      });
    }else{
      promise = this.initInformations();
    }
    return promise;
  }

  initInformations():Promise<GoogleInfo>{
    return this.rest.get("https://spreadsheets.google.com/feeds/list/1pORXVX6pluP9BRUbRnlyg1HkbVpu-c8NHYEESySjKPk/1/public/values?alt=json").toPromise().then(data=>this.recieveData(data));
  }

  recieveData(data:Object):Promise<GoogleInfo>{
    let result = <GoogleSheetResult> data;
    this.infos = new GoogleInfo(new Sheet(result.feed));
    return new Promise<GoogleInfo>((resolve, reject) => {
      resolve(this.infos);
    });
  }

}

interface GoogleSheetResult{
  feed:GoogleEntry;
}

interface GoogleEntry{
  entry: Array<any>;
}

export class Sheet{
  rows:Array<GenericRow>;
  constructor(feed:GoogleEntry){
    this.rows = [];
    feed.entry.forEach(element => {
      this.rows.push(new GenericRow(element));
    });
  }
}

export class GenericRow{
  attributes:Map<String,String>;
  constructor(row:any){
    this.attributes = new Map<String,String>();
    Object.keys(row).filter(name=>name.startsWith("gsx$")).forEach(name=>{
      let attribute = name.split("gsx$")[1];
      this.attributes.set(attribute, row[name]["$t"]);
    });
  }
}