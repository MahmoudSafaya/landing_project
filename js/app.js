
const ul = document.querySelector('#navbar_list');

const sections = document.querySelectorAll('section');

const fragment = document.createDocumentFragment();

// loop to add navbar items
for(let i=0; i<sections.length; i++) {
  const li  = document.createElement('li');
  li.textContent = sections[i].getAttribute('data-nav');
  fragment.appendChild(li);
} 

ul.appendChild(fragment);

const ulChildren = ul.children;

//on clicking an item of navbar, it scroll to it's section
const li = document.querySelectorAll('li');
li.forEach(element => {
  element.addEventListener('click', function () {
    const section = document.getElementById(element.textContent);
    section.scrollIntoView({behavior: 'smooth', block: 'center'});

    //add the active class to the nav item of the viewport section
    for(let i=0; i<ulChildren.length; i++) {
      //remove active class form the other items
      ulChildren[i].classList.remove('active_section');
      element.classList.add('active_section');
      
    }
  });
});

//To make which section is being viewed while scrolling through the page.
window.addEventListener('scroll', () => {
  for(let i=0; i<sections.length; i++) {
    li[i].classList.remove('active_section');
    if(sections[i].classList.contains('activeSec')) {
      ulChildren[i].classList.remove('active_section');
      li[i].classList.add('active_section');
    } 
  }
});


//Hide navbar when not scrolling
const navbar = document.querySelector('.navbar_menu');

let scrollTimeout = null;
const scrollendDelay = 1000; // ms

window.addEventListener('scroll', function() {

    if ( scrollTimeout === null ) {
      scrollbeginHandler();
    } else {
      clearTimeout( scrollTimeout );
    }
    scrollTimeout = setTimeout( scrollendHandler, scrollendDelay );   
    
});

function scrollbeginHandler() {
    // this code executes when scroll begins
    navbar.style.display = "block";
}


let mouse = false;

function scrollendHandler() {
    // this code executes when scroll ends
    if(mouse || window.scrollY < 195) {
      navbar.style.display = 'block';
    } else {
      navbar.style.display = 'none';
      scrollTimeout = null;
    }
}

//Show navbar when mouse is over it
navbar.addEventListener('mousemove', () => {
  mouse = true;
});

//Hide navbar when mouse leaves
navbar.addEventListener('mouseleave', function() {
  if(window.scrollY > 195) {
    navbar.style.display = 'none';
  }
  mouse = false;

});

//show the client which section is in the viewport
window.addEventListener('scroll', () => {
  sections.forEach(element => {
    const position = element.getBoundingClientRect();

    for(let i=0; i<sections.length; i++) {
      // checking whether fully visible
      if(position.top >= 0 && position.bottom <= window.innerHeight) {
        sections[i].style.border = 'none';
        sections[i].classList.remove('activeSec');

        element.style.border = '2px solid #080';
        element.classList.add('activeSec');
      }
    }
  });
});


//to top button code
const toTop = document.querySelector('.toTop');

window.addEventListener('scroll', () => {
  if(window.pageYOffset > 400) {
    toTop.style.display = 'block';
  } else {
    toTop.style.display = 'none';
  }
});

toTop.addEventListener('click', () => {
  window.scrollTo(0, 0);
});