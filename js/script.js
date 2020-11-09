/*
===========
preloader
===========    
*/
let preloader = document.querySelector('.preloader');
window.addEventListener("load", ()=> {
  preloader.classList.add("hide-preloader");
    
})

var div = document.querySelectorAll(".client-container .df-4 ");
// btn left and right
var l = document.querySelector(".l");
var r = document.querySelector(".r");

// option
var current = 0;
// right btn 
if (r) {
    r.addEventListener("click", function() {
        current++;   
        if (current <= 4) {
            div.forEach(ele =>{
                var size = ele.offsetWidth;
                ele.style.transform =`translateX(${-size * current}px)`;
            })
        } else{
            current = 4
        }
    }) 
}
// left btn
if (l) {
    l.addEventListener("click",  function () {
        if (current > 0) {
            current--;
            div.forEach(ele =>{
                var size = ele.offsetWidth;
                ele.style.transform =`translateX(${-size * current}px)`
            })
        } else {
            current = 0
        }
    })
}

/*  
    1. navbar 
    2. pop up
    3. counter 
*/

/*  start navbar  */
document.querySelector(".btn-toggler").addEventListener("click", function(){
    document.querySelector(".navbar-nav").classList.toggle('show');
});

/*  pop up */
function popup() {
   
    document.querySelectorAll(".work-item i").forEach( ele => {
        ele.addEventListener("click", () => {
            html = `<div class="pop-overlay">
            <div class="popup container">
                <button class="close">x</button>
                <iframe width="800" height="315" src="https://www.youtube.com/embed/tWugCvVKoUc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>` 
            document.body.insertAdjacentHTML("afterbegin", html);
            document.querySelector('.pop-overlay').firstElementChild.classList.add("active")

        });
        
        
    })
}
popup()

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')){
        document.querySelector('.pop-overlay').remove();
    }
})


/*
    start counter
*/
var counter = document.querySelectorAll(".counter-box h2");
var speed = 100;

function count() {
    counter.forEach(num => {

        function updateCount() {
            var target = parseInt(num.dataset.count);
            var div = +num.innerHTML
            var inc = target / speed
            //num.innerHTML = target /speed
    
            if (div < target) {
                num.innerText = Math.round(div + inc);
                setTimeout(updateCount, 100);
            } else {
                num.innerText = target;
            }
        }
        updateCount()
    })
   
}


var counters = document.querySelector(".counters");
window.onscroll = function () {
    if (counters) {
        var top  =  counters.offsetTop;
        var countHeight = counters.offsetHeight;
        var wHeight = this.innerHeight;
        
        var wScrollTop = this.pageYOffset

        var ele = counters.getBoundingClientRect().top;
        if (wScrollTop > (top + 150 - wHeight)) {
            count()
        }
    }

};



/*
    blog update section
*/ 

// float-left
var floatDiv = document.querySelectorAll(".d-flex");
// btn left and right
var left = document.querySelector(".btn-left");
var right = document.querySelector(".btn-right");

// option
var current = 0;

// right btn 
if (right) {
    right.addEventListener('click', function () {
        rightSlider(floatDiv);

        changeBullets();
    })
}

// left btn
if (left) {
    left.onclick = function () {
        leftSlider(floatDiv)

        changeBullets()
    }
}

// bulltes
document.querySelectorAll(".bulltes span").forEach((span, index) => {
    span.addEventListener('click', e => {
        
        document.querySelectorAll(".bulltes span").forEach( (removeActive) => {
            removeActive.classList.remove("active")
        })
        e.target.classList.add("active")

        
        if (e.target) {
            floatDiv.forEach(ele =>{
                var size = ele.offsetWidth;
                ele.style.transform =`translate3d(${-size * index}px, 0, 0)`;
            })
        }
    })
})
// change Bulltes
function changeBullets() {
    if (document.querySelector('.bulltes .current-' + current)) {
        // if current less than or equal 4
        if (current <= 4 ) {
            // remove class active and add class active to target span
            document.querySelectorAll(".bulltes span").forEach( (removeActive) => {
                removeActive.classList.remove("active")
            })
            document.querySelector('.bulltes .current-' + current).classList.add("active")
        } 
    }
}

// animation 
setInterval(() => {
     
    // call rightSlider function
    rightSlider(floatDiv);

    changeBullets()

}, 4000); 

function rightSlider(element) {
    // incress current slider
    current++;   
    // check if current less than 4
    if (current >= 5) {
        current = 0
    }
    element.forEach(ele =>{
        var size = ele.offsetWidth;
        ele.style.transform =`translate3d(${-size * current}px, 0, 0)`;
    })
        
}

function leftSlider(element) {
    // decresse current slider
    current--;
    // check if current slider bigger than 0
    if (current < 0) {
        current = 4
    }
    element.forEach(ele =>{
      var size = ele.offsetWidth;
      ele.style.transform =`translate3d(${-size * current}px, 0, 0)`
   })
        
}
/******** */

/*   start portolio */
var controlNav = document.querySelectorAll('.control-nav li');

// select  element li
controlNav.forEach( ele => {
    // add event to element li
    ele.addEventListener("click", function(e) {
         
       // remove class active to li and add active to target li 
       document.querySelectorAll(".control-nav li").forEach(li => {
            li.classList.remove("active")
       })
       e.target.classList.add("active")

       
       document.querySelectorAll(".portfolio .df-4").forEach(box => {
           // box.style.display = "none";
           box.classList.remove("active")
           box.classList.add("hide")
       })

       document.querySelectorAll(e.target.dataset.filter).forEach(element => {
            // element.style.display = "block"
            element.classList.add('active')
       });
    })
})


/***********  start slider team  ************** */
var teamItem = document.querySelectorAll('.team-item');
var rightIcon = document.querySelector('.right-icon');
var leftIcon = document.querySelector('.left-icon');
var teamContainer = document.querySelector(".client-container");

var currentSlider = 0;
var duration = 4000;
var animation;

// right button
if (rightIcon) {
    rightIcon.addEventListener('click', ()=> {
        next(teamItem)
    })
}

// left button
if (leftIcon) {
    leftIcon.addEventListener('click', ()=> {
        prev(teamItem);
    })
}

// next slide
function next(ele) {
    // incress current slider
    currentSlider++;
    // if current bigger than 3
    if (currentSlider > 3) {
        currentSlider = 0 
    }
    // make transform to all div team item
    ele.forEach(box => {
        var size = box.clientWidth;
        box.style.transform = `translate(${-size * currentSlider}px)`;
    })
}

// prev slide
function prev(element) {
    // decresse current slider
    currentSlider--;
    // check if current slider bigger than 1
    if (currentSlider < 0) {
        currentSlider = 3
    } 
    element.forEach(box => {
        var size = box.clientWidth;
        box.style.transform = `translate(${-size * currentSlider}px)`;
    })
}

// animation slider
function startSlide() {
    animation = setInterval(function() {
        next(teamItem)
    }, duration)
}
startSlide()



