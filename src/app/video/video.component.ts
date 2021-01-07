import { KeyValue } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal,NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { VideoServiceService } from '../video-service.service';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  //title = 'Video';  
  percentage:any;

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  @ViewChild("p", { static: false }) pop: NgbPopover;
  @ViewChild("action", { static: false }) action: NgbPopover;

  markers: any;
  duration: number;
  vElement:any;
  id:any;
  activeBTN:string="";
  readableTime:{h:any,m:any,s:any}={h:0,m:0,s:0};
  transcript: {};
  modal: any;
  originalArray: any;
  activeFilter: boolean;
  filterValues: {sv:any,ev:any}={sv:0,ev:1};
  actionApi: { Fight: { start: number; end: number; }[]; Ready: { start: number; end: number; }[]; };
  constructor(public vs:VideoServiceService,
    
    private route:ActivatedRoute,private r: Router,private md:NgbModal){
    this.id = this.route.snapshot.params['id'];
    this.getTransscrpt(this.id);


  }
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  ngOnInit(){
    this.hit();
    this.vElement=(document.getElementById("video") as HTMLVideoElement);
  }

  hit(){
    let e = document.getElementById("video") as HTMLVideoElement;
    e.addEventListener('timeupdate',(t)=>{
      let percentage = ( e.currentTime / e.duration ) * 100;
      this.percentage=percentage+"%";
    })
     e.addEventListener('loadeddata',(t)=>{
      this.duration=e.duration;
      this.readableTime=this.secondsToHms(this.vElement.duration);

      
    })
  
  }

  onClickLabel(name:string){
    this.activeFilter=false;

    this.activeBTN=name;
    this.markers=[];
    let video = (document.getElementById("video") as HTMLVideoElement)
     this.duration = video.duration;
     let payload={"video_name":this.id||'lucy',"type":name};
     let r=this.vs.getTimesframe(payload).then((res:any)=>{
      this.markers=res;
      this.originalArray=res;

     });
    
    // video.currentTime=this.markers[0].starttime;
  }
  getTransscrpt(videoname){
    let payload={"video_name":videoname||'lucy'};

      this.vs.getTransScript(payload).then((res)=>{
          this.transcript=res;

      })
  }
  onClickSegment(mark){

    console.log(mark)
    this.videoplayer.nativeElement.currentTime=mark.start;
    if(this.videoplayer.nativeElement.paused!=true){
      this.videoplayer.nativeElement.play();
    }
  }
  onClickLabelReset(){
    this.activeBTN="";
    let video = (document.getElementById("video") as HTMLVideoElement)
     this.duration = video.duration;
      this.markers=[];

     
    
  }
  
secondsToHms(secs=1)
{
 let totalSeconds:number=secs;
  let hours:any = Math.floor(totalSeconds / 3600)||0;
  if(hours<=9) hours='0'+hours;
   totalSeconds %= 3600;
  let minutes:any = Math.floor(totalSeconds / 60)||0;
  if(minutes<=9) minutes="0"+minutes;
  let seconds:any = Math.floor(totalSeconds % 60)||0;
  if(seconds<=9) seconds='0'+seconds;
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}
redirect(){
  this.r.navigate(['/home'])
}

onClickFilter(content){
 this.modal= this.md.open(content)
}

CalCRange(sv,ev){
  this.filterValues.sv=sv.value;
  this.filterValues.ev=ev.value;

  let t=this.activeBTN;
  this.activeFilter=true;
  console.log(this.activeBTN)
  this.pop.close()
console.log(sv.value,ev.value,this.originalArray);
  if(t=="adult"||t=="racy"){
  this.markers = this.originalArray.filter(function (el) {
    return el[t]>=(sv.value||0)&&
    el[t] <= (ev.value||1)
           
  });
  }else{
    this.markers = this.originalArray.filter(function (el) {
      return el['score']>=(sv.value||0)&&
      el['score'] <= (ev.value||1)
             
    });
  }
  setTimeout(() => {
    console.log(this.markers,ev.value,sv.value)
  },1000 );
}

closePop(){
this.pop.close()
}
clearFilter(){
  this.activeFilter=false;
  this.markers=this.originalArray;
  

}

openActionPopup(p0){
  p0.open();
  this.activeFilter=false;

  this.markers=[];
  let video = (document.getElementById("video") as HTMLVideoElement)
   this.duration = video.duration;
   let payload={"video_name":this.id||'lucy',"type":"action"};
   let r=this.vs.getTimesframe(payload).then((res:any)=>{
    this.actionApi=res;

   });
}
openEventPopup(p0){
  p0.open();
  this.activeFilter=false;

  this.markers=[];
  let video = (document.getElementById("video") as HTMLVideoElement)
   this.duration = video.duration;
   let payload={"video_name":this.id||'lucy',"type":"event"};
   let r=this.vs.getTimesframe(payload).then((res:any)=>{
    this.actionApi=res;
    console.log("Result from Api are ",res)
   });
}
onClickActionButton(action){
  this.activeBTN=action;

if(action=='fight'){
this.markers=this.actionApi["Fight"]
console.log(this.markers)
this.originalArray=this.markers

}else{
  this.markers=this.actionApi["Ready"]
  this.originalArray=this.markers


}
}

actionClose(action){
this.action.close()
}


onClickEventButton(action){
  this.activeBTN=action;

if(action=='blood'){
this.markers=this.actionApi["blood"]
this.originalArray=this.markers

console.log(this.markers)
}else{
  this.markers=this.actionApi["non-blood"];
  this.originalArray=this.markers


}

}}