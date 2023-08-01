// Pop up video

function activateVideoButton() {
  const modals = document.querySelector(".modals-video");
  if (!modals) {
    console.log("Error: subscribe form element not found");
    return;
  }
  let btnVideo = document.querySelector('.video-btn');
  let clip = document.querySelector('.modals-video');
  let close = document.querySelector('.close');
  let video = document.querySelector('video')
  btnVideo.onclick = function() {
    btnVideo.classList.add('active');
    clip.classList.add('active')
    video.play();
    video.currentTime = 0 ;
  }
  close.onclick = function() {
    btnVideo.classList.remove('active');
    clip.classList.remove('active');
    video.pause();
  }
}

// Call the function to activate the video button
activateVideoButton();


// On Scroll Animation

document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    })
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
});    


function sendBookingForm() {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) {
    console.log("Error: contact form element not found");
    return;
  }
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let address = document.getElementById('address');
  let message = document.getElementById('message');
  let branch = document.getElementById('branch');
  let service = document.getElementById('service');
  let subMesg = document.getElementById('booking-message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (!name.value.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value.trim())) {
      alert('Please enter a valid email address');
      return;
    }
    if (!phone.value.trim() || !/^\d{11}$/.test(phone.value.trim())) {
      alert('Please enter a valid 11-digit phone number');
      return;
    }
    if (!address.value.trim()) {
      alert('Please enter your address');
      return;
    }
    if (!message.value.trim()){
      alert('Please enter your message');
      return;
    }
    if (!branch.value.trim()) {
      alert('Please select a branch');
      return;
    }
    if (!service.value.trim()) {
      alert('Please select a service');
      return;
    }

    let formData = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
      message: message.value.trim(),
      branch: branch.value.trim(),
      service: service.value.trim(),
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function(){
      console.log(xhr.responseText);
      if(xhr.responseText =='OK'){
        subMesg.textContent = `Thank you for booking through our website. 
        We will contact you within 48 hours to confirm your booking and arrange all the details.
        \n
        شكرًا لحجزكم عبر موقعنا. سنتواصل معكم خلال 48 ساعة لتأكيد الحجز وترتيب كافة التفاصيل.
        `
        subMesg.style.display = "block";
        subMesg.style.padding = "20px" ;
        name.value = '';
        email.value = '';
        phone.value = '';
        address.value = '';
        message.value = '';
        branch.value = '';
        service.value = '';
      }else{
        alert('Something Went Wrong');
      }
    }
    
    xhr.send(JSON.stringify(formData));

    console.log(formData);
  });
}


function sendSubForm() {

  const contactForm2 = document.querySelector(".subscribe-form");
  if (!contactForm2) {
    console.log("Error: subscribe form element not found");
    return;
  }
  let email2 = document.getElementById('email2');
  const subscribeMessage = document.querySelector('.subscribe-message');
  const inputgroup = document.querySelector('.input-group');

  contactForm2.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (!email2.value.trim() || !/\S+@\S+\.\S+/.test(email2.value.trim())) {
      subscribeMessage.textContent = 'Please enter a valid email address';
      subscribeMessage.style.display = 'block';
      subscribeMessage.style.color = 'red';
      inputgroup.style.zIndex = "-1";
      return;
    }
    let formData2 = {
      email2: email2.value.trim()
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/subscribe');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function(){
      console.log(xhr.responseText);
      if(xhr.responseText =='OK'){
        subscribeMessage.textContent = 'Thanks for subscribing!';
        subscribeMessage.style.color = 'white';
        subscribeMessage.style.display = 'block';
        inputgroup.style.zIndex = "-1";
        email2.value = '';
      }else{
        subscribeMessage.textContent = 'Something went wrong. Please try again later.';
        subscribeMessage.style.color = 'red';
        subscribeMessage.style.display = 'block';
        inputgroup.style.zIndex = "-1";
      }
    }
    
    xhr.send(JSON.stringify(formData2));

    console.log(formData2);
  });
}


