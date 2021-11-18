'use strict';

const todasSecciones = document.querySelectorAll('section');
const seccion1 = document.querySelector('#seccion_1');
const scrollTo = document.querySelector('.btn_scroll_to');
const header = document.querySelector('header');
const nav = document.querySelector('.navbar');
const navLink = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const logo = document.querySelector('.nav-logo');
const botonModal = document.querySelector('.btn_mostrar_modal');
const modal = document.querySelector('.modal');
const cerrarModal = document.querySelector('.cerrar_modal');
const overlay = document.querySelector('.overlay');
const contenedorBotones = document.querySelector('.contenedor_botones');
const botonesTrabajo = document.querySelectorAll('.boton_trabajo');
const contenedorTrabajo = document.querySelectorAll('.contenedor_trabajo');
const explicacionTrabajo = document.querySelectorAll('.explicacion_trabajo');
const botonIzq = document.querySelector('.boton_slider_izq');
const botonDer = document.querySelector('.boton_slider_der');
const slides = document.querySelectorAll('.slide');
const contenedorPuntos = document.querySelector('.puntos');

//==================================================================

// NAVBAR

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLink.forEach(function(link) {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
});

document.addEventListener('keydown', function(event) {
  if(event.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});


//==================================================================

// NAVEGACIÓN "SMOOTH":

nav.addEventListener('click', function(event) {
    event.preventDefault();
    if(event.target.classList.contains('nav-link')
      && !(event.target.classList.contains('btn_mostrar_modal'))) {
        const id = event.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    } else if(event.target.classList.contains('nav-logo')) {
        header.scrollIntoView({behavior: 'smooth'});
    }
});
//==================================================================


// MODAL:

function abreModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function cierraModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

botonModal.addEventListener('click', abreModal);

cerrarModal.addEventListener('click', cierraModal);

overlay.addEventListener('click', cierraModal);

document.addEventListener('keydown', function(event) {
    if(event.key === "Escape") {
      cierraModal();
    }
});

//==================================================================


// NAVEGACIÓN STICKY:

function obsCallback(entries) {
    entries.forEach(function(entry) {
        if(!entry.isIntersecting) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }  
    });
}

const obsOptions = {
    root: null,     // El root será el viewport del navegador
    threshold: 0,   // 0% de la visibilidad del target
    rootMargin: '-10px',
}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);
//==================================================================


// CAMBIO OPACIDAD DEL NAV AL HACER MOUSEOVER Y MOUSEOUT:

function navLinkHover(event, opacity) {
    // Elemento objetivo:
    const target = event.target;
    if(target.classList.contains('nav-link')) {
        navLink.forEach(function(link) {
            if(link !== target) {
                link.style.opacity = opacity;
            }
            logo.style.opacity = opacity;
        });
    }
} 

nav.addEventListener('mouseover', function(event) {
    navLinkHover(event, .5);
});

nav.addEventListener('mouseout', function(event) {
    navLinkHover(event, 1);
});
//==================================================================


// REVELAR SECCIONES:

function soCallback(entries, observer) {
    entries.forEach(function(entry) {
        if(entry.isIntersecting) {
            entry.target.classList.remove('seccion_hidden');
            observer.unobserve(entry.target);
        }
    })
}

const soOptions = {
    root: null,
    threshold: .15,    // Callback invoked when section is 15% visible

}

const sectionObserver = new IntersectionObserver(soCallback, soOptions);

todasSecciones.forEach(function(section) {
    section.classList.add('seccion_hidden');
    sectionObserver.observe(section);
})
//==================================================================


// BOTONES SECCIÓN TRABAJO:

contenedorBotones.addEventListener('click', function(event) {
    const target = event.target;
    if(target.classList.contains('boton_trabajo')) {
        const num = target.getAttribute('data-tab');
        // Remuevo clases activas:
        botonesTrabajo.forEach(function(boton) {
            boton.classList.remove('boton_trabajo_activo');
        })
        contenedorTrabajo.forEach(function(contenedor) {
            contenedor.classList.remove('contenedor_trabajo_activo');
        });
        explicacionTrabajo.forEach(function(explicacion) {
            explicacion.classList.remove('explicacion_trabajo_activo');
        });
        // Añado clases activas a los elementos seleccionados:
        const botonActivo = document.querySelector(`.boton_trabajo_${num}`);
        botonActivo.classList.add('boton_trabajo_activo');
        const contenedorActivo = document.querySelector(`.contenedor_trabajo_${num}`);
        contenedorActivo.classList.add('contenedor_trabajo_activo');
        const explicacionActivo = document.querySelector(`.explicacion_trabajo_${num}`);
        explicacionActivo.classList.add('explicacion_trabajo_activo');
    }
});
//==================================================================


// SLIDER:

function slider() {

    let currentSlide = 0;
  
    // To slide:
    function toSlide(slide) {
      slides.forEach(function(s, index) {
        s.style.transform = `translateX(${100 * (index-slide)}%)`;
      });
    }
  
    // Siguiente slide:
    function nextSlide() {
      currentSlide === slides.length-1 ? currentSlide = 0 : currentSlide++;
      toSlide(currentSlide);
      activarPunto(currentSlide);
    }
  
    // Anterior slide:
    function prevSlide() {
      currentSlide === 0 ? currentSlide = slides.length-1 : currentSlide--;
      toSlide(currentSlide);
      activarPunto(currentSlide);
    }
  
    // Crear puntos:
    function crearPuntos() {
      slides.forEach(function(_, i) {
        const punto = `<button class="puntos_punto" data-slide="${i}"></button>`;
        contenedorPuntos.insertAdjacentHTML('beforeend', punto);
      });
    }
  
    // Activar (highlight) punto:
    function activarPunto(slide) {
      document.querySelectorAll('.puntos_punto').forEach(function(punto) {
        punto.classList.remove('puntos_punto_activo');
      });
      document.querySelector(`.puntos_punto[data-slide="${slide}"]`).classList.add('puntos_punto_activo');
    }
  
    // Para iniciar el slider:
    function init() {
      toSlide(0);       // Posiciones de inicio
      crearPuntos();    // Creo los puntos
      activarPunto(0);  // Activo el primer punto
    }
    init();
  
    // EVENT HANDLERS:
    botonDer.addEventListener('click', nextSlide);
    botonIzq.addEventListener('click', prevSlide);
  
    // Utilizo flechas izquierda y derecha para mover el slider:
    document.addEventListener('keydown', function(event) {
      if(event.key === 'ArrowLeft') {
        prevSlide();
      }
      if(event.key === 'ArrowRight') {
        nextSlide();
      }
    });
  
    // Clicando los puntos también movemos el slider:
    contenedorPuntos.addEventListener('click', function(event) {
      const target = event.target;
      if(target.classList.contains('puntos_punto')) {
        const slide = target.getAttribute('data-slide');
        toSlide(slide);
        activarPunto(slide);
      }
    });
  }
  slider();
//==================================================================


// SCROLLING TIPO "SMOOTH":

scrollTo.addEventListener('click', function() {
    seccion1.scrollIntoView({behavior: 'smooth'});
});
//==================================================================