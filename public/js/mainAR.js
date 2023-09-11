
$(".caro-patient .owl-carousel").owlCarousel({
    rtl:true,  autoplay: true,
    smartSpeed: 1000,
    margin: 0,
    dots: false,
    loop: true,
    nav : true,
    navText : false,
    responsive: {
      0:{
        items:3
      }, 
      992:{
        items:5
      }
    }
    
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide5', {
      perPage: 6,
      drag   : 'free',
      direction: 'rtl',
      perMove: 6,
       gap:10,
       arrows:false,
       breakpoints: {
        768: {
          perPage: 4,
          perMove: 3
        },
        480: {
          perPage: 3,
          perMove: 2
        },
      },
      
    }).mount();
  });

  
  document.addEventListener('DOMContentLoaded', function () {
    new Splide( '#patient-splideAR', {
      direction: 'rtl',
      gap : 0 ,
      type   : 'loop',
      drag   : 'free',
      focus  : 'center',
      arrows: false,
      perPage: 2,
      breakpoints:{
        768:{
          perPage: 1
        }
      },
      autoScroll: {
        speed: 1,
      },
    } ).mount( window.splide.Extensions );
    });
  
    document.addEventListener('DOMContentLoaded', function () {
      new Splide('#insuranceAr', {
        perPage: 6,
        drag   : 'free',
        direction: 'rtl',
        perMove: 6,
         gap:10,
         arrows:false,
         breakpoints: {
          768: {
            perPage: 4,
            perMove: 3
          },
          480: {
            perPage: 3,
            perMove: 2
          },
        },
        
      }).mount();
    });