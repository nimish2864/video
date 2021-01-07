import { Component, ElementRef, ViewChild } from '@angular/core';
import { VideoServiceService } from './video-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'Video';  
  percentage:any;

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  markers: any;
  duration: number;
  vElement:any;
  constructor(public vs:VideoServiceService){
    
  }
  ngOnInit(){
    this.hit();
    this.vElement=(document.getElementById("video") as HTMLVideoElement)
  }

  hit(){
    let e = document.getElementById("video") as HTMLVideoElement;
    console.log(e);
    // e.addEventListener('timeupdate',(t)=>{
    //   console.log(t)
    //   let percentage = ( e.currentTime / e.duration ) * 100;
    //   this.percentage=percentage+"%";
    // })
    
  
  }

  onClickLabel(name:string){
    this.markers={};
    let video = (document.getElementById("video") as HTMLVideoElement)
     this.duration = video.duration;
     let payload={"video_name":"lucy","type":name};
     let r=this.vs.getTimesframe(payload).then((res)=>{
      this.markers=res;

     });
    
    // video.currentTime=this.markers[0].starttime;
  }
  onClickSegment(mark){

    console.log(mark)
    this.videoplayer.nativeElement.currentTime=mark.start;
    if(this.videoplayer.nativeElement.paused!=true){
      this.videoplayer.nativeElement.pause();
    }
  }
  onClickLabelReset(){
    let video = (document.getElementById("video") as HTMLVideoElement)
     this.duration = video.duration;
      this.markers={};

     
    
  }
}
