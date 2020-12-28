// DATE CREATED: 20150618

// (NOTE) ADD TEXT BLUR IS - A LITTLE LATE? KINDA JARRING
// (NOTE) REFRESH W/ '/#' THROWS 'document.getElement... is null error'
// (NOTE) ADD LOGIC COUNT TO HIDE 'section p:last-child::after' AFTER A FEW SLIDES
// (NOTE) ADD PARAMETER ON EACH ARTICLE SLIDE FOR PLANNED INDEXING IN THE FUTURE

// CONSOLE WATERMARK
console.log("       _       __             _        _                                 ");
console.log(" _ __ (_) ___ / _| ___  _ __ | |_ __ _(_)_ __   ___   ___ ___  _ __ ___  ");
console.log("| '_ \\| |/ __| |_ / _ \\| '_ \\| __/ _` | | '_ \\ / _ \\ / __/ _ \\| '_ ` _ \\ ");
console.log("| | | | | (__|  _| (_) | | | | || (_| | | | | |  __/| (_| (_) | | | | | | ");
console.log("|_| |_|_|\\___|_|  \\___/|_| |_|\\__\\__,_|_|_| |_|\\___(_\\___\\___/|_| |_| |_| \n\n");
console.log("------------------------------------------------------------------------------------");
console.log('DEVELOPER, EH? GET AT ME ON TWITTER @NGPFONTAINE');
console.log("ALSO, TRY THE COMMAND \'CURSE\' A FEW TIMES");
console.log("PROFESSIONAL HUH? ...GF DIDN'T THINK IT WAS VERY FUNNY");
console.log("------------------------------------------------------------------------------------\n\n");
console.log('document.referrer ' + document.referrer);

var urlQuery = '';
// CHECK URL QUERY AND RUN cmdCheck()
// var urlString = window.location.toString();
var urlString = '';

// WRITE CURRENT YEAR
var year = new Date().getFullYear();
document.getElementById("year-container").innerHTML = year;

var theHeight = window.innerHeight;
var heightSetFactor;
var heightCenterFactor;
var theHeightDiv;
var urlSearchChar = '#';
var cmdInput;
var cmdInputRaw;
var cmdInputCombo = '';
var cmdInputIDName = 'scroll-home';
var cmdInputIdDom = document.getElementById(cmdInputIDName);
var cmdPrev = '';
var cmdPrevArray = [];
var cmdListUpdate = "";
var uiTabVal = 0;
var sectionTotalHeight;
var scrollContainerHeight;
var scrollNo = 0;
var scrollHeightInc = 0;
var scrollDistCalc;
var scrollBarHeightCalc;
var scrollBarRenderHeightPx;
var vDuration;
var blurEnable = true;

var scrollTopStartId;
var scrollTopStartClass;
var scrollTopStart;
var scrollTopStartId;
var scrollTopStart;

var scrollOpStart = 20;
var downKeydownEnable = true;
var upKeydownEnable = true;
var scrollAmt = 8;
var scrollShiftEnable = true;

var articleHeadingCount = 0;
var articleNextEnable = true;
var sectionArticleNo;
var cmdInputFigureDom;

// LET'S CACHE SOME DOM ELEMENTS TO VARS
// var containerCmd = document.getElementById('cmd-container');
var cmdListDom = document.getElementById('cmd-list');
var cmdInputHiddenDom = document.getElementById('cmd-input-hidden');

var scrollArrowsBotDom = document.querySelectorAll('.scroll-arrow-bot');
var scrollArrowsTopDom = document.querySelectorAll('.scroll-arrow-top');
var instructionsScrollDom = document.querySelectorAll('.instructions-scroll');

var sectionInnerDom = document.querySelectorAll('.section-inner');
var sectionsDom = document.getElementsByTagName('section');

var scrollBarMoveDom = document.querySelectorAll('.scroll-bar-move');
// (NOTE) IF .section-INNER PADDING CHANGES THIS NEEDS TO CHANGE
var sectionPadTop = parseInt(window.getComputedStyle(sectionInnerDom[0], null).getPropertyValue('padding-top'));
var sectionPadTopAndBot = sectionPadTop * 2;
// var sectionPadTopNum = Number(sectionPadTop);
var sectionVertPad = 140;

var startHelpInfo = "<span class='font-note'>(NOTE)</span> \"Commands are issued uppercase automatically - no need for caps-lock/shift\" <br /><br /><span class='font-note'>(NOTE)</span>  \"If you ever lose cursor focus of the command line re-focus with the TAB key\" <br /><br /><span class='font-note'>(NOTE)</span>  \"You can always get back to the instructions with the <span class='font-note'>HOME</span> command\"\n\n";

var cmdArrayCurseWords = ['fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker', 'motherfucker', 'asscock', 'asshead', 'asslicker', 'asslick', 'assnigger', 'nigger', 'asssucker', 'bastard', 'bitch', 'bitchtits', 'bitches', 'bitch', 'brotherfucker', 'bullshit', 'bumblefuck', 'buttfucka', 'fucka', 'buttfucker', 'buttfucka', 'fagbag', 'fagfucker', 'faggit', 'faggot', 'faggotcock', 'fagtard', 'fatass', 'fuckoff', 'fuckstick', 'fucktard', 'fuckwad', 'fuckwit', 'dick', 'dickfuck', 'dickhead', 'dickjuice', 'dickmilk', 'doochbag', 'douchebag', 'douche', 'dickweed', 'dyke', 'dumbass', 'dumass', 'fuckboy', 'fuckbag', 'gayass', 'gayfuck', 'gaylord' , 'gaytard', 'nigga', 'niggers', 'niglet', 'paki', 'piss', 'prick', 'pussy', 'poontang', 'poonanny', 'poonany', 'porchmonkey', 'porch monkey', 'poon', 'queer', 'queerbait', 'queerhole', 'queef', 'renob', 'rimjob', 'ruski', 'sandnigger', 'sand nigger', 'schlong', 'shitass', 'shitbag', 'shitbagger', 'shitbreath', 'chinc', 'carpetmuncher', 'chink', 'choad', 'chode', 'clitface', 'clusterfuck', 'cockass', 'cockbite', 'cockface', 'skank', 'skeet', 'skullfuck', 'slut', 'slutbag', 'splooge', 'twatlips', 'twat', 'twats', 'twatwaffle', 'vaj', 'vajayjay', 'va-j-j', 'wank', 'wankjob', 'wetback', 'whore', 'whorebag', 'whoreface', 'shitfucker', 'ass', 'shitfucker', 'shitfuck'];

