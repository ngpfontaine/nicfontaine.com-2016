// DATE CREATED: 20150618

// (NOTE) SCROLL IS BUGGED, MOVES WRONG DIR 1 WHEN CHANGE DIR
// (NOTE) ADD TEXT BLUR IS - A LITTLE LATE? KINDA JARRING
// (NOTE) URL QUERY ON !HOME ISN'T SCROLLING ALL OF THE WAY TO THE POST

// CONSOLE WATERMARK
console.log("       _       __             _        _                                 ");
console.log(" _ __ (_) ___ / _| ___  _ __ | |_ __ _(_)_ __   ___   ___ ___  _ __ ___  ");
console.log("| '_ \\| |/ __| |_ / _ \\| '_ \\| __/ _` | | '_ \\ / _ \\ / __/ _ \\| '_ ` _ \\ ");
console.log("| | | | | (__|  _| (_) | | | | || (_| | | | | |  __/| (_| (_) | | | | | | ");
console.log("|_| |_|_|\\___|_|  \\___/|_| |_|\\__\\__,_|_|_| |_|\\___(_\\___\\___/|_| |_| |_| \n\n");
console.log("------------------------------------------------------------------------------------");
console.log('DEVELOPER, EH? GET AT ME ON TWITTER @ARCOVELO');
console.log("ALSO, TRY THE COMMAND \'CURSE\' A FEW TIMES");
console.log("PROFESSIONAL HUH? ...GF DIDN'T THINK IT WAS VERY FUNNY");
console.log("------------------------------------------------------------------------------------\n\n");


// WRITE CURRENT YEAR
var year = new Date().getFullYear();
document.getElementById("year-container").innerHTML = year;

var theHeight = window.innerHeight;
var urlQuery = '';
var urlSearchChar = '#';
var cmdInput;
var cmdInputCombo = '';
var cmdInputIDName = '';
var cmdPrev = '';
var cmdPrevArray = [];
var cmdListUpdate = "";
var uiTabVal = 0;
var articleTotalHeight;
var scrollContainerHeight;
var scrollNo = 0;
var scrollHeightInc = 0;
var scrollDistCalc;
var scrollBarHeightCalc;
var scrollBarRenderHeightPx;
var vDuration;
var blurEnable = true;

// LET'S CACHE SOME DOM ELEMENTS TO VARS
var containerCli = document.getElementById('instructions-cli-container');
var containerGui = document.getElementById('instructions-gui-container');
var containerCmd = document.getElementById('cmd-container');
var cmdList = document.getElementById('cmd-list');
var cmdInputHidden = document.getElementById('cmd-input-hidden');

var scrollArrowsBot = document.querySelectorAll('.scroll-arrow-bot');
var scrollArrowsTop = document.querySelectorAll('.scroll-arrow-top');
var instructionsScroll = document.querySelectorAll('.instructions-scroll');


var articleInner = document.querySelectorAll('.article-inner');
var articles = document.getElementsByTagName('article');

var scrollBarMove = document.querySelectorAll('.scroll-bar-move');
// (NOTE) IF .ARTICLE-INNER PADDING CHANGES THIS NEEDS TO CHANGE
var articleVertPad = 140;

var startHelpInfo = "<span class='font-note'>(NOTE)</span> \"Commands are issued uppercase automatically - no need for caps-lock/shift\" <br /><br /><span class='font-note'>(NOTE)</span>  \"If you ever lose cursor focus of the command line re-focus with the TAB key\" <br /><br /><span class='font-note'>(NOTE)</span>  \"You can always get back to the instructions with the <span class='font-note'>HOME</span> command\"\n\n";

