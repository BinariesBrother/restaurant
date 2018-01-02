import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.fetchSheet(1).then(data=>this.recieveData(data));
  }

  fetchSheet(pageNumber:number):Promise<any>{
    let API:string='https://spreadsheets.google.com/feeds/list/1pORXVX6pluP9BRUbRnlyg1HkbVpu-c8NHYEESySjKPk';
    return this.rest.get(`${API}/${pageNumber}/public/values?alt=json`).toPromise();
  }

  recieveData(data:Object):Promise<GoogleInfo>{
    let result = <GoogleSheetResult> data;
    this.infos = new GoogleInfo(new Sheet(result.feed, result.feed.title.$t));
    return this.completeData();
  }

  completeData():Promise<GoogleInfo>{
    return Promise.all(
      Array.from(new Array(this.infos.pages), (x,i) => i+1).map(i=>this.fetchSheet(i))
    ).then(values=>{
      this.infos.sheets = values.map(value=>{
        let valeur = <object> value;
        let valeur2 = <GoogleSheetResult> valeur;
        return valeur2.feed?new Sheet(valeur2.feed, valeur2.feed.title.$t):undefined;
      }).reduce(function(map, obj, index) {
        map[obj.title] = obj;
        return map;
      }, new Map<string,Sheet>());
      return new Promise<GoogleInfo>((resolve, reject) => {
        resolve(this.infos);
      });
    });
    
  }

}

interface GoogleSheetResult{
  feed:GoogleEntry;
}
interface TitleSheet{
  $t:string;
}

interface GoogleEntry{
  entry: Array<any>;
  title:TitleSheet;
}

export class Sheet{
  rows:Array<GenericRow>;
  title:string;
  constructor(feed:GoogleEntry, title:string){
    this.rows = [];
    this.title = title;
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