function sendContactForm() {

  const contactForm3 = document.querySelector(".contactForm");
  if (!contactForm3) {
    console.log("Error: Contact form element not found");
    return;
  }

  const contactFullName = document.getElementById('fullname-con');
  const contactEmail = document.getElementById('email-con');
  const contactPhone = document.getElementById('phone-con');
  const contactSubject = document.getElementById('subject-con');
  const contactMessage = document.getElementById('message-con');

  contactForm3.addEventListener('submit' , (e) => {
    e.preventDefault();
    
    if (!contactFullName.value.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!contactEmail.value.trim() || !/\S+@\S+\.\S+/.test(contactEmail.value.trim())) {
      alert('Please enter a valid email address');
      return;
    }
    if (!contactPhone.value.trim() || !/^\d{11}$/.test(contactPhone.value.trim())) {
      alert('Please enter a valid 11-digit phone number');
      return;
    }

    let formData3 = {
      contactFullName: contactFullName.value.trim(),
      contactEmail: contactEmail.value.trim(),
      contactPhone: contactPhone.value.trim(),
      contactSubject: contactSubject.value.trim(),
      contactMessage: contactMessage.value.trim()
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function(){
      if(xhr.responseText =='OK'){
        alert('Your Message Send || تم ارسال رسالتك')
        contactFullName.value = '';
        contactEmail.value = '';
        contactPhone.value = '';
        contactSubject.value = '';
        contactMessage.value = '';
      }else{
        alert('Something Went Wrong || حدث خطأ');
      }
    }
    
    
    xhr.send(JSON.stringify(formData3));

    console.log(formData3);

  })
}

sendBookingForm();

sendSubForm();

sendContactForm();



// Scroll up button 
function addScrollUpFunctionality() {
  const span = document.querySelector(".scroll-up");

  window.onscroll = function () {
    this.scrollY >= 1000 ? span.classList.add("show") : span.classList.remove("show");
  };
  
  span.onclick = function() {
    window.scrollTo({top: 0, behavior: "smooth"});
  }
}
window.onload = function() {
  addScrollUpFunctionality();
}





function getPageList(totalPages , page , maxLength){
  function range(start , end){
      return Array.from(Array(end - start + 1), (_,i) => i + start);
  }

  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

  if(totalPages <= maxLength){
      return range(1 , totalPages);
  }

  if(page <= maxlength - sideWidth - 1 - rightWidth){
      return range(1 , maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1 , totalPages));
  }

  if(page >= totalPages - sideWidth - 1 - rightWidth){
      return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth , totalPages));
  }

  return range(1 , sideWidth).concat(0 , range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1 , totalPages))
}

$(function(){
  var numberOfItems = $(".doctor-content .card-doctor").length;
  var limitPerPage = 12; //How Many Card Items visible per a page
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
  var paginationSize = 3; //How many page elements visible in pagination
  var currentPage;

  function showPage(whichPage){
      if(whichPage < 1 || whichPage > totalPages) return false;

      currentPage = whichPage;

      $(".doctor-content .card-doctor").hide().slice((currentPage -1) * limitPerPage , currentPage * limitPerPage).show();

      $(".pagination li").slice(1 , -1).remove();

      getPageList(totalPages , currentPage , paginationSize).forEach(item => {
          $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
              .toggleClass("active" , item === currentPage).append($("<a>").addClass("page-link")
                  .attr({href: "javascript:void(0)"}).text(item ||  "...")).insertBefore(".next-page")
      });

      $(".previous-page").toggleClass("disable", currentPage === 1);
      $(".next-page").toggleClass("disable", currentPage === totalPages);
      return true;
  }

  $(".pagination").append(
      $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link")
          .attr({href : "javascript:void(0)"}).text("Prev")),
      $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link")
          .attr({href : "javascript:void(0)"}).text("Next"))
  );

  $(".doctor-content").show();
  showPage(1);

  $(document).on("click" , ".pagination li.current-page:not(.active)", function(){
      return showPage(+$(this).text());
  });

  $(".next-page").on("click", function(){
      return showPage(currentPage + 1);
  });

  $(".previous-page").on("click", function(){
      return showPage(currentPage - 1);
  });
});

// let thisPage = 1;
// let limit = 8;
// let list = document.querySelectorAll('.doctor-content .card-doctor');

// function loadItem(){
//     let beginGet = limit * (thisPage - 1);
//     let endGet = limit * thisPage - 1;
//     list.forEach((item, key)=>{
//         if(key >= beginGet && key <= endGet){
//             item.style.display = 'block';
//         }else{
//             item.style.display = 'none';
//         }
//     })
//     listPage();
// }
// loadItem();
// function listPage(){
//     let count = Math.ceil(list.length / limit);
//     document.querySelector('.listPage').innerHTML = '';

//     if(thisPage != 1){
//         let prev = document.createElement('li');
//         prev.innerText = 'PREV';
//         prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
//         document.querySelector('.listPage').appendChild(prev);
//     }

//     for(i = 1; i <= count; i++){
//         let newPage = document.createElement('li');
//         newPage.innerText = i;
//         if(i == thisPage){
//             newPage.classList.add('active');
//         }
//         newPage.setAttribute('onclick', "changePage(" + i + ")");
//         document.querySelector('.listPage').appendChild(newPage);
//     }

//     if(thisPage != count){
//         let next = document.createElement('li');
//         next.innerText = 'NEXT';
//         next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
//         document.querySelector('.listPage').appendChild(next);
//     }
// }
// function changePage(i){
//     thisPage = i;
//     loadItem();
// }





// Search Filter

function searchProduct() {
  // input filter lowercase
  const input = document.getElementById('filter').value.toLowerCase();

  const cardcontainer = document.getElementById('doctor-content');
  console.log(cardcontainer);

  const cards = cardcontainer.getElementsByClassName('card-doctor');
  console.log(cards);

  for(let i=0 ; i < cards.length ; i++){
    let title = cards[i].querySelector(".card-body h3.card-title");
    console.log(title);

    if(title.innerText.toLowerCase().indexOf(input) > -1){
      cards[i].style.display = 'block';
    }else{
      cards[i].style.display = 'none';
    }
  }
}




