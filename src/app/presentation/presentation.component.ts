import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.less'
})
export class PresentationComponent implements AfterViewInit{
  text = '';
  phrases = ['consulting.', 'design.', 'support.'];
  currentPhraseIndex = 0;
  isWriting = true;

  images = ['proyecto1.png', 'proyecto2.png', 'proyecto3.png'];
  currentIndex = 0;
  intervalID: any;
  videoUrl: SafeResourceUrl;
  safeUrl = 'https://www.youtube.com/watch?v=5A8WGlK4xRM';

  constructor(private sanitazer: DomSanitizer){
    const youtubeUrl = 'https://www.youtube.com/watch?v=5A8WGlK4xRM';
    this.videoUrl = this.sanitazer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }

  ngAfterViewInit(): void {
    // this.typeText();
  }

  nextSlide(){
    this.currentIndex = (this.currentIndex + 1) % this.images.length
  }

  prevSlide(){
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  startAutoSlide(){
    this.intervalID = setInterval(() => {
      this.nextSlide();
    }, 7000);
  }

  stopAutoSlide() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }


  linkProyecto(currentImg: any){
    switch(currentImg){
      case 'proyecto1.png':
        console.log("Aquí me redirige al repositorio del PRIMER proyecto");
        break;

      case 'proyecto2.png':
        console.log("Aquí me redirige al repositorio del SEGUNDO proyecto")
        break;
        
      case 'proyecto3.png':
        console.log("Aquí me redirige al repositorio del TERCER proyecto")
        break;

    }
  }

}
