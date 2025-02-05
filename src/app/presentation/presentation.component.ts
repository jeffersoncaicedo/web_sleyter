import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.less'
})
export class PresentationComponent implements OnInit{
  // words = ['developer', 'consultant', 'support'];
  text = '';
  phrases = ['development', 'consultant', 'support'];
  currentPhraseIndex = 0;
  isWriting = true;

  ngOnInit(): void {
    // this.typeText();  
    this.writeLast();  
  }

  typeText(){
    let index = 0;
    const typingSpeed = 150;  // Velocidad de escritura
    const erasingSpeed = 100; // Velocidad de borrado
    const delayBeforeErase = 1000; // Pausa antes de borrar
    const delayBetweenPhrases = 500; // Pausa entre frases

    const typePhrase = () => {
      const phrase = this.phrases[this.currentPhraseIndex];
      index = 0; // Resetear el índice de escritura
      this.isWriting = true;

      // Escribir la frase
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
      // Borrar la frase
      const erasingInterval = setInterval(() => {
        if (this.text.length > 0) {
          this.text = this.text.slice(0, -1);
        } else {
          clearInterval(erasingInterval);
          this.currentPhraseIndex++;  // Avanzar al siguiente índice
          if (this.currentPhraseIndex < this.phrases.length) {
            setTimeout(typePhrase, delayBetweenPhrases);  // Escribir la siguiente frase
          }else{
            // setTimeout(this.writeLast, delayBetweenPhrases);
            this.writeLast();
          }
        }
      }, erasingSpeed);
    };

    typePhrase();  // Iniciar la animación de la primera frase
  }


  writeLast(){
    const word: any = 'development';
    for(let i in word){
      setInterval(() => {
        this.text += word[i];
        console.log(this.text)
      }, 500);
    }  
  }

}