$(document).ready(function(){

  $('.about-us-3 .owl-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 45,
    dots: true,
    loop: true,
    responsive: {
        0:{
            items:1
        },
        992:{
            items:2
        }
    }
});

$('.service-3 .owl-carousel').owlCarousel({
  autoplay: false,
  smartSpeed: 1000,
  dots: true,
  loop: true,
  items: 1,
});

$('.pricing-1 .owl-carousel').owlCarousel({

  smartSpeed: 1000,
  margin: 45,
  dots: false,
  nav : true,
  navText : [
    '<i class="fa-sharp fa-solid fa-arrow-left"></i>',
    '<i class="fa-sharp fa-solid fa-arrow-right"></i>'
],
  responsive: {
    0:{
      items:1
  },
  992:{
      items:2
  },
  1200:{
      items:3
  }
  }
});

$(".caro-patient .owl-carousel").owlCarousel({
  autoplay: true,
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


$('.services-main .owl-carousel').owlCarousel({
  autoplay: true,
  smartSpeed: 1000,
  loop: false,
  navText : [
    '<i class="fa-sharp fa-solid fa-arrow-left"></i>',
    '<i class="fa-sharp fa-solid fa-arrow-right"></i>'
],
nav : true,
  dots: false,
  responsive: {
    0:{
      items:1
    }, 
    992:{
      items:2
    }
  }
});


});





// Splider in Doctors Page


document.addEventListener('DOMContentLoaded', function () {
  new Splide('#splide1', {
    perPage: 2,
    drag   : 'free',
    perMove: 1,
     gap:5,
     arrows:false,
  }).mount();
});


document.addEventListener('DOMContentLoaded', function () {
new Splide( '#splide2', {
  direction: 'ttb',
  height   : '12rem',
  type   : 'loop',
  drag   : 'free',
  focus  : 'center',
  arrows     : false,
  perPage: 1,
  autoScroll: {
    speed: 1.5,
  },
} ).mount( window.splide.Extensions );
});


document.addEventListener('DOMContentLoaded', function () {
  new Splide('#splide3', {
    perPage: 3,
    drag   : 'free',
    perMove: 3,
     gap:10,
     pagination: false,
     breakpoints: {
      768: {
        perPage: 2,
        perMove: 2
      },
      480: {
        perPage: 1,
        perMove: 1
      },
    },
  }).mount();
});


document.addEventListener('DOMContentLoaded', function () {
  new Splide('#splide4', {
    perPage: 6,
    drag   : 'free',
    direction: 'ltr' | 'rtl',
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

      // Home Insurance 

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#insurance', {
    perPage: 5,
    drag   : 'free',
    direction: 'ltr',
    perMove: 2,
     gap:10,
     arrows:false,
     pagination:false,
     autoplay:true,
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
        perPage: 1,
        perMove: 1
      },
    },
    
  }).mount();
});


      document.addEventListener('DOMContentLoaded', function () {
        new Splide('#splide-p5', {
          direction: 'ttb',
          height   : '20rem',
          autoplay: 'true',
          type   : 'loop',
          perMove: 1,
           arrows:false,         
        }).mount();
      });

      document.addEventListener('DOMContentLoaded', function () {
        new Splide('#home-service', {
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


      $('.h-gallery .splide .view-img').magnificPopup({
        type: 'image',
        gallery:{enabled:true}
      });
      
      document.addEventListener('DOMContentLoaded', function () {
        new Splide('#home-gallery', {
          direction: 'ltr',
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
              perPage: 1,
            },
          },
          autoScroll: {
            speed: 1,
          },     
        }).mount( window.splide.Extensions );
      });
      
      document.addEventListener('DOMContentLoaded', function () {
        new Splide( '#patient-splide', {
          direction: 'ltr',
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
        new Splide( '#testimonials', {
          direction: 'ltr',
          perPage: 2,
          gap : 20 ,
          type   : 'loop',
          drag   : 'free',
          arrows: false,
          perPage: 2,
          breakpoints:{
            1024:{
              perPage: 1
            }
          }
        } ).mount();
        });




const link = 'https://www.facebook.com/photo?fbid=2909304359092540&set=a.1733070683382586'//encodeURI(window.location.href);
const msg = encodeURIComponent('Hey, Check This Out');
const title = encodeURIComponent(document.querySelector('title').textContent);

const fb = document.querySelector('.facebook');
fb.href = `https://www.facebook.com/share.php?u=${link}`;

const twitter = document.querySelector('.twitter');
twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

const linkedIn = document.querySelector('.linkedin');
linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;

const whatsapp = document.querySelector('.whatsapp');
whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;






var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


const myModal = new bootstrap.Modal('#exampleModal');


window.addEventListener('DOMContentLoaded', () => {
  myModal.show();
});





