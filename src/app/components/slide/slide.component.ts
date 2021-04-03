import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  slideData = [
    { image: "./assets/img/nba.png" },
    { image: "./assets/img/kobe1.png" },
    { image: "./assets/img/harden.png" },
    { image: "./assets/img/mj.png" },
  ]
  constructor() { }

  ngOnInit() {}

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

}
