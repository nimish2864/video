import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  public url:string="http://104.46.196.241:8005";
  videoURL:string;

  constructor(private _http: HttpClient) { 
    


  }

  
  public getTimesframe(payload) {
    return new Promise((resolve, reject) => {
      
      this._http.post(this.url + "/get_timeframe",payload)
      .subscribe((result: any) => {
        if (result.status == 'error') {
          
           }
         else {
         console.log(result);
         let r={'data':{start:0,end:1}}
          resolve( result)
        }
      
    })
  

})}
public getTransScript(payload) {
  return new Promise((resolve, reject) => {
    
    this._http.post(this.url + "/get_transcripts",payload)
    .subscribe((result: any) => {
      if (result.status == 'error') {
        
         }
       else {
       console.log(result);
       let r={'data':{start:0,end:1}}
        resolve( result)
      }
    
  })


})}
public getVideo(payload) {
  return new Promise((resolve, reject) => {
    
    this._http.get(this.url + "/get_list")
    .subscribe((result: any) => {
      if (result.status == 'error') {
        
         }
       else {
       console.log(result);
        resolve( result)
      }
    
  })


})}

}