var cmdArrayCurseWords = ['fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker', 'motherfucker', 'asscock', 'asshead', 'asslicker', 'asslick', 'assnigger', 'nigger', 'asssucker', 'bastard', 'bitch', 'bitchtits', 'bitches', 'bitch', 'brotherfucker', 'bullshit', 'bumblefuck', 'buttfucka', 'fucka', 'buttfucker', 'buttfucka', 'fagbag', 'fagfucker', 'faggit', 'faggot', 'faggotcock', 'fagtard', 'fatass', 'fuckoff', 'fuckstick', 'fucktard', 'fuckwad', 'fuckwit', 'dick', 'dickfuck', 'dickhead', 'dickjuice', 'dickmilk', 'doochbag', 'douchebag', 'douche', 'dickweed', 'dyke', 'dumbass', 'dumass', 'fuckboy', 'fuckbag', 'gayass', 'gayfuck', 'gaylord' , 'gaytard', 'nigga', 'niggers', 'niglet', 'paki', 'piss', 'prick', 'pussy', 'poontang', 'poonanny', 'poonany', 'porchmonkey', 'porch monkey', 'poon', 'queer', 'queerbait', 'queerhole', 'queef', 'renob', 'rimjob', 'ruski', 'sandnigger', 'sand nigger', 'schlong', 'shitass', 'shitbag', 'shitbagger', 'shitbreath', 'chinc', 'carpetmuncher', 'chink', 'choad', 'chode', 'clitface', 'clusterfuck', 'cockass', 'cockbite', 'cockface', 'skank', 'skeet', 'skullfuck', 'slut', 'slutbag', 'splooge', 'twatlips', 'twat', 'twats', 'twatwaffle', 'vaj', 'vajayjay', 'va-j-j', 'wank', 'wankjob', 'wetback', 'whore', 'whorebag', 'whoreface', 'shitfucker', 'ass', 'shitfucker', 'shitfuck'];

// PARSE POST H2s AND PUSH TO ARRAY FOR cmdCheck()
var cmdArrayMenuItems = [];
var mainMenuHeadings = document.querySelectorAll('.menu-main-h2');
for (i=0; i<mainMenuHeadings.length; i++) {
  var headingObj = mainMenuHeadings[i].innerHTML;
  var headingString = String(headingObj.toLowerCase());
  cmdArrayMenuItems.push(headingString);
}

var cmdArrayNavigation = ["back"];
var cmdArrayHome = ["home", "help", "refresh", "index", "welcome", "splash"];

/*** END OF VARS ***/

// for (var i=0; i<articles.length; i++) {
//   var text = document.createTextNode("<div>FOO</div>");
//   articles[i].parentNode.insertBefore(text, articles[i]);
// }

// FOCUS INPUT ON CLICK ANYWHERE
document.addEventListener('click', function() {
  cliInputFocus();
  console.log('CLICK focus');
});

// CHECK URL QUERY AND RUN cmdCheck()
var urlString = window.location.toString();
// IF URL HAS QUERY, OTHERWISE KEEP urlQuery = ''
if (urlString.indexOf(urlSearchChar) > -1) {
  urlQuery = urlString.split(urlSearchChar)[1];
  // (NOTE) WAS OUTSIDE OF ABOVE/BELOW IF STATEMENT
  if (urlQuery !== undefined) {
    if (urlQuery.length > 1) {
      console.log("url query = " + urlQuery);
    }
    setTimeout(function() {
      console.log('checking urlQuery');
      cmdCheck(urlQuery, 2000);
    }, 2200);
  }

}

function loadWelcome() {
  // ONLY RUN IF urlQuery IS STILL BLANK
  if (urlQuery.length < 1) {
    console.log('loadWelcome() has run');
    setTimeout(function() {
      cmdCheck('home', 2000);
    }, 2200);
  }

  cmdList.innerHTML = startHelpInfo;

  // PRINT OUT START INSTRUCTIONS
  // (NOTE) NEEDS SOME WORK
  // function startPrint(id, sentence) {
  //   var f;
  //   f= function(i){
  //       id.innerHTML+=sentence[i];
  //       if(i+1==sentence.length)
  //          return;
  //       window.setTimeout(function(){f(i+1);},50);
  //   }
  //   f(0);
  // }

  // startPrint(cmdList, startHelpInfo);

}


// (NOTE) FIREFOX HAVING ARTICLE HEIGHT/ SCROLL ISSUES