// PARSE POST H1s AND PUSH TO ARRAY FOR cmdCheck()
var cmdArrayMenuItems = [];
var mainMenuHeadings = document.querySelectorAll('.menu-main-h1');
for (i=0; i<mainMenuHeadings.length; i++) {
  var headingObj = mainMenuHeadings[i].innerHTML;
  var headingString = String(headingObj.toLowerCase());
  cmdArrayMenuItems.push(headingString);
}

var cmdArrayNavigation = ["back"];
var cmdArrayHome = ["home", "help", "refresh", "index", "welcome", "splash"];

/*** END OF VARS ***/

// for (var i=0; i<sectionsDom.length; i++) {
//   var text = document.createTextNode("<div>FOO</div>");
//   sectionsDom[i].parentNode.insertBefore(text, sectionsDom[i]);
// }

function makeid() {
  var text = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789!@#$%^*()"

  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// LOAD
window.onload = function() {
  introAnimation();
}

var introTimeouts = [];
var introAnimRunning = true;
var postLoad = false;

function introAnimation() {
  const baseTime = 100
  const intro = {
    userId: document.getElementById('user-id'),
    skip: document.getElementById('intro-msg-skip'),
    m01: document.getElementById('intro-msg-01'),
    m02: document.getElementById('intro-msg-02'),
    m03: document.getElementById('intro-msg-03'),
    barBg: document.getElementById('intro-bar-bg'),
    barMove: document.getElementById('intro-bar-move')
  }

  // calc intro bar
  const bar = {
    w: intro.barMove.clientWidth,
    fps: 30,
    raf: undefined,
    move: undefined,
    flag: true
  }

  var now
  var then = Date.now()
  const interval = 1000/bar.fps
  var delta

  bar.rate = (bar.w/(baseTime+9900)/bar.fps)*1000
  bar.move = bar.w-bar.rate
  function barMove() {

    now = Date.now()
    delta = now - then

    if (bar.flag) {
      bar.raf = requestAnimationFrame(barMove)
      if (delta > interval) { 
        then = now - (delta % interval)
        bar.move -= bar.rate
        intro.barMove.style.transform = 'translateX(-' + bar.move + 'px'
      }
    } else {
      cancelAnimationFrame(bar.raf)
      cmdClear()
    }
  }
  barMove()

  // 01
  introTimeouts[0] = setTimeout(function() {
    intro.userId.innerHTML = ' _' + makeid()
    intro.skip.classList.add('show')
    intro.m01.classList.add('show')
    intro.m01.classList.add('move')
    intro.barBg.classList.add('show')
    intro.barMove.classList.add('show')
  },baseTime)
  // 01 HIDE
  introTimeouts[1] = setTimeout(function() {
    intro.m01.classList.remove('show')
  },baseTime+2500)
  // 02 SHOW
  introTimeouts[2] = setTimeout(function() {
    intro.m02.classList.add('show')
    intro.m02.classList.add('move')
  },baseTime+3300)
  // 02 HIDE
  introTimeouts[3] = setTimeout(function() {
    intro.m02.classList.remove('show')
  },baseTime+7000)
  // 03 SHOW
  introTimeouts[4] = setTimeout(function() {
    intro.m03.classList.add('show')
    intro.m03.classList.add('move')
  },baseTime+7700)
  // 03 HIDE
  introTimeouts[5] = setTimeout(function() {
    intro.m03.classList.remove('show');
    document.getElementById('cmd-outer').classList.add('cmd-in');
    document.getElementById('cmd-list-container').classList.add('cmd-in');
    document.getElementById('footer').classList.add('cmd-in');
    document.getElementById('header').classList.add('move-in');
    intro.barMove.classList.remove('show');
    intro.barBg.classList.remove('show');
    intro.skip.style.display = 'none';
    bar.flag = false;
  },baseTime+10200)
  introTimeouts[6] = setTimeout(function() {
    loadWelcome()
    postLoad = true;
  },baseTime+11200)
}

function introAnimCancel() {
  let introMsgs = document.getElementsByClassName('intro-msg');
  for (var i=0; i<introTimeouts.length; i++) {
    clearTimeout(introTimeouts[i]);
  }
  for (var j=0; j<introMsgs.length; j++) {
    introMsgs[j].classList.remove('show');
  }
  document.getElementById('cmd-outer').classList.add('cmd-in');
  document.getElementById('cmd-list-container').classList.add('cmd-in');
  document.getElementById('footer').classList.add('cmd-in');
  document.getElementById('header').classList.add('move-in');
  document.getElementById('intro-msg-skip').style.display = 'none';
  document.getElementById('intro-bar-bg').classList.remove('show');
  document.getElementById('intro-bar-move').classList.remove('show');
  postLoad = true;
  loadWelcome();
  cmdClear();
}

// FOCUS INPUT ON CLICK ANYWHERE
document.addEventListener('click', function() {
  cliInputFocus();
  console.log('CLICK focus');
});

// HIDE CURSOR AFTER DELAY
document.addEventListener('mousemove', function() {
  document.getElementsByTagName('html')[0].style.cursor = 'auto';
  setTimeout(function() {
    document.getElementsByTagName('html')[0].style.cursor = 'none';
  }, 1200);
});

function loadWelcome() {
  // console.log(urlQuery.length + ' is urlQuery.length');
  cliInputFocus();
  urlString = window.location.toString();

  // IF NO URL QUERY, urlQuery WILL STILL = '';
  if (urlString.split(urlSearchChar)[1] !== undefined) {
    console.log('there is a urlQuery');
    urlQuery = urlString.split(urlSearchChar)[1];
    setTimeout(function() {
      console.log('cmdCheck(urlQuery) with "' + urlQuery + '"');
      // cmdCheck(urlQuery, 2000);
      // (NOTE) THIS WORKS, BUT IS SUPER FUGLYY, NEED TO FIX
      cmdCheck('home', 1300);
      setTimeout(function() {
        cmdCheck(urlQuery, 400);
      }, 200);
    }, 1000);
  }
  // urlQuery IS UNDEFINED, I.E. BLANK
  else {
    console.log('no urlQuery, running "home"');
    cmdClear();
    setTimeout(function() {
      cmdCheck('home', 1300);
      postLoad = true;
      cmdClear();
    }, 1000);
  }

  cmdListDom.innerHTML = startHelpInfo;

}

var cursor;

for (i=0; i<sectionInnerDom.length; i++) {
  sectionInnerDom[i].style.maxHeight = (theHeight/1.6);
}

hideShowScrollArrows('top', 'none');

// BACKSPACE LOGIC
var backEnable = true;

// SCROLL .section-INNER ON UP & DOWN ARROW
document.addEventListener('keydown', function (e) {

  // SPACE KEY
  if (e.which == 32) {
    if (introAnimRunning) {
      introAnimRunning = false;
      introAnimCancel();
    }
  }

  // BACKSPACE KEY
  if (e.which == 8) {
    e.preventDefault();
    var cmdVal = cmdInputHiddenDom.value;
    cmdInputHiddenDom.value = cmdVal.substring(0, cmdVal.length-1);
    // Move cursor

    // if (backEnable) {
    //   var cmdVal = cmdInputHiddenDom.value;
    //   cmdInputHiddenDom.value = cmdVal.substring(0, cmdVal.length-1);
    //   backEnable = false;
    // }
    // cmdInputHiddenDom.addEventListener('keyup', function(e) {
    //   backEnable = true;
    // });

  }



  // KEY TAB
  if (e.which == 9) {
    e.preventDefault();
  }

  // KEY SHIFT
  // if (e.which == 16) {
  //   e.preventDefault();
  //
  //   cliInputFocus();
  //
  //   if (scrollShiftEnable) {
  //     scrollShiftEnable = false;
  //     scrollAmt = 16;
  //   }
  //
  //   document.addEventListener('keyup', function(f) {
  //     if (f.which == 16) {
  //       f.preventDefault();
  //
  //       if (!scrollShiftEnable) {
  //         scrollShiftEnable = true;
  //
  //         scrollAmt = 8;
  //
  //         cliInputFocus();
  //
  //         // var scrollDecel = setInterval( function() {
  //         //   if (scrollAmt > 8 && scrollAmt !== 8) {
  //         //     scrollAmt--;
  //         //     console.log(scrollAmt + ' is scrollAmt');
  //         //   }
  //         //   else {
  //         //     clearInterval(scrollDecel);
  //         //     console.log('interval cleared');
  //         //   }
  //         // }, 70);
  //
  //       }
  //     }
  //   });
  //
  // }

  // (NOTE) NEED DO DISABLE BOTH BELOW UNTIL KEYUP TO PREVENT MULTIPLE FIRES
  // ARROW RIGHT FOR ARTICLES
  else if (e.which == 39) {
    e.preventDefault();

    // cmdInputFigureDom = cmdInputIdDom.querySelectorAll('article');
    // console.log(cmdInputIDName + ' cmdInputIDName');
    // if (cmdInputFigureDom.length > 0) {
      // for (i=0; i<cmdInputFigureDom.length + 1; i++) {
      //   cmdInputIdDom.querySelectorAll('article')[i].style.display = 'none';
      //   console.log('hiding figures on right key down');
      // }
      // cmdInputIdDom.querySelectorAll('article')[articleHeadingCount].style.display = 'table-cell';
    // }

    if (articleHeadingCount < cmdInputIdDom.querySelectorAll('h3').length - 1 && articleNextEnable) {

      for ( i=0; i<sectionArticleNo; i++) {
        cmdInputIdDom.getElementsByClassName('no-dot')[i].className = 'no-dot';
      }
      cmdInputIdDom.getElementsByClassName('no-dot')[articleHeadingCount + 1].className = 'no-dot no-dot-sel';

      articleHeadingCount++;
      articleNextEnable = false;

      for (var i=0; i<cmdInputIdDom.querySelectorAll('article').length; i++) {
        cmdInputIdDom.querySelectorAll('article')[i].classList.remove("active")
      }
      cmdInputIdDom.querySelectorAll('article')[articleHeadingCount].classList.add("active")
      Velocity(cmdInputIdDom.querySelectorAll('article')[articleHeadingCount],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -70, easing: 'ease-out', duration: 600, axis: 'x', opacity: 1 });
      Velocity(cmdInputIdDom.querySelectorAll('h3')[articleHeadingCount],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -70, easing: 'ease-out', delay: 200, duration: 10} );

    }

    else if (articleNextEnable) {
      articleNextEnable = false;
      for (var i=0; i<cmdInputIdDom.querySelectorAll('article').length; i++) {
        cmdInputIdDom.querySelectorAll('article')[i].classList.remove("active")
      }
      cmdInputIdDom.querySelectorAll('article')[articleHeadingCount].classList.add("active")
      Velocity(cmdInputIdDom.querySelectorAll('article')[articleHeadingCount],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -30, easing: 'ease-out', duration: 100, axis: 'x', opacity: 1 });
      Velocity(cmdInputIdDom.querySelectorAll('article')[articleHeadingCount],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -70, easing: 'ease-in', duration: 100, axis: 'x', opacity: 1 });
    }

    document.addEventListener('keyup', function(f) {
      if (f.which == 39) {
        if (!articleNextEnable) {
          articleNextEnable = true;

          for (i = 0; i < scrollBarMoveDom.length; i++) {
            scrollBarMoveDom[i].style.top = '0px';
          }

          // scrollTopStartId = document.getElementById(cmdInputIDName);
          // scrollTopStartClass = scrollTopStartId.getElementsByClassName('section-inner')[0];
          // scrollTopStart = scrollTopStartClass.scrollTop;
          //
          // // (NOTE) DELAYED BY ONE INPUT EVENT
          // // SCROLL BAR MOVE BY CALCULATE DISTANCE SCROLLED AS PERCENT
          // scrollDistCalc = scrollTopStart / (sectionTotalHeight - scrollContainerHeight);
          // var scrollDistPx = (scrollContainerHeight + sectionPadTopAndBot - scrollBarRenderHeightPx) * scrollDistCalc;
          // for (i = 0; i < scrollBarMoveDom.length; i++) {
          //   scrollBarMoveDom[i].style.top = scrollDistPx + 'px';
          // }

        }
      }
    });

  }

  // ARROW LEFT FOR ARTICLES
  else if (e.which == 37) {
    e.preventDefault();

    if (articleHeadingCount > 0 && articleNextEnable) {

      for ( i=0; i<sectionArticleNo; i++) {
        cmdInputIdDom.getElementsByClassName('no-dot')[i].className = 'no-dot';
      }
      cmdInputIdDom.getElementsByClassName('no-dot')[articleHeadingCount - 1].className = 'no-dot no-dot-sel';

      articleHeadingCount--;
      articleNextEnable = false;

      for (var i=0; i<cmdInputIdDom.querySelectorAll('article').length; i++) {
        cmdInputIdDom.querySelectorAll('article')[i].classList.remove("active")
      }
      cmdInputIdDom.querySelectorAll('article')[articleHeadingCount].classList.add("active")
      Velocity(cmdInputIdDom.querySelectorAll('article')[articleHeadingCount],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -70, easing: 'ease-out', duration: 600, axis: 'x', opacity: 1 } );
      Velocity(cmdInputIdDom.querySelectorAll('h3')[articleHeadingCount],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -70, easing: 'ease-out', delay: 200, duration: 10} );

      // cmdInputIdDom.getElementsByClassName('section-inner')[0].scrollTop = 0;

    }

    // (NOTE) NOT MOVING FOR SOME REASON, ROOM FOR PADDING OR SOMETHING
    // else {
    //   console.log('we"re going left');
    //   Velocity(cmdInputIdDom.querySelectorAll('article')[0],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -110, easing: 'ease-out', duration: 100, axis: 'x'} );
    //   Velocity(cmdInputIdDom.querySelectorAll('article')[0],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -70, easing: 'ease-in', duration: 100, axis: 'x'});
    // }

    document.addEventListener('keyup', function(f) {
      if (f.which == 37) {
        if (!articleNextEnable) {
          articleNextEnable = true;

          for (i = 0; i < scrollBarMoveDom.length; i++) {
            scrollBarMoveDom[i].style.top = '0px';
          }

          // scrollTopStartId = document.getElementById(cmdInputIDName);
          // scrollTopStartClass = scrollTopStartId.getElementsByClassName('section-inner')[0];
          // scrollTopStart = scrollTopStartClass.scrollTop;
          //
          // // (NOTE) DELAYED BY ONE INPUT EVENT
          // // SCROLL BAR MOVE BY CALCULATE DISTANCE SCROLLED AS PERCENT
          // scrollDistCalc = scrollTopStart / (sectionTotalHeight - scrollContainerHeight);
          // var scrollDistPx = (scrollContainerHeight + sectionPadTopAndBot - scrollBarRenderHeightPx) * scrollDistCalc;
          // for (i = 0; i < scrollBarMoveDom.length; i++) {
          //   scrollBarMoveDom[i].style.top = scrollDistPx + 'px';
          // }

        }
      }
    });

  }

  // SCROLL DOWN
  else if (e.which == 40) {

    var scrollCallD;
    var scrollTopPlus;

    function scrollAnimD() {
      scrollTopStartClass.scrollTop += scrollAmt;
      scrollTopStart = scrollTopStartClass.scrollTop;
      scrollNo++;

      // KILL INSTRUCTIONS
      if (scrollNo > 20) {
        hideShowInstructionsScroll('none');
      }

      // SCROLL BAR MOVE BY CALCULATE DISTANCE SCROLLED AS PERCENT
      scrollDistCalc = scrollTopStart / (sectionTotalHeight - scrollContainerHeight);
      var scrollDistPx = (scrollContainerHeight + sectionPadTopAndBot - scrollBarRenderHeightPx) * scrollDistCalc;
      for (i = 0; i < scrollBarMoveDom.length; i++) {
        scrollBarMoveDom[i].style.top = scrollDistPx + 'px';
      }

      scrollCallD = requestAnimationFrame(scrollAnimD);
      // UPDATE W/ SCROLL
      scrollTopPlus = scrollTopStartClass.scrollTop;
      // SHOW TOP ARROW WHEN MOVE FROM TOP
      if (scrollTopPlus > 0) {
        hideShowScrollArrows('top', 'block');
      }
    }

    // DISABLE SLEW OF KEYDOWN EVENTS, START SCROLL ANIM
    if (downKeydownEnable) {
      downKeydownEnable = false;
      // SET SCROLL DOM IDENTIFIER ONCE PER DOWN KEYDOWN
      scrollTopStartId = document.getElementById(cmdInputIDName);
      scrollTopStartClass = scrollTopStartId.getElementsByClassName('section-inner')[0];
      // scrollTopStart = scrollTopStartClass.scrollTop;

      scrollCallD = requestAnimationFrame(scrollAnimD);

    }

    // if (blurEnable) {
    //   for (var i=0; i<sectionInnerDom.length; i++) {
    //     sectionInnerDom[i].style.opacity = scrollOpStart/10;
    //   }
    // }
    // else {
    //   for (var i=0; i<sectionInnerDom.length; i++) {
    //     sectionInnerDom[i].style.opacity = 1;
    //   }
    // }
    // if (scrollOpStart/20 > 0.9) {
    //   scrollOpStart--;
    // }

    // ADD & REMOVE BLINKING CLASS - VANILLA JS
    for (var i=0; i<scrollArrowsBotDom.length; i++) {
      scrollArrowsBotDom[i].className = 'scroll-arrow-bot scroll-arrow-active-bot';
    }
    // LISTEN FOR DOWN RELEASE
    document.addEventListener('keyup', function(f) {
      if (f.which == 40) {
        downKeydownEnable = true;

        for (var i=0; i<scrollArrowsBotDom.length; i++) {
          scrollArrowsBotDom[i].className = 'scroll-arrow-bot';
        }
        for (var i=0; i<sectionInnerDom.length; i++) {
          sectionInnerDom[i].className = 'section-inner';
          // sectionInnerDom[i].style.opacity = 1;
        }
        // STOP SCROLL ANIM
        window.cancelAnimationFrame(scrollCallD);
        cmdClear()
      }
      // scrollOpStart = 20;
    });

    // IF SCROLL TO BOTTOM
    if (scrollTopStart + scrollContainerHeight > sectionTotalHeight - 2) {
      hideShowScrollArrows('bot', 'none');
      // blurEnable = false;
      sectionInnerDom[i].className = 'section-inner';
      // console.log('we\'ve hit bottom of section');
      // articleHeadingCount = cmdInputIdDom.querySelectorAll('h3').length - 1;
    }
    // else {
    //   blurEnable = true;
    // }

  }
  // SCROLL UP
  else if (e.which == 38) {

    var scrollCallU;
    var scrollTopMinus;

    function scrollAnimU() {
      scrollTopStartClass.scrollTop -= scrollAmt;
      scrollTopStart = scrollTopStartClass.scrollTop;
      scrollNo++;
      // KILL INSTRUCTIONS
      if (scrollNo > 20) {
        hideShowInstructionsScroll('none');
      }

      // SCROLL BAR MOVE BY CALCULATE DISTANCE SCROLLED AS PERCENT
      scrollDistCalc = scrollTopStart / (sectionTotalHeight - scrollContainerHeight);
      var scrollDistPx = (scrollContainerHeight + sectionPadTopAndBot - scrollBarRenderHeightPx) * scrollDistCalc;
      for (i = 0; i < scrollBarMoveDom.length; i++) {
        scrollBarMoveDom[i].style.top = scrollDistPx + 'px';
      }

      scrollCallU = requestAnimationFrame(scrollAnimU);

      // UPDATE W/ SCROLL
      scrollTopMinus = scrollTopStartClass.scrollTop;
      // GOES TO 0 WHEN AT TOP
      if (scrollTopMinus < 3) {
        hideShowScrollArrows('top', 'none');
        // blurEnable = false;
        // console.log('we\'ve hit top of section');
        // articleHeadingCount = 0;
      }
    }

    // RUN ONCE ON KEYDOWN IF ENABLED
    if (upKeydownEnable) {
      upKeydownEnable = false;
      // SET SCROLL DOM IDENTIFIER ONCE PER UP KEYDOWN
      scrollTopStartId = document.getElementById(cmdInputIDName);
      scrollTopStartClass = scrollTopStartId.getElementsByClassName('section-inner')[0];

      scrollCallU = requestAnimationFrame(scrollAnimU);
    }

    // PREVENT INCR IF ALREADY AT TOP
    // if (scrollTopStart !== 0) {
    //   blurEnable = true;
    //   scrollNo++;
    // }
    // CHANGE OPACITY WHILE SCROLLING
    // if (blurEnable) {
    //   for (var i=0; i<sectionInnerDom.length; i++) {
    //     sectionInnerDom[i].style.opacity = scrollOpStart/10;
    //   }
    // }
    // else {
    //   for (var i=0; i<sectionInnerDom.length; i++) {
    //     sectionInnerDom[i].style.opacity = 1;
    //   }
    // }
    // INC DOWN OPACITY
    // if (scrollOpStart/20 > 0.9) {
    //   scrollOpStart--;
    // }

    // ADD & REMOVE BLINKING CLASS - VANILLA JS
    for (var i=0; i<scrollArrowsTopDom.length; i++) {
      scrollArrowsTopDom[i].className = 'scroll-arrow-top scroll-arrow-active-top';
    }

    // LISTEN FOR UP KEY RELEASE
    document.addEventListener('keyup', function(f) {
      if (f.which == 38) {
        upKeydownEnable = true;

        for (var i=0; i<scrollArrowsTopDom.length; i++) {
          scrollArrowsTopDom[i].className = 'scroll-arrow-top';
        }
        for (var i=0; i<sectionInnerDom.length; i++) {
          sectionInnerDom[i].className = 'section-inner';
          // sectionInnerDom[i].style.opacity = 1;
        }
        window.cancelAnimationFrame(scrollCallU);
      }
      // scrollOpStart = 20;
    });

    // DONT SHOW ARROW IF STUCK AT TOP B/C POST DOESN'T SCROLL
    if (scrollBarHeightCalc < 100) {
      hideShowScrollArrows('bot', 'block');
    }

  }
  // SCROLL HOME, ONLY IF POST SCROLLS
  else if (e.which == 36 && scrollBarHeightCalc < 100) {
    e.preventDefault();

    // articleHeadingCount = 0;
    // INC scrollNo, IF NOT AT TOP ALREADY
    var scrollTopStartId = document.getElementById(cmdInputIDName);
    scrollTopStartId.getElementsByClassName('section-inner')[0].scrollTop = 0;

    scrollNo += 5;
    if (scrollNo > 20 && scrollTopStartId.getElementsByClassName('section-inner')[0].scrollTop !== 0) {
      hideShowInstructionsScroll('none');
    }
    // MOVE SCROLL BAR
    for (i = 0; i < scrollBarMoveDom.length; i++) {
      scrollBarMoveDom[i].style.top = '0';
    }
    hideShowScrollArrows('bot', 'block');
    hideShowScrollArrows('top', 'none');
  }
  // SCROLL END, ONLY IF POST SCROLLS
  else if (e.which == 35 && scrollBarHeightCalc < 100) {
    e.preventDefault();

    // articleHeadingCount = cmdInputIdDom.querySelectorAll('h3').length - 1;
    var scrollTopStartId = document.getElementById(cmdInputIDName);
    scrollTopStartId.getElementsByClassName('section-inner')[0].scrollTop = sectionTotalHeight - scrollContainerHeight;

    scrollNo += 5;
    if (scrollNo > 20 && scrollTopStartId.getElementsByClassName('section-inner')[0].scrollTop !== sectionTotalHeight - scrollContainerHeight) {
      hideShowInstructionsScroll('none');
    }
    // MOVE SCROLL BAR
    for (i = 0; i < scrollBarMoveDom.length; i++) {
      scrollBarMoveDom[i].style.top = (scrollContainerHeight + sectionPadTopAndBot - scrollBarRenderHeightPx) + 'px';
    }
    hideShowScrollArrows('bot', 'none');
    hideShowScrollArrows('top', 'block');
  }
});

