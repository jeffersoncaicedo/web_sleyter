import { Component, AfterViewInit } from '@angular/core';


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

  ngAfterViewInit(): void {
    this.typeText();
  }

  typeText(){
    let index = 0;
    const typingSpeed = 85;
    const erasingSpeed = 60;
    const delayBeforeErase = 300;
    const delayBetweenPhrases = 200;

    const typePhrase = () => {
      const phrase = this.phrases[this.currentPhraseIndex];
      index = 0;
      this.isWriting = true;

      const typingInterval = setInterval(() => {
        if (index < phrase.length) {
          this.text += phrase[index];
          index++;
        } else {
          clearInterval(typingInterval);
          this.isWriting = false;
          setTimeout(erasePhrase, delayBeforeErase);
        }
      }, typingSpeed);
    };

    const erasePhrase = () => {
      this.isWriting = false;
      const erasingInterval = setInterval(() => {
        if (this.text.length > 0) {
          this.text = this.text.slice(0, -1);
        } else {
          clearInterval(erasingInterval);
          this.currentPhraseIndex++;
          if (this.currentPhraseIndex < this.phrases.length) {
            setTimeout(typePhrase, delayBetweenPhrases);
          }else{
            setTimeout(() =>{this.writeLast()}, delayBetweenPhrases);
          }
        }
      }, erasingSpeed);
    };

    typePhrase();
  }


  writeLast(){
    let index = 0;
    const typingSpeed = 85;
    const typingInterval = setInterval(() => {
      if(index < 'development.'.length){
        this.text += 'development.'[index];
        index++;
      }else{
        clearInterval(typingInterval);
      }
    }, typingSpeed);
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
