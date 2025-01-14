import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit, AfterViewInit{
  activeSection: string = 'section1';
  logoURI = 'logo.png';

  ngOnInit(): void {
    if(typeof window !== 'undefined'){
      this.detectActiveSection();
    }
  }

  ngAfterViewInit(){
    if(typeof window !== 'undefined'){
      this.detectActiveSection();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){
    if(typeof window !== 'undefined'){
      this.detectActiveSection();
    }
  }

  detectActiveSection(){
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section: any) =>{
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight){
        this.activeSection = section.id;
      }

    })
  }

  scrollToSection(sectionId: string){
    const section = document.getElementById(sectionId);
    if(section){
      section.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  contactButton(){
    this.scrollToSection('section3');
  }

}
