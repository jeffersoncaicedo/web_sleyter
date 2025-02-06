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

  images = ['nextgensoftware_logo.png', 'nextgensoftware_solo_logo.png']
  currentIndex = 0;
  intervalID: any;

  ngAfterViewInit(): void {
    this.typeText();
    // this.startAutoSlide();
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
    }, 3000);
  }

  stopAutoSlide() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

}
