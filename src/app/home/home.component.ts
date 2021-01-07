import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { VideoServiceService } from '../video-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  //title = 'Video';  
  percentage:any;

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  markers: any;
  duration: number;
  vElement:any;
  videos: unknown;
  constructor(public vs:VideoServiceService,public r:Router){
    this.loadVideo();
  }

  goToVideo(key,value){
    this.vs.videoURL=value;
     this.r.navigate(['player/'+key])
  }
  loadVideo(){
    this.vs.getVideo("").then((res)=>{

      this.videos=res;        
    });
  }

}
