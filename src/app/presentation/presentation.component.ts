import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.less'
})
export class PresentationComponent implements OnInit{
  words = ['developer', 'consultant', 'support'];
  currentWord: string = '';
  currentIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 200;
  deletingSpped: number = 100;
  delayBetweenWords: number = 1000;

  ngOnInit(): void {
    this.typeText();    
  }

  typeText(){
    const currentWordIndex = this.currentIndex % this.words.length;
    const fullWord =  this.words[currentWordIndex];

    if(this.isDeleting){
      this.currentWord = fullWord.substring(0, this.currentWord.length - 1);
    }else{
      this.currentWord =  fullWord.substring(0, this.currentWord.length + 1);
    }

    let typeSpeed = this.typingSpeed;

    if(this.isDeleting){
      typeSpeed =  this.deletingSpped;
    }

    if(!this.isDeleting && this.currentWord === fullWord){
      typeSpeed = this.delayBetweenWords
      this.isDeleting = true;
    }else if(this.isDeleting && this.currentWord === ''){
      this.isDeleting = false;
      this.currentIndex++;
      typeSpeed = this.typingSpeed;
    }

    // setTimeout(() => this.typeText(), typeSpeed);

  }
}