// JQUERY
(function($) {

  // (NOTE) PROB IN WRONG DOM LOAD ORDER, BAR HEIGHT NOT WORKING
  // $('h2').after('<div class="scroll-arrow-top"></div>',
  //         '<div class="scroll-arrow-bot"></div>',
  //         '<div class="post-fade-top"></div>',
  //         '<div class="scroll-bar-move"></div>');

  var cursor;

  // (NOTE) JS OF BELOW, NOT WORKING, DUNNO WHY
  for (i=0; i<articleInner.length; i++) {
    articleInner[i].style.maxHeight = (theHeight/1.7);
  }
  // $('.article-inner').css({'max-height': theHeight/1.7});

  // SCRUB COLORS
  var colorInit1 = 140;
  var colorInit2 = 305;

  function iterColor() {

    if (colorInit1 > 1) {
    	colorInit1--;
    } else {
      colorInit1 = 361;
      colorInit1--;
    }
    if (colorInit2 > 1) {
    	colorInit2--;
    } else {
      colorInit2 = 361;
      colorInit2--;
    }

  }

  var colorScrubInterval = setInterval(iterColor,100);

  hideShowScrollArrows('top', 'none');

  // BACKSPACE LOGIC
  var backEnable = true;
  document.addEventListener('keydown', function (e) {

    // (NOTE) NOT SURE IF CALLING THIS ON EVERY KEYDOWN IS A BAD MOVE
    cliInputFocus();
    // BACKSPACE KEY
    if (e.which == 8) {
      e.preventDefault();

      if (backEnable) {
        var cmdVal = cmdInputHidden.value;
        cmdInputHidden.value = cmdVal.substring(0, cmdVal.length-1);
        backEnable = false;
      }
      cmdInputHidden.addEventListener('keyup', function(e) {
        backEnable = true;
      });

    }

  });

  // SCROLL .ARTICLE-INNER ON UP & DOWN ARROW
  document.addEventListener('keydown', function (e) {

    // TAB KEY
    if (e.which == 9) {
      e.preventDefault();
    }

    // PAGE UP
    // if (e.which == 37) {
    //   e.preventDefault();
    // }
    // (NOTE) SCROLL BAR MOVES 1 UP/DOWN AFTER DIRECTION CHANGE

    // DOWN
    else if (e.which == 40) {
      // LETS TRY VANILLA
      var scrollTopStartId = document.getElementById(cmdInputIDName);
      var scrollTopStartClass = scrollTopStartId.getElementsByClassName('article-inner')[0];
      var scrollTopStart = scrollTopStartClass.scrollTop;
      scrollTopStartClass.scrollTop = scrollTopStart + 7;
      var scrollTopPlus = scrollTopStartClass.scrollTop;

      if (blurEnable) {
        for (var i=0; i<articleInner.length; i++) {
          articleInner[i].className = 'article-inner text-blur-down';
        }
      }
      else {
        for (var i=0; i<articleInner.length; i++) {
          articleInner[i].className = 'article-inner';
        }
      }

      // (NOTE) NEED TO FIX, MAKE ONLY INC IF NOT AT BOTTOM?
      // if (y <= scrollContainerHeight) {
      //   scrollNo++;
      // }

      // ADD & REMOVE BLINKING CLASS - VANILLA JS
      for (var i=0; i<scrollArrowsBot.length; i++) {
        scrollArrowsBot[i].className = 'scroll-arrow-bot scroll-arrow-active-bot';
      }
      this.addEventListener('keyup', function() {
        for (var i=0; i<scrollArrowsBot.length; i++) {
          scrollArrowsBot[i].className = 'scroll-arrow-bot';
        }
        for (var i=0; i<articleInner.length; i++) {
          articleInner[i].className = 'article-inner';
        }
      });

      // (NOTE) NEED TO MAKE SCROLL-BAR-MOVE HEIGHT: DEPENDANT ON SCROLL CONT HEIGHT

      // CALCULATE DISTANCE SCROLLED AS PERCENT
      scrollDistCalc = scrollTopStart / (articleTotalHeight - scrollContainerHeight);
      var scrollDistPx = (scrollContainerHeight + articleVertPad - scrollBarRenderHeightPx) * scrollDistCalc;
      for (i = 0; i < scrollBarMove.length; i++) {
        scrollBarMove[i].style.top = scrollDistPx + 'px';
      }

      // console.log(scrollContainerHeight + ' scroll container height');
      // console.log(scrollTopStart + ' scroll top start');
      // console.log(articleTotalHeight + ' article total height');

      scrollNo++;

      // IF SCROLL TO BOTTOM
      if (scrollTopStart + scrollContainerHeight > articleTotalHeight - 2) {
        hideShowScrollArrows('bot', 'none');
        blurEnable = false;
        articleInner[i].className = 'article-inner';
        console.log('we\'ve hit bottom of article');
      }
      else {
        blurEnable = true;
      }

      // (NOTE) NEED LOGIC TO DEFAULT HIDDEN, ONLY DISPLAY IF CONT IS OVERFLOW
      // KILL INSTRUCTIONS
      if (scrollNo === 10) {
        hideShowInstructionsScroll('none');
      }

      if (scrollTopPlus > 0) {
        hideShowScrollArrows('top', 'block');
      }

    }
    // UP
    else if (e.which == 38) {
      // LETS TRY VANILLA
      var scrollTopStartId = document.getElementById(cmdInputIDName);
      var scrollTopStartClass = scrollTopStartId.getElementsByClassName('article-inner')[0];
      var scrollTopStart = scrollTopStartClass.scrollTop;
      scrollTopStartClass.scrollTop = scrollTopStart - 7;
      var scrollTopMinus = scrollTopStartClass.scrollTop;

      // PREVENT INCR IF ALREADY AT TOP
      if (scrollTopStart !== 0) {
        blurEnable = true;
        scrollNo++;
      }

      if (blurEnable) {
        for (var i=0; i<articleInner.length; i++) {
          articleInner[i].className = 'article-inner text-blur-up';
        }
      }
      else {
        for (var i=0; i<articleInner.length; i++) {
          articleInner[i].className = 'article-inner';
        }
      }

      // ADD & REMOVE BLINKING CLASS - VANILLA JS
      for (var i=0; i<scrollArrowsTop.length; i++) {
        scrollArrowsTop[i].className = 'scroll-arrow-top scroll-arrow-active-top';
      }
      this.addEventListener('keyup', function() {
        for (var i=0; i<scrollArrowsTop.length; i++) {
          scrollArrowsTop[i].className = 'scroll-arrow-top';
        }
        for (var i=0; i<articleInner.length; i++) {
          articleInner[i].className = 'article-inner';
        }
      });

      // CALCULATE DISTANCE SCROLLED AS PERCENT
      scrollDistCalc = scrollTopStart / (articleTotalHeight - scrollContainerHeight);
      var scrollDistPx = (scrollContainerHeight + articleVertPad - scrollBarRenderHeightPx) * scrollDistCalc;
      for (i = 0; i < scrollBarMove.length; i++) {
        scrollBarMove[i].style.top = scrollDistPx + 'px';
      }

      hideShowScrollArrows('bot', 'block');

      // KILL INSTRUCTIONS
      if (scrollNo === 10) {
        hideShowInstructionsScroll('none');
      }
      // GOES TO 0 WHEN AT TOP
      if (scrollTopMinus < 3) {
        hideShowScrollArrows('top', 'none');
        blurEnable = false;
      }

    }
    // HOME
    else if (e.which == 36) {
      // SCROLL ARTICLE
      var scrollTopStartId = document.getElementById(cmdInputIDName);
      scrollTopStartId.getElementsByClassName('article-inner')[0].scrollTop = 0;
      // MOVE SCROLL BAR
      for (i = 0; i < scrollBarMove.length; i++) {
        scrollBarMove[i].style.top = '0';
      }
    }
    // END
    else if (e.which == 35) {
      // SCROLL ARTICLE
      var scrollTopStartId = document.getElementById(cmdInputIDName);
      scrollTopStartId.getElementsByClassName('article-inner')[0].scrollTop = scrollContainerHeight;
      // MOVE SCROLL BAR
      for (i = 0; i < scrollBarMove.length; i++) {
        scrollBarMove[i].style.top = (scrollContainerHeight + articleVertPad - scrollBarRenderHeightPx) + 'px';
      }
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
  document.addEventListener('keyup', function(e) {

    cmdInputHidden.addEventListener('keyup', function() {
      document.getElementById('cmd').getElementsByTagName('span')[0].innerHTML = this.value;;
    });

    if (e.which === 9) {
      e.preventDefault();
    }

    var tabEnable = true;

    if(e.keyCode === 9 && tabEnable) {

      if(uiTabVal === 0) {
        // GUI MODE
        console.log('tab val - 0');
        uiTabVal = 1;

        containerCli.style.display = 'none';
        containerGui.style.display = 'block';
        containerCmd.style.display = 'none';

        document.getElementById('cursor').style.cursor = 'initial';

      }
      else {
        // CLI MODE
        console.log('tab val - 1');
        uiTabVal = 0;

        containerCli.style.display = 'block';
        containerGui.style.display = 'none';
        containerCmd.style.display = 'block';

        document.getElementById('cursor').style.cursor = 'none';

        cliInputFocus();

        cmdCheck('home', 0);

      }

    }

  });

  // (NOTE) NEED TO DISABLE 'BACKPACE' AS BROWSER BACK, BUT KEEP ON INPUT FIELD

  document.querySelector('html').addEventListener('keydown', function (e) {
    // DISABLE CMD (17) KEY
    // (NOTE) NEED TO DISABLE IF WHEN BOTTOM ??
    // if (e.which == 17) {
    //   e.preventDefault();
    // }
  });

  // FOCUS INPUT ON 'TAB'
  document.addEventListener('keyup', function(e) {
    if (e.which === 9) {
      cliInputFocus();
      console.log('TAB focus');
    }
  });

  // RUN ON KEYUP, IF ELSES, ADD TXT TO CMD LIST, cmdCheck();
  cmdInputHidden.addEventListener('keyup', function(e) {

      // CACHE INPUT, CONVERT TO LOWER CASE
      cmdInput = document.getElementById("cmd-input-hidden").value.toLowerCase();

      // IF KEY IS ENTER
      if(e.keyCode === 13 &&  cmdInput !== "" && cmdInput) {

        if ( cmdInput === cmdPrev ) {
          cmdClear();
        }
        // LAUNCH FULLSCREEN
        else if(cmdInput === "fullscreen") {
          // launchIntoFullscreen(document.documentElement);
          cmdList.innerHTML = cmdListUpdate + "&nbsp; > FULLSCREEN<br><br>";
          cmdClear();
          // window.location += '?cmd=fullscreen';
          document.getElementById('full-confirm').style.display = 'block';
        }
        else if(cmdInput === "curse") {
          // LETS CREATE A RANDOM CURSE WORD
          var randCurse = cmdArrayCurseWords[Math.floor(Math.random() * cmdArrayCurseWords.length)];
          cmdListUpdate = '';
          cmdListUpdate = randCurse + '<br><br>';
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();
        }
        else if(cmdInput === "clear") {
          cmdListUpdate = "";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();
        }
        // IF IS MENU ITEMS
        else if(cmdArrayMenuItems.indexOf(cmdInput) > -1) {

          cmdCheck(cmdInput, 400);
          // ENTER INTO CMD LIST
          cmdListUpdate += "> " + cmdInput + "<br><br>";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();
        }
        // LIST ALL
        else if(cmdInput === "ls" || cmdInput === "dir" || cmdInput === "ls -al" || cmdInput === "ls -alt") {

          // (NOTE) CHANGE TO FOR LOOP, ITER THROUGH ARRAY
          cmdListUpdate += "> " + cmdInput + "<br><br>" + "&nbsp; > ABOUT<br>" + "&nbsp; > SKILLS<br>" + "&nbsp; > SITES<br>" + "&nbsp; > GAMES<br>" + "&nbsp; > WEB<br>" + "&nbsp; > ART<br>" + "&nbsp; > CONTACT<br>" + "&nbsp; > RESUME<br><br>";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();
          cmdCheck("ls", 400);

        }
        // CURSE WORDS
        else if(cmdArrayCurseWords.indexOf(cmdInput) > -1) {

          cmdListUpdate += "> " + cmdInput + "<br><br>";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();
          cmdCheck("curse", 400);

        }
        // GREETING
        else if(cmdInput === "hi" || cmdInput === "hello" || cmdInput === "enter") {

          cmdListUpdate += "> " + cmdInput + "<br><br>";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();
          cmdCheck("confused", 400);

        }
        // NAVIGATION COMMANDS
        else if(cmdArrayNavigation.indexOf(cmdInput) > -1) {

          cmdCheck(cmdInput, 400);
          cmdClear();

          // ENTER INTO CMD LIST
          cmdListUpdate += "> " + cmdInput + "<br><br>";
          cmdList.innerHTML = cmdListUpdate;

        }

        // HELP, HOME
        else if(cmdArrayHome.indexOf(cmdInput) > -1) {

          cmdCheck("home", 400);
          cmdClear();

          // ENTER INTO CMD LIST
          cmdListUpdate = "";
          cmdList.innerHTML = startHelpInfo + "<br><br>" + "> " + cmdInput;

        }
        else if(cmdInput === "go twitter") {

          window.open("http://www.twitter.com/arcovelo", "_blank");
          cmdListUpdate += "> " + cmdInput + "<br><br>";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();

        }
        else if(cmdInput === "go resume") {

          window.open("http://nicfontaine.com/images/nf_resume_generalArt.pdf", "_blank");
          cmdListUpdate += "> " + cmdInput + "<br><br>";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();

        }
        // ERROR COMMAND
        else {

          cmdListUpdate += "> " + cmdInput + " - [ error ]" + "<br><br>";
          cmdList.innerHTML = cmdListUpdate;
          cmdClear();
          cmdCheck("else", 400);
          document.getElementById('cmd-error-in-post').innerHTML = " " + cmdInput + " ";

        }

      }

  });

}(jQuery));

function cliInputFocus() {
  cmdInputHidden.focus();
  // console.log('cliInputFocus() has run');
}

function cmdCheck(x, y) {

  urlCmdHash = window.location.toString();
  var urlClean = urlCmdHash.split(urlSearchChar)[0];
  if (x === 'home') {
    document.location = urlClean + '#';
  }
  else {
    document.location = urlClean + '#' + x;
  }

  // RESET SCROLL WHEN RUN COMMAND, JS
  for (var i=0; i<articleInner.length; i++) {
    articleInner[i].scrollTop = 0;
  }

  // CREATE ID NAME STRING FOR SCROL ANCHOR
  cmdInputCombo = "#scroll-" + x;
  console.log(cmdInputCombo + ' is cmdInputCombo');
  cmdInputIDName = 'scroll-' + x;
  // CACHE HEIGHT OF QUERIED .POST
  // (NOTE) CONSOLE CLAIMS THIS IS NULL - ONLY ON HOME QUERY
  var hashHeight = document.getElementById(cmdInputIDName).clientHeight;
  // hashHeight *= -1;

  setArticleHeight();

  document.getElementById(cmdInputIDName).style.top = '0';

  cmdPrev = x;

  // SCROLL TO INPUT
  // (NOTE) FOR THE urlQuery ISSUE, I THINK THIS IS JUST LOADING TOO FAST IN ORDER
  $(cmdInputCombo).velocity("scroll", {
    duration: 250,
    easing: "ease-in-out",
    offset: 0
  });

  // VERTICALLY CENTER .POST
  document.getElementById(cmdInputIDName).style.top = (theHeight - hashHeight)/1.8 + 'px';

  $(articles).not(cmdInputCombo).velocity({opacity: 0}, {duration: 100});

  // FADE IN CMD ARTICLE
  $(cmdInputCombo).velocity({opacity: 1}, {duration: y});
  // (NOTE) I DON'T KNOW, IS BELOW FALLING BACK TO JQUERY?
  // $.Velocity(document.getElementById(cmdInputIDName), {opacity: 1}, {duration: y});

  hideShowScrollArrows('top', 'none');
  blurEnable = false;

  if (articleTotalHeight > scrollContainerHeight) {
    hideShowScrollArrows('bot', 'block');
    blurEnable = true;
  }

  // CACHE ARTICLE HEIGHT FOR SCROLLTOP MEASUREMENT ON ARROW KEYDOWN
  var cmdClassCache = document.getElementById(cmdInputIDName).getElementsByClassName('article-inner')[0];
  scrollContainerHeight = cmdClassCache.clientHeight-articleVertPad;

  // GET HEIGHT OF CONTENTS OF ARTICLE MINUS PADDING
  articleTotalHeight = cmdClassCache.scrollHeight-articleVertPad;

  // RESET SCROLLBARMOVE POS
  for (i = 0; i < scrollBarMove.length; i++) {
    scrollBarMove[i].style.top = 0;
  }

  // (NOTE) HAVENT YET FINISHED BELOW
  if (articleTotalHeight === scrollContainerHeight) {
    hideShowInstructionsScroll('none');
  }
  else if (scrollNo < 10 && articleTotalHeight > scrollContainerHeight) {
    hideShowInstructionsScroll('block');
  }
}

// HIDE & SHOW SCROLL ARROWS W/ 'top', 'bot', 'none', 'block'
function hideShowScrollArrows(x,y) {

  if (x === 'top') {
    for (i=0; i<scrollArrowsTop.length; i++) {
      scrollArrowsTop[i].style.display = y;
    }
  }
  else if (x === 'bot') {
    for (i=0; i<scrollArrowsBot.length; i++) {
      scrollArrowsBot[i].style.display = y;
    }
  }

}

// HIDE & SHOW INSTRUCTIONS SCROLL 'none', 'block'
function hideShowInstructionsScroll(x) {

  // if (x === 'none') {
    for (i=0; i<instructionsScroll.length; i++) {
      instructionsScroll[i].style.display = x;
    }
  // }
  // else if (x === 'block') {
    // for (i=0; i<instructionsScroll.length; i++) {
    //   instructionsScroll[i].style.display = 'block';
    // }
  // }

}

function setArticleHeight() {

  setTimeout(function() {
    theHeight = window.innerHeight;
    var theHeightDiv = theHeight/1.7;

    for (i=0; i<articleInner.length; i++) {
      articleInner[i].style.maxHeight = theHeightDiv + 'px';
    }

    // $('.article-inner').css({'max-height': theHeight/1.7});

    console.log(theHeightDiv);

    var cmdClassCache = document.getElementById(cmdInputIDName).getElementsByClassName('article-inner')[0];
    scrollContainerHeight = cmdClassCache.clientHeight-articleVertPad;

    hideShowScrollArrows('bot', 'none');
    blurEnable = false;

    if (articleTotalHeight > scrollContainerHeight) {
      hideShowScrollArrows('bot', 'block');
      blurEnable = true;
    }

    // (NOTE) NEED TO UPDATE POST CSS 'TOP' VAL. B/C OF EXTRA HEIGHT

    scrollBarHeightCalc = 100 * (scrollContainerHeight / articleTotalHeight);
    console.log('scrollBarHeightCalc = ' + scrollBarHeightCalc);

    for (i = 0; i < scrollBarMove.length; i++) {
      scrollBarMove[i].style.height = scrollBarHeightCalc + '%';
    }

    // CACHE HEIGHT OF SCROLL BAR IF POSTS IS SCROLLABLE
    if (scrollBarHeightCalc < 100) {
      var scrollBarClassCache = document.getElementById(cmdInputIDName).getElementsByClassName('scroll-bar-move')[0];
      scrollBarRenderHeightPx = scrollBarClassCache.clientHeight;
    }
  }, 50);

}

function cmdClear() {

  cmdInputHidden.value = "";
  document.getElementById("cmd").getElementsByTagName("span").innerHTML = "";

}

function cmdHideArticles() {

  $('article').velocity({opacity: 0}, {duration: 100});
  // for (i=0; i<articles.length; i++) {
  //   Velocity(articles)[i], {opacity: 0}, {duration: 100});
  // }

}

function promptFullscreen() {
  launchIntoFullscreen(document.documentElement);
}

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

  setArticleHeight();

  document.getElementById('full-confirm').style.display = 'none';
  document.querySelector('html').style.cursor = 'none';
  // cmdList.innerHTML = cmdListUpdate + "&nbsp; > FULLSCREEN<br><br>";
  // cmdClear();

}