// BLOCK CURSOR CODE
cursor = window.setInterval(function() {
  var cursorBlock = document.getElementById('cursor');
  if (cursorBlock.style.visibility === 'visible') {
    cursorBlock.style.visibility = 'hidden';
  } else {
    cursorBlock.style.visibility = 'visible';
  }
}, 500);

// CHANGE UI W/ TAB
// (NOTE) MESSING UP CSS SCRUB VALUES/SYNC
// jQuery('html').keyup(function(e) {
// document.addEventListener('keyup', function(e) {


// });

// (NOTE) NEED TO DISABLE 'BACKPACE' AS BROWSER BACK, BUT KEEP ON INPUT FIELD

// document.querySelector('html').addEventListener('keydown', function (e) {
  // DISABLE CMD (17) KEY
  // (NOTE) NEED TO DISABLE IF WHEN BOTTOM ??
  // if (e.which == 17) {
  //   e.preventDefault();
  // }
// });

// FOCUS INPUT ON 'TAB'
document.addEventListener('keyup', function(e) {
  if (e.which === 9) {
    cliInputFocus();
    console.log('TAB focus');
  }
});

// RUN ON KEYUP, IF ELSES, ADD TXT TO CMD LIST, cmdCheck();
cmdInputHiddenDom.addEventListener('keyup', function(e) {

    // CACHE INPUT, CONVERT TO LOWER CASE
    if (postLoad) {
      cmdInput = document.getElementById("cmd-input-hidden").value.toLowerCase();
      cmdInputRaw = cmdInput
      cmdInput = cmdInput.trim()
    }

    // Enter
    if(e.keyCode === 13 &&  cmdInput !== "" && cmdInput) {

      if (cmdInput === cmdPrev ) {
        cmdClear();
      }
      // LAUNCH FULLSCREEN
      else if(cmdInput === "fullscreen") {
        // launchIntoFullscreen(document.documentElement);
        cmdListDom.innerHTML = cmdListUpdate + "&nbsp; > FULLSCREEN<br><br>";
        cmdClear();
        // window.location += '?cmd=fullscreen';
        document.getElementById('full-confirm').style.display = 'block';
      }
      else if(cmdInput === "curse") {
        // LETS CREATE A RANDOM CURSE WORD
        var randCurse = cmdArrayCurseWords[Math.floor(Math.random() * cmdArrayCurseWords.length)];
        cmdListUpdate = '';
        cmdListUpdate = randCurse + '<br><br>';
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();
      }
      else if(cmdInput === "clear") {
        cmdListUpdate = "";
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();
      }
      // IF IS MENU ITEMS
      else if(cmdArrayMenuItems.indexOf(cmdInput) > -1) {

        cmdCheck(cmdInput, 400);
        // ENTER INTO CMD LIST
        cmdListUpdate += "> " + cmdInput + "<br><br>";
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();
      }
      // LIST ALL
      else if(cmdInput === "ls" || cmdInput === "dir" || cmdInput === "ls -al" || cmdInput === "ls -alt") {

        // (NOTE) CHANGE TO FOR LOOP, ITER THROUGH ARRAY
        cmdListUpdate += "> " + cmdInput + "<br><br>" + "&nbsp; > DEV<br>" + "&nbsp; > ART<br>" + "&nbsp; > ABOUT<br>" + "&nbsp; > SKILLS<br>" + "&nbsp; > LINKS<br>" + "&nbsp; > RESUME<br>" + "<br>";
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();
        cmdCheck("ls", 400);

      }
      // CURSE WORDS
      else if(cmdArrayCurseWords.indexOf(cmdInput) > -1) {

        cmdListUpdate += "> " + cmdInput + "<br><br>";
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();
        cmdCheck("curse", 400);

      }
      // GREETING
      else if (cmdInput === "hi" || cmdInput === "hello" || cmdInput === "enter") {

        cmdListUpdate += "> " + cmdInput + "<br><br>";
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();
        cmdCheck("confused", 400);

      }

      // BACK
      else if (cmdInput === 'back') {

        cmdCheck(cmdPrevArray[(cmdPrevArray.length-2)], 400);
        cmdClear();

        // ENTER INTO CMD LIST
        cmdListUpdate += "> " + cmdInput + "<br><br>";
        cmdListDom.innerHTML = cmdListUpdate;

      }


      // HELP, HOME
      else if (cmdArrayHome.indexOf(cmdInput) > -1) {

        cmdCheck("home", 400);
        cmdClear();
        // document.getElementById('header-nav').innerHTML = 'HOME';

        // ENTER INTO CMD LIST
        cmdListUpdate = "";
        cmdListDom.innerHTML = startHelpInfo + "<br><br>" + "> " + cmdInput;

      }
      else if (cmdInput.indexOf('go') > -1) {
        if (cmdInput === "go twitter") {
          location.href = "http://www.twitter.com/ngpfontaine";
        }
        else if(cmdInput === "go resume") {
          location.href = "http://nicfontaine.com/images/nf_resume_01_20160402.pdf";
        }
        else if (cmdInput === 'go 3midesign') {
          location.href = 'https://nicfontaine.com/sites/3mi';
        }
        else if (cmdInput === 'go silvermuse') {
          location.href = 'http://silvermuse.net';
        }
        else if (cmdInput === 'go ihl') {
          location.href = 'http://www.ianhaneylopez.com';
        }
        else if (cmdInput === 'go metro') {
          location.href = 'https://nicfontaine.com/metrognome';
        }
        else if (cmdInput === 'go thalia') {
          location.href = 'https://thaliamae.com';
        }
        else if (cmdInput === 'go nic2013') {
          location.href = 'https://nicfontaine.com/sites/2013';
        }
        else if (cmdInput === 'go gforms') {
          location.href = 'https://github.com/ngpfontaine/gfv';
        }
        else if (cmdInput === 'go github') {
          location.href = 'https://github.com/ngpfontaine';
        }
        else if (cmdInput === 'go turtlelinks') {
          location.href = 'https://www.youtube.com/watch?v=ojJFZF8tUSM';
        }
        else if (cmdInput === 'go bunkerblast') {
          location.href = 'https://vimeo.com/162212564';
        }
        else if (cmdInput === 'go vimeo') {
          location.href = 'https://vimeo.com/ngpfontaine';
        }
        else if (cmdInput === 'go start') {
          location.href = 'https://github.com/ngpfontaine/start';
        }
        else if (cmdInput === 'go clpsm') {
          location.href = 'https://github.com/ngpfontaine/clpsm';
        }

        cmdListUpdate += "> " + cmdInput + "<br><br>";
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();

      }
      // ERROR COMMAND
      else {

        cmdListUpdate += "> " + cmdInput + " - [ error ]" + "<br><br>";
        cmdListDom.innerHTML = cmdListUpdate;
        cmdClear();
        cmdCheck("else", 400);
        document.getElementById('cmd-error-in-post').innerHTML = " " + cmdInput + " ";

      }

    }
    else {
      // Typing output on FE
      // disable if before load sequence
      if (postLoad) {
        document.getElementById('cmd').getElementsByTagName('span')[0].innerHTML = cmdInputRaw
      } else {
        cmdClear();
      }
      if (e.which === 9) {
        e.preventDefault();
      }

    }


});

