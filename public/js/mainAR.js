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
          new Splide('#home-galleryAr', {
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



            document.addEventListener('DOMContentLoaded', function () {
        new Splide('#lens-galleryAr', {
          direction: 'rtl',
          gap : 0 ,
          type   : 'loop',
          drag   : 'free',
          focus  : 'center',
          arrows: false,
          perPage: 3,
           arrows:false,
           pagination:false,
           breakpoints: {
            768: {
              perPage: 2,
            }
          },
          autoScroll: {
            speed: 2,
          },
        }).mount( window.splide.Extensions );
      });


      // WRDC GALLERY

          document.addEventListener('DOMContentLoaded', function () {
        new Splide('#WRDC-gallery-AR', {
          direction: 'rtl',
          gap : 10 ,
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
              perPage: 1,
            },
          },
          autoScroll: {
            speed: 1,
          },
        }).mount( window.splide.Extensions );
      });


           document.addEventListener('DOMContentLoaded', function () {
        new Splide('#medical-gal-ar', {
          direction:'rtl',
          perPage: 3,
          gap: 30,
          perMove: 1,
           arrows:true,
           pagination:false,
           breakpoints: {
            1024: {
              perPage: 1,
            },
            768: {
              perPage: 1,

            },
          },

        }).mount();
      });



      
document.addEventListener('DOMContentLoaded', function () {
  new Splide('#hurg-servAr', {
    direction:'rtl',
    perPage: 5,
    gap: 25,
    drag: 'free',
    arrows: true,
    breakpoints: {
      1024: {
        perPage: 3
      },
      768: {
        perPage: 2
      },
      600: {
        perPage: 1
      }
    }
  }).mount();
});

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#hurg-visitsAr', {
    direction:'rtl',
    perPage: 4,
    gap: 25,
    drag: 'free',
    arrows: true,
    breakpoints: {
      1024: {
        perPage: 3
      },
      768: {
        perPage: 2
      },
      600: {
        perPage: 1
      }
    }
  }).mount();
});

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#hurg-galAr', {
    direction:'rtl',
    perPage: 5,
    gap: 30,
    perMove: 1,
    autoplay:true,
    type:'loop',
    arrows: true,
    pagination: false,
    breakpoints: {
      1024: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
       533: {
        perPage: 1,
      },
    },
    autoScroll: {
      speed: 3,
    }
  }).mount();
});

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#medical-servicesAr', {
    direction:'rtl',
    perPage: 3,
    gap: 30,
    perMove: 1,
    arrows: true,
    pagination: false,
    breakpoints: {
      1200: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      }
    },

  }).mount();
});