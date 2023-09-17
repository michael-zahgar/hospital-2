document.addEventListener('DOMContentLoaded', function () {
  new Splide('#home-service-ar', {
    direction:'rtl',
    perPage: 3,
    gap: 30,
    perMove: 1,
     arrows:true,
     pagination:false,
     breakpoints: {
      1024: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      },
    },
          
  }).mount();
});



      // Home Insurance 

      document.addEventListener('DOMContentLoaded', function () {
        new Splide('#insurance-ar', {
          direction:'rtl',
          perPage: 5,
          gap : 0 ,
          type   : 'loop',
          drag   : 'free',
          focus  : 'center',
          arrows: false,
          pagination:false,
           breakpoints: {
            768: {
              perPage: 4,
              perMove: 3
            },
            650: {
              perPage: 3,
              perMove: 2
            },
            536: {
              perPage: 2,
              perMove: 1,
              autoScroll:{speed: 3},
            },
          },autoScroll: {
            speed: 2,
          }
          
        }).mount( window.splide.Extensions );
      });
      
      document.addEventListener('DOMContentLoaded', function () {
        new Splide( '#testimonials-ar', {
          direction: 'rtl',
          perPage: 3,
          gap : 20 ,
          type   : 'loop',
          drag   : 'free',
          arrows: false,
          breakpoints:{
            1024:{
              perPage: 2
            },
            768:{
              perPage: 1
            }
          }
        } ).mount();
        });


        document.addEventListener('DOMContentLoaded', function () {
          new Splide('#home-gallery-ar', {
            direction: 'rtl',
            gap : 0 ,
            type   : 'loop',
            drag   : 'free',
            focus  : 'center',
            arrows: false,
            perPage: 4,
             arrows:false,
             pagination:false,
             breakpoints: {
              1024: {
                perPage: 2,
              },
              768: {
                perPage: 2,
              },
            },
            autoScroll: {
              speed: 1,
            },     
          }).mount( window.splide.Extensions );
        });