//}(jQuery));

function cliInputFocus() {
  cmdInputHiddenDom.focus();
  console.log('cliInputFocus()');
}

function cmdCheck(x, y) {

  // document.getElementById('header-nav').innerHTML = '> ' + x;
  x = x.trim()
  urlCmdHash = window.location.toString();
  var urlClean = urlCmdHash.split(urlSearchChar)[0];
  // CREATE ID NAME STRING FOR SCROLL ANCHOR
  cmdInputCombo = "#scroll-" + x;
  console.log(cmdInputCombo + ' is cmdInputCombo');

  if (x === 'home') {
    console.log('cmdCheck("home")');
    // document.location = urlClean + '#_';
    // document.location = urlClean;

    // window.location.replace("#");
    // if (typeof window.history.replaceState == 'function') {
    //   history.replaceState({}, '', window.location.href.slice(0, -1));
    // }
  }
  else {
    // history.replaceState(undefined, undefined, urlSearchChar + x);
    document.location = urlClean + urlSearchChar + x;
    // REMOVE HASH FROM HISTORY, TO SAVE BROWSER FUNCTIONALITY
  }

  // RESET SCROLL WHEN RUN COMMAND, JS
  for (var i=0; i<sectionInnerDom.length; i++) {
    sectionInnerDom[i].scrollTop = 0;
  }

  // RESET H3 VELOCITY SCROLL ORDER
  articleHeadingCount = 0;

  if (x !== '') {
    cmdInputIDName = 'scroll-' + x;
    cmdInputIdDom = document.getElementById(cmdInputIDName);
  }

  // CACHE HEIGHT OF QUERIED .POST
  // (NOTE) CONSOLE CLAIMS THIS IS NULL - ONLY ON HOME QUERY
  var hashHeight = cmdInputIdDom.clientHeight;
  // hashHeight *= -1;

  sectionArticleNo = cmdInputIdDom.querySelectorAll('article').length;

  if (sectionArticleNo > 1) {

    // SLIDE BACK TO FIRST ARTICLE EVERY COMMAND CALL TO PREVENT GETTING STUCK AT > 0
    Velocity(cmdInputIdDom.querySelectorAll('article')[0],'scroll', { container: cmdInputIdDom.getElementsByClassName('section-inner')[0], offset: -70, easing: 'ease-out', duration: 0, axis: 'x', opacity: 1 });

    // CLEAR DOTS TO PREVENT STACKING FROM MULTIPLE CMDS
    var dotNode = cmdInputIdDom.getElementsByClassName('section-no-dots')[0];

    // ADD SLIDE INSTRUCTIONS TO EACH ARTICLE
    // var slideInstrNode = cmdInputIdDom.querySelectorAll('article')[0];
    // var itmSlideInstr = document.getElementById('slide-instructions-container').lastChild;
    // var clnSlideInstr = itmSlideInstr.cloneNode(true);
    // document.getElementById('append-p').appendChild(clnSlideInstr);

    while (dotNode.firstChild) {
      dotNode.removeChild(dotNode.firstChild);
    }
    for ( i=0; i<sectionArticleNo; i++) {
      if (i !== articleHeadingCount) {
        // cmdInputIdDom.getElementsByTagName('article')[i].style.opacity = '0';
        Velocity(cmdInputIdDom.getElementsByTagName('article')[i], {opacity: 1});
      }
      var itmDot = document.getElementById('dot-container').lastChild;
      var clnDot = itmDot.cloneNode(true);
      dotNode.appendChild(clnDot);

    }
    // SET FIRST DOT HIGHLIGHT
    cmdInputIdDom.getElementsByClassName('no-dot')[0].className = 'no-dot no-dot-sel';

    cmdClear();
  }
  // else {
  //   cmdInputIdDom.
  // }

  setSectionHeight();

  cmdInputIdDom.style.top = '0';

  if (x !== 'back') {
    cmdPrevArray.push(x);
  }

  // SCROLL TO INPUT
  // (NOTE) FOR THE urlQuery ISSUE, I THINK THIS IS JUST LOADING TOO FAST IN ORDER

  Velocity(cmdInputIdDom,'scroll', {duration: 250}, {easing: 'ease-in-out'}, {offset: 0});

  // VERTICALLY CENTER .POST
  if (theHeight>700) { heightCenterFactor = 1.74; }
  else { heightCenterFactor = 1.3; }
  cmdInputIdDom.style.top = (theHeight - hashHeight)/heightCenterFactor + 'px';

  cmdHideSections();

  // FADE IN CMD section
  Velocity(cmdInputIdDom, {opacity: 1}, {duration: y});

  // SCROLL BAR & ARROW CODE FROM HERE BELOW
  hideShowScrollArrows('top', 'none');
  // blurEnable = false;

  if (sectionTotalHeight > scrollContainerHeight) {
    hideShowScrollArrows('bot', 'block');
    // blurEnable = true;
  }

  // CACHE section HEIGHT FOR SCROLLTOP MEASUREMENT ON ARROW KEYDOWN
  var cmdClassCache = cmdInputIdDom.getElementsByClassName('section-inner')[0];
  scrollContainerHeight = cmdClassCache.clientHeight-sectionPadTopAndBot;

  // GET HEIGHT OF CONTENTS OF section MINUS PADDING
  sectionTotalHeight = cmdClassCache.scrollHeight-sectionPadTopAndBot;

  // RESET SCROLLBARMOVE POS
  for (i = 0; i < scrollBarMoveDom.length; i++) {
    scrollBarMoveDom[i].style.top = 0;
  }

  // HIDE ALL BUT FIRST FIGURE
  // cmdInputFigureDom = cmdInputIdDom.querySelectorAll('article');
  // // console.log(cmdInputIDName + ' cmdInputIDName');
  // if (cmdInputFigureDom.length > 0) {
  //   for (i=0; i<cmdInputFigureDom.length; i++) {
  //     cmdInputIdDom.querySelectorAll('article')[i].style.display = 'none';
  //   }
  //   cmdInputIdDom.querySelectorAll('article')[0].style.display = 'table-cell';
  // }

  // (NOTE) HAVENT YET FINISHED BELOW
  if (sectionTotalHeight === scrollContainerHeight) {
    hideShowInstructionsScroll('none');
  }
  else if (scrollNo < 20 && sectionTotalHeight > scrollContainerHeight) {
    hideShowInstructionsScroll('block');
  }
}

