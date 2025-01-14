import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less'
})
export class NavbarComponent {
  sections = [
    {id: 'section1', name: 'Sección 1'},
    {id: 'section2', name: 'Sección 2'},
    {id: 'section3', name: 'Sección 3'},
    {id: 'section4', name: 'Sección 4'},
  ]

  activeSection: string = this.sections[0].id

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY + 100; // Ajuste para el offset
    this.sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section.id;
        }
      }
    });
  }

}
