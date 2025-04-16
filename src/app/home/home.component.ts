import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';
import { ServicesComponent } from '../services/services.component';
import { ContactComponent } from '../contact/contact.component';
import Swal from 'sweetalert2';
import { KpopComponent } from "../kpop/kpop.component";
@Component({
  selector: 'app-home',
  imports: [PresentationComponent, ServicesComponent, ContactComponent, KpopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit, AfterViewInit{
  activeSection: string = 'section1';
  logoURI_sc1 = 'logo_1.png';
  logoURI_sc = 'logo_1.png';

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
    // this.scrollToSection('section3');
    Swal.fire({
      title: 'Formulario de Contacto',
      html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre completo">
        <input id="swal-email" class="swal2-input" placeholder="Correo electrónico">
        <input id="swal-telefono" class="swal2-input" placeholder="Teléfono">
        <textarea id="swal-mensaje" class="swal2-textarea" placeholder="Mensaje adicional (opcional)"></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = (document.getElementById('swal-nombre') as HTMLInputElement)?.value.trim();
        const email = (document.getElementById('swal-email') as HTMLInputElement)?.value.trim();
        const telefono = (document.getElementById('swal-telefono') as HTMLInputElement)?.value.trim();
        const mensaje = (document.getElementById('swal-mensaje') as HTMLTextAreaElement)?.value.trim();
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const telefonoRegex = /^\d{10,}$/;
    
        // Validaciones
        if(!nombre && !email && !telefono){
          Swal.showValidationMessage("Rellena todos los campos antes de continuar");
          return false;
        }else{
          if (!nombre) {
            Swal.showValidationMessage('Por favor ingresa tu nombre');
            return false;
          }
          if (!email || !emailRegex.test(email)) {
            Swal.showValidationMessage('Correo electrónico inválido');
            return false;
          }
          if (!telefono || !telefonoRegex.test(telefono)) {
            Swal.showValidationMessage('Teléfono inválido. Debe contener 10 dígitos');
            return false;
          }
          

        }
        return { nombre, email, telefono, mensaje };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Datos del formulario:', result.value);
        // Aquí puedes hacer lo que necesites con los datos
      }
    });    
    
  }

}