// HIDE & SHOW SCROLL ARROWS W/ 'top', 'bot', 'none', 'block'
function hideShowScrollArrows(x,y) {
  if (x === 'top') {
    for (i=0; i<scrollArrowsTopDom.length; i++) {
      scrollArrowsTopDom[i].style.display = y;
    }
  }
  else if (x === 'bot') {
    for (i=0; i<scrollArrowsBotDom.length; i++) {
      scrollArrowsBotDom[i].style.display = y;
    }
  }
}

// HIDE & SHOW INSTRUCTIONS SCROLL 'none', 'block'
function hideShowInstructionsScroll(x) {
  for (i=0; i<instructionsScrollDom.length; i++) {
    instructionsScrollDom[i].style.display = x;
  }
}

function setSectionHeight() {

  console.log('setSectionHeight()');

  setTimeout(function() {
    theHeight = window.innerHeight;
    if (theHeight>700) { heightSetFactor = 1.45; }
    else { heightSetFactor = 1.6; }

    console.log(theHeight + ' is window.innerHeight');
    theHeightDiv = theHeight/heightSetFactor;

    for (i=0; i<sectionInnerDom.length; i++) {
      sectionInnerDom[i].style.maxHeight = theHeightDiv + 'px';
    }

    console.log(theHeightDiv + ' is theHeightDiv');

    var cmdClassCache = cmdInputIdDom.getElementsByClassName('section-inner')[0];
    scrollContainerHeight = cmdClassCache.clientHeight-sectionPadTopAndBot;

    hideShowScrollArrows('bot', 'none');
    // blurEnable = false;

    if (sectionTotalHeight > scrollContainerHeight) {
      hideShowScrollArrows('bot', 'block');
      // blurEnable = true;
    }

    // (NOTE) NEED TO UPDATE POST CSS 'TOP' VAL. B/C OF EXTRA HEIGHT

    scrollBarHeightCalc = 100 * (scrollContainerHeight / sectionTotalHeight);
    // console.log('scrollBarHeightCalc = ' + scrollBarHeightCalc);

    for (i = 0; i < scrollBarMoveDom.length; i++) {
      scrollBarMoveDom[i].style.height = scrollBarHeightCalc + '%';
    }

    // CACHE HEIGHT OF SCROLL BAR IF POSTS IS SCROLLABLE
    // if (scrollBarHeightCalc < 100) {
    //   var scrollBarClassCache = cmdInputIdDom.getElementsByClassName('scroll-bar-move')[0];
    //   scrollBarRenderHeightPx = scrollBarClassCache.clientHeight;
    // }
  }, 50);

}

