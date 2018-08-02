var last_known_scroll_position = 0;
var ticking = false;
let vh = window.innerHeight;

function getPosition(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
}

function headerAnimation(wScroll) {
  var headHeight = document.querySelector('.header').style.height;

  if (wScroll < getPosition(document.querySelector('.snail-box'))){
    document.querySelector('.title').style.lineHeight = 10 - wScroll/65 + 'px';
    document.querySelector('.logo').style.top = 10 - wScroll/65 + '%';
    document.querySelector('.header').style.filter = 'drop-shadow(0 0 0.75rem rgba(213, 197, 169, 0))'
    document.querySelector('.header').style.height = 75-(wScroll/8) + 'vh';
    document.querySelector('.title').style.opacity = 1/(wScroll/450);
    document.querySelector('.title').style.fontSize = 5 - (wScroll/150)+ 'vw' ;
  } else {
    document.querySelector('.header').style.filter = 'drop-shadow(0 0 0.75rem rgba(172, 160, 164, .2))';
    document.querySelector('.header').style.height = '70px';
    document.querySelector('.logo').style.top = '0';
    document.querySelector('.title').style.lineHeight = '0';
    document.querySelector('.title').style.fontSize = '1.49067vw' ;

  }
};

function snailAnimation(wScroll) {
  let activeY = getPosition(document.querySelector('.snail-box')) - (vh*.5);
  let inactiveY = getPosition(document.querySelector('.snail-box')) + (vh*.6);
  if (wScroll > activeY && wScroll < inactiveY) {
    document.querySelector('#snail').style.transform = 'translateX(' + (-8 + (wScroll/75)) + 'vh) translateY(' + (wScroll/10) + 'px)';
    document.querySelector('.slime').style.transform = 'translateY(' + (wScroll/10) + 'px)';
    document.querySelector('.slime').style.width =   -1 + (wScroll/75) + 'vh';
    document.querySelector('.snail-box').style.opacity = 1;
    document.querySelector('.snail-box').style.transform = 'translateX(0px)';
    document.querySelector('.snail-text').style.transform = 'translateY(' + (wScroll/5) + 'px)';
  }
}

function showBackground(wScroll) {
  let vh = window.innerHeight;
  if (wScroll < (getPosition(document.querySelector('.snail-box')) + (vh*.55))) {
    document.querySelector('.text-bg').style.transform = 'translateY(150px)';
    document.querySelector('.text-bg').style.opacity = 0;
  } else {
    document.querySelector('.text-bg').style.opacity = 1;
    document.querySelector('.text-bg').style.position = 'fixed';
    document.querySelector('.text-bg').style.transform = 'translateY(0px)';
  }
}

function activateGear(wScroll) {
  let vh = window.innerHeight;
  let activeY = (getPosition(document.querySelector('.pictures')) + (vh*.32));

  if (wScroll > activeY) {
    document.querySelector('.gear-one').style.opacity = .15 + ((wScroll-activeY)/275);
    document.querySelector('.gear-shadow').style.filter = 'drop-shadow(7px 7px 0.2rem rgba(62, 80, 99, .4))'
  } else {
    document.querySelector('.gear-one').style.opacity = .15;
    document.querySelector('.gear-shadow').style.filter = 'drop-shadow(0 0 0.75rem rgba(213, 197, 169, 0))'
  }
}

function rotateGear(wScroll) {
  let vh = window.innerHeight;
  let activeY = (getPosition(document.querySelector('.pictures')) + (vh*.4))

  if (wScroll > activeY) {
    document.querySelector('.gear-one').style.transform = 'translateX(.85vw) translateY(24.8vmin) rotateZ(' + (((wScroll*.825)- activeY)/5.87) + 'deg)';
  }
}

function hideBackground(wScroll) {
  let vh = window.innerHeight;
  let activeY = (getPosition(document.querySelector('.pictures')) + (vh*.75))
  let inactiveY = (getPosition(document.querySelector('.pictures')) + (vh*3.2));

  if (wScroll > activeY) {
    let scroll = wScroll - activeY;
    document.querySelector('.text-bg').style.transition = '0s';
    document.querySelector('.text-bg').style.transform = 'translateY(-' + (scroll/1.5)+ 'px)';
  } else {
    document.querySelector('.text-bg').style.transition = '1s'
  }
}

function attachGear(wScroll) {
  let vh = window.innerHeight;
  let activeY = (getPosition(document.querySelector('.pictures')) + (vh*1.18));
  let gearY = (getPosition(document.querySelector('.g3')));
  let inactiveY = (getPosition(document.querySelector('.pictures')) + (vh*3.2));

   if (wScroll > activeY && wScroll < inactiveY) {
    document.querySelector('.gear-one').style.transition = '0s';
    document.querySelector('.gear-group').style.marginTop = 150 - (wScroll - activeY)/10.34 + 'vh';
    document.querySelector('.gear-shadow').style.transform = 'translateY(' + (wScroll - activeY)/1.25+ 'px)';
    document.querySelector('.final-bg').style.height = '0px';
    document.querySelector('.final-bg').style.width = '0px';

  } else if (wScroll < activeY) {
    document.querySelector('.gear-shadow').style.transform = 'translateY(0px)';
    document.querySelector('.gear-one').style.transform = 'translateX(.85vw) translateY(24.8vmin) rotate(0deg)';
    document.querySelector('.gear-one').style.transition = '.2s';
    document.querySelector('.final-bg').style.height = '0px';
    document.querySelector('.final-bg').style.width = '0px';
  } else {
    document.querySelector('.gear-group').style.marginTop = '.19922vh';
    rotateAll(wScroll - activeY);
    thatsAllFolks(wScroll - (activeY*1.56));
  }
}

function rotateAll(scroll) {
  document.querySelector('.g1').style.transform = 'translate(-6.5vw, 4vh) rotate(' + (9) + (scroll/6.8) + 'deg)';
  document.querySelector('.g2').style.transform = 'translate(-5.5vw, 17vh) rotate(-' + (scroll/6.8) + 'deg)';
  document.querySelector('.g3').style.transform = 'translate(-.2vw, .5vh) rotate(-' + 11 + (scroll/10.3) + 'deg)';
  document.querySelector('.g4').style.transform = 'translate(1.3vw, 20.3vh) rotate(' + 14 + (scroll/6.8) + 'deg)';
  document.querySelector('.g5').style.transform = 'translate(-2.2vw, 31.2vh) rotate(-' + 19 + (scroll/6.8) + 'deg)';
}

function thatsAllFolks(scroll) {
  document.querySelector('.final-bg').style.height = scroll/2 + 'px';
  document.querySelector('.final-bg').style.width = scroll/2 + 'px';
}

function colorBackground(wScroll) {
  let vh = window.innerHeight;
  let activeY = (getPosition(document.querySelector('.pictures')) + (vh*3.6))

  if (wScroll > activeY){
    document.querySelector('.text-bg').style.transform = 'translateY(-1455px)';

  }
}

window.addEventListener('scroll', function(e) {

  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
        headerAnimation(last_known_scroll_position);
        snailAnimation(last_known_scroll_position);
        showBackground(last_known_scroll_position);
        activateGear(last_known_scroll_position);
        rotateGear(last_known_scroll_position);
        hideBackground(last_known_scroll_position);
        attachGear(last_known_scroll_position);
        colorBackground(last_known_scroll_position);
        ticking = false;
    });
    ticking = true;
    console.log(window.innerHeight + ' x ' + window.innerWidth);
  }
});