function cmdClear() {

  cmdInputHiddenDom.value = "";
  document.getElementById("cmd").getElementsByTagName("span")[0].innerHTML = "";

}

function cmdHideSections() {

  for (i=0; i<sectionsDom.length; i++) {
    var artIter = sectionsDom[i];
    if (artIter.id !== cmdInputIDName) {
      Velocity(artIter, {opacity: 0}, {duration: 100});
    }
  }

}

function promptFullscreen() {
  launchIntoFullscreen(document.documentElement);
}

// TRIGGER ON FULLSCREEN SIZE CHANGE
// window.onresize = function (event) {
//   var fMaxHeight = window.screen.height,
//     fMaxWidth = window.screen.width,
//     fCurHeight = window.innerHeight,
//     fCurWidth = window.innerWidth;
//
//     console.log(fCurHeight);
//
//   if (fMaxWidth == fCurWidth && fMaxHeight > fCurHeight) {
//     console.log('fullscreen check triggered');
//     // setTimeout(function() {
//     // }, 1400);
//     loadWelcome();
//     cmdCheck(cmdPrev, 0);
//     // setSectionHeight();
//   }
// }

// FULLSCREEN FUNCTION
// (NOTE) NEED TO REFRESH W/ QUERY TO RESET SCREEN SIZE
function launchIntoFullscreen(element) {

  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }

  setSectionHeight();

  document.getElementById('full-confirm').style.display = 'none';
  document.querySelector('html').style.cursor = 'none';
  // cmdListDom.innerHTML = cmdListUpdate + "&nbsp; > FULLSCREEN<br><br>";
  // cmdClear();

}
