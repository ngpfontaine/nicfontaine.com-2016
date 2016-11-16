// DATE CREATED: 20150618

// FULLSCREEN CHECK URL CODE
// var urlSearchChar = '?cmd=';
// var urlString = window.location.toString();
// var urlQuery = urlString.split(urlSearchChar);
// console.log("url query is = " + urlQuery[1]);

// if (urlQuery[1] === "fullscreen") {
  // refreshFullscreen();
  // launchIntoFullscreen(document.documentElement);

  // var acceptFullscreen = confirm('Allow Fullscreen? Hit Enter Key to Accept');
  // document.getElementById('full-confirm').style.display = block;
// }

// if (acceptFullscreen) {
//   console.log('promptFullscreen()');
//   // (NOTE) BELOW IS DISABLED TO CANCEL UNTIL I FIGURE OUT THE FULLSCREEN FAILURE
//   promptFullscreen();
// }

// WRITE CURRENT YEAR
var year = new Date().getFullYear();
document.getElementById("year-container").innerHTML = year;

var theHeight = window.innerHeight;
var cmdInput;
var cmdInputCombo = '';
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

// LET'S CACHE SOME DOM ELEMENTS TO VARS
var containerCli = document.getElementById('instructions-cli-container');
var containerGui = document.getElementById('instructions-gui-container');
var containerCmd = document.getElementById('cmd-container');
var cmdList = document.getElementById('cmd-list');

var scrollArrowsBot = document.querySelectorAll('.scroll-arrow-bot');
var scrollArrowsTop = document.querySelectorAll('.scroll-arrow-top');

var scrollBarMove = document.querySelectorAll('.scroll-bar-move');
// (NOTE) IF .ARTICLE-INNER PADDING CHANGES THIS NEEDS TO CHANGE
var articleVertPad = 140;

var startHelpInfo = "<span class='font-note'>(NOTE)</span> \"Commands are issued uppercase automatically - no need for caps-lock/shift\" <br /><br /><span class='font-note'>(NOTE)</span>  \"If you ever lose cursor focus of the command line re-focus with the TAB key\" <br /><br /><span class='font-note'>(NOTE)</span>  \"You can always get back to the instructions with the <span class='font-note'>HOME</span> command\"";

var cmdArrayMenuItems = ["web", "games", "art", "about", "contact", "resume"];
var cmdArrayCurseWords = ['fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker', 'motherfucker', 'asscock', 'asshead', 'asslicker', 'asslick', 'assnigger', 'nigger', 'asssucker', 'bastard', 'bitch', 'bitchtits', 'bitches', 'bitch', 'brotherfucker', 'bullshit', 'bumblefuck', 'buttfucka', 'fucka', 'buttfucker', 'buttfucka', 'fagbag', 'fagfucker', 'faggit', 'faggot', 'faggotcock', 'fagtard', 'fatass', 'fuckoff', 'fuckstick', 'fucktard', 'fuckwad', 'fuckwit', 'dick', 'dickfuck', 'dickhead', 'dickjuice', 'dickmilk', 'doochbag', 'douchebag', 'douche', 'dickweed', 'dyke', 'dumbass', 'dumass', 'fuckboy', 'fuckbag', 'gayass', 'gayfuck', 'gaylord' , 'gaytard', 'nigga', 'niggers', 'niglet', 'paki', 'piss', 'prick', 'pussy', 'poontang', 'poonanny', 'poonany', 'porchmonkey', 'porch monkey', 'poon', 'queer', 'queerbait', 'queerhole', 'queef', 'renob', 'rimjob', 'ruski', 'sandnigger', 'sand nigger', 'schlong', 'shitass', 'shitbag', 'shitbagger', 'shitbreath', 'chinc', 'carpetmuncher', 'chink', 'choad', 'chode', 'clitface', 'clusterfuck', 'cockass', 'cockbite', 'cockface', 'skank', 'skeet', 'skullfuck', 'slut', 'slutbag', 'splooge', 'twatlips', 'twat', 'twats', 'twatwaffle', 'vaj', 'vajayjay', 'va-j-j', 'wank', 'wankjob', 'wetback', 'whore', 'whorebag', 'whoreface', 'shitfucker', 'ass', 'shitfucker', 'shitfuck'];
var cmdArrayNavigation = ["back"];
var cmdArrayHome = ["home", "help", "refresh", "index", "welcome", "splash"];

cmdList.innerHTML = startHelpInfo;

// JQUERY
(function($) {

  var cursor;

  $('.article-inner').css({'max-height': theHeight/1.7});

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

    // $('header').css({'background': 'linear-gradient(hsl(' + colorInit2 + ',37%,24%), hsl(' + colorInit2 + ',37%,20%))', 'border-bottom': '1px solid hsl(' + colorInit2 + ',40%,21%)'});
    document.getElementById('cmd-input-hidden').style.color = 'hsl(' + colorInit2 + ',55%,40%)';

  }

  var colorScrubInterval = setInterval(iterColor,100);

    // INITAL SCROLL TO WELCOME ARTICLE
    // $("#scroll-welcome").velocity("scroll", {
    //     duration: 250,
    //     easing: "ease-in-out",
    //     offset: -100
    // });

    // AUTOFOCUS CMD INPUT
    var windowW = screen.availWidth;
    if (windowW > 848) {
        jQuery(document).ready(function($) {
            // jQuery('#cmd-input-hidden').focus();
            cliInputFocus();
        });
    }

    $('.scroll-arrow-top').hide();

    // SCROLL .ARTICLE-INNER ON UP & DOWN ARROW
    document.querySelector('#cmd-input-hidden').addEventListener('keydown', function (e) {

      if (e.which == 9) {
        e.preventDefault();
      }
      // (NOTE) SCROLL BAR MOVES 1 UP/DOWN AFTER DIRECTION CHANGE
      // DOWN
      else if (e.which == 40) {
        var scrollTopStart = $(cmdInputCombo + '> .article-inner').scrollTop();
        $(cmdInputCombo + '> .article-inner').scrollTop(scrollTopStart + 7);
        var scrollTopPlus = $(cmdInputCombo + '> .article-inner').scrollTop();

        // (NOTE) NEED TO FIX, MAKE ONLY INC IF NOT AT BOTTOM?
        // if (y <= scrollContainerHeight) {
        //   scrollNo++;
        // }

        // ADD & REMOVE BLINKING CLASS - VANILLA JS
        for (var i=0; i<scrollArrowsBot.length; i++) {
          scrollArrowsBot[i].className = 'scroll-arrow-bot scroll-arrow-active-bot';
        }
        $(this).on('keyup', function() {
          // $('.scroll-arrow-bot').removeClass('scroll-arrow-active-bot');
          for (var i=0; i<scrollArrowsBot.length; i++) {
            scrollArrowsBot[i].className = 'scroll-arrow-bot';
          }
        });

        // (NOTE) NEED TO MAKE SCROLL-BAR-MOVE HEIGHT: DEPENDANT ON SCROLL CONT HEIGHT

        // CALCULATE DISTANCE SCROLLED AS PERCENT
        scrollDistCalc = scrollTopStart / (articleTotalHeight - scrollContainerHeight);
        var scrollDistPx = (scrollContainerHeight + articleVertPad - scrollBarRenderHeightPx) * scrollDistCalc;
        // console.log(scrollDistPx + ' scrollDistPx');
        for (i = 0; i < scrollBarMove.length; i++) {
          scrollBarMove[i].style.top = scrollDistPx + 'px';
        }

        // console.log(scrollContainerHeight + ' scroll container height');
        // console.log(scrollTopStart + ' scroll top start');
        // console.log(articleTotalHeight + ' article total height');

        scrollNo++;

        // IF SCROLL TO BOTTOM
        if (scrollTopStart + scrollContainerHeight > articleTotalHeight - 2) {
          $('.scroll-arrow-bot').hide();
        }

        // (NOTE) NEED LOGIC TO DEFAULT HIDDEN, ONLY DISPLAY IF CONT IS OVERFLOW
        // KILL INSTRUCTIONS
        if (scrollNo === 10) {
          $('.instructions-scroll').hide();
        }

        if (scrollTopPlus > 0) {
          $('.scroll-arrow-top').show();
        }

      }
      // UP
      else if (e.which == 38) {
        var scrollTopStart = $(cmdInputCombo + '> .article-inner').scrollTop();
        $(cmdInputCombo + '> .article-inner').scrollTop(scrollTopStart - 7);
        var scrollTopMinus = $(cmdInputCombo + '> .article-inner').scrollTop();
        // PREVENT INCR IF ALREADY AT TOP
        if (scrollTopStart !== 0) {
          scrollNo++;
        }

        // ADD & REMOVE BLINKING CLASS - VANILLA JS
        for (var i=0; i<scrollArrowsTop.length; i++) {
          scrollArrowsTop[i].className = 'scroll-arrow-top scroll-arrow-active-top';
        }
        $(this).on('keyup', function() {
          for (var i=0; i<scrollArrowsTop.length; i++) {
            scrollArrowsTop[i].className = 'scroll-arrow-top';
          }
        });

        // CALCULATE DISTANCE SCROLLED AS PERCENT
        scrollDistCalc = scrollTopStart / (articleTotalHeight - scrollContainerHeight);
        // console.log(scrollDistCalc + ' scrollDistCalc');
        var scrollDistPx = (scrollContainerHeight + articleVertPad - scrollBarRenderHeightPx) * scrollDistCalc;
        for (i = 0; i < scrollBarMove.length; i++) {
          scrollBarMove[i].style.top = scrollDistPx + 'px';
        }

        $('.scroll-arrow-bot').show();

        // KILL INSTRUCTIONS
        if (scrollNo === 10) {
          $('.instructions-scroll').hide();
        }

        if (scrollTopMinus === 0) {
          $('.scroll-arrow-top').hide();
        }

      }
    });

    // BLOCK CURSOR CODE
    cursor = window.setInterval(function() {
    if ($('#cursor').css('visibility') === 'visible') {
      $('#cursor').css({ visibility: 'hidden' });
    } else {
      $('#cursor').css({ visibility: 'visible' });
    }
    }, 500);

    // CHANGE UI W/ TAB
    // (NOTE) NEED TO DISABLE IF 'CMD' KEY IS ACTIVE, MAYBE OTHERS
    // (NOTE) MESSING UP CSS SCRUB VALUES/SYNC
    jQuery('html').keyup(function(e) {

      $('input').keyup(function() {
        $('#cmd span').text($(this).val());
      });

      if (e.which === 9) {
        e.preventDefault();
      }

      var tabEnable = false;

      if(e.keyCode === 9 && tabEnable) {

        if(uiTabVal === 0) {
          // GUI MODE
          console.log('tab val - 0');
          uiTabVal = 1;

          containerCli.style.display = 'none';
          containerGui.style.display = 'block';
          containerCmd.style.display = 'none';

          $('html').css({'cursor': 'initial'});

        }
        else {
          // CLI MODE
          console.log('tab val - 1');
          uiTabVal = 0;

          containerCli.style.display = 'block';
          containerGui.style.display = 'none';
          containerCmd.style.display = 'block';

          $('html').css({'cursor': 'none'});
          cliInputFocus();

          cmdCheck('welcome');

        }

      }

    });

    // FOCUS INPUT ON CLICK ANYWHERE
    // (NOTE) REPLACED W/ AN ONCLICK IN DOM HTML TAG
    // $('html').click(function() {
    //
    //   cliInputFocus();
    //   console.log('focus click');
    //
    // });

    // (NOTE) NEED TO DISABLE 'BACKPACE' AS BROWSER BACK, BUT KEEP ON INPUT FIELD

    document.querySelector('html').addEventListener('keydown', function (e) {
      // (NOTE) NEED TO DISABLE IF WHEN BOTTOM
      if (e.which == 192) {
        e.preventDefault();
      }
    });

    // FOCUS INPUT ON 'TAB'
    $('html').keyup(function(e) {
      if (e.which === 9) {
        // $('#cmd-input-hidden').focus();
        cliInputFocus();
        console.log('focus tab');
      }
    });

    // RUN ON KEYUP, IF ELSES, ADD TXT TO CMD LIST, cmdCheck();
    $('#cmd-input-hidden').keyup(function(e) {

        //$('welcome').velocity("fadeOut",{duration: 200});

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

          // IF IS MENU ITEMs
          else if(cmdArrayMenuItems.indexOf(cmdInput) > -1) {

            cmdCheck(cmdInput);
            cmdClear();

            // ENTER INTO CMD LIST
            cmdListUpdate += "> " + cmdInput + "<br><br>";
            cmdList.innerHTML = cmdListUpdate;
          }

          // LIST ALL
          else if(cmdInput === "ls" || cmdInput === "dir" || cmdInput === "ls -al" || cmdInput === "ls -alt") {

            // (NOTE) CHANGE TO FOR LOOP, ITER THROUGH ARRAY

            cmdListUpdate += "> " + cmdInput + "<br><br>";
            cmdList.innerHTML = cmdListUpdate + "&nbsp; > ABOUT<br>" + "&nbsp; > GAMES<br>" + "&nbsp; > WEB<br>" + "&nbsp; > ART<br>" + "&nbsp; > CONTACT<br>" + "&nbsp; > RESUME<br>";
            cmdClear();
            cmdCheck("ls");

          }

          // CURSE WORDS
          else if(cmdArrayCurseWords.indexOf(cmdInput) > -1) {

            cmdListUpdate += "> " + cmdInput + "<br><br>";
            cmdList.innerHTML = cmdListUpdate;
            cmdClear();
            cmdCheck("curse");

          }

          // GREETING
          else if(cmdInput === "hi" || cmdInput === "hello" || cmdInput === "enter") {

            cmdListUpdate += "> " + cmdInput + "<br><br>";
            cmdList.innerHTML = cmdListUpdate;
            cmdClear();
            cmdCheck("confused");

          }

          // NAVIGATION COMMANDS
          else if(cmdArrayNavigation.indexOf(cmdInput) > -1) {

            cmdCheck(cmdInput);
            cmdClear();

            // ENTER INTO CMD LIST
            cmdListUpdate += "> " + cmdInput + "<br><br>";
            cmdList.innerHTML = cmdListUpdate;

          }

          // HELP, HOME
          else if(cmdArrayHome.indexOf(cmdInput) > -1) {

            cmdCheck("welcome");
            cmdClear();

            // ENTER INTO CMD LIST
            cmdListUpdate = "";
            cmdListUpdate += "> " + cmdInput + "<br><br>" + startHelpInfo;
            cmdList.innerHTML = cmdListUpdate;

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

            cmdListUpdate += "> " + cmdInput + " - error" + "<br><br>";
            cmdList.innerHTML = cmdListUpdate;
            cmdClear();
            cmdCheck("else");
            document.getElementById('cmd-error-in-post').innerHTML = " " + cmdInput + " ";

          }

        }

    });

}(jQuery));

function cliInputFocus() {
  document.getElementById('cmd-input-hidden').focus();
  // console.log('cliInputFocus() has run');
}

function cmdCheck(x) {

  // RESET SCROLL WHEN RUN COMMAND
  $('.article-inner').scrollTop(0);

  // CREATE ID NAME STRING FOR SCROL ANCHOR
  cmdInputCombo = "#scroll-" + x;
  var cmdInputIDName = 'scroll-' + x;
  // CACHE HEIGHT OF QUERIED .POST
  var hashHeight = document.getElementById(cmdInputIDName).clientHeight;
  // hashHeight *= -1;

  $(cmdInputCombo).css({'top': '0'})

  cmdPrev = x;

  // SCROLL TO INPUT
  $(cmdInputCombo).velocity("scroll", {
    duration: 250,
    easing: "ease-in-out",
    offset: 0
  });

  // VERTICALLY CENTER .POST
  $(cmdInputCombo).css({'top': ((theHeight - hashHeight)/1.8) + 'px'});

  // console.log('.post top adj - ' + $(cmdInputCombo).css('top'));
  // (NOTE) > A, > B, > A doesn't work correctly.

  // CACHE NOT CMD ARTICLES, FADE THEM OUT
  var notCMD = $('article').not(cmdInputCombo);
  if (notCMD) {
      $(notCMD).velocity({opacity: 0}, {duration: 100});
  }
  // FADE IN CMD ARTICLE
  $(cmdInputCombo).velocity({opacity: 1});

  setArticleHeight();

  $('.scroll-arrow-top').hide();

  if (articleTotalHeight > scrollContainerHeight) {
    $('.scroll-arrow-bot').show();
  }

  // CACHE ARTICLE HEIGHT FOR SCROLLTOP MEASUREMENT ON ARROW KEYDOWN
  scrollContainerHeight = $(cmdInputCombo + '> .article-inner').height();

  // GET HEIGHT OF CONTENTS OF ARTICLE MINUS PADDING
  articleTotalHeight = ($(cmdInputCombo + '> .article-inner').get(0).scrollHeight) - articleVertPad;
  // console.log(scrollContainerHeight + ' no. 1');

  // RESET SCROLLBARMOVE POS
  for (i = 0; i < scrollBarMove.length; i++) {
    scrollBarMove[i].style.top = 0;
  }

  // (NOTE) HAVENT YET FINISHED BELOW
  if (articleTotalHeight === scrollContainerHeight) {
    $('.instructions-scroll').hide();
  }
  else if (scrollNo < 10 && articleTotalHeight > scrollContainerHeight) {
    // (NOTE) REPLACE TO REMOVE JQUERY
    $('.instructions-scroll').show();
  }
}

function setArticleHeight() {

  setTimeout(function() {
    theHeight = window.innerHeight;
    $('.article-inner').css({'max-height': theHeight/1.7});
    // console.log(theHeight);

    scrollContainerHeight = $(cmdInputCombo + '> .article-inner').height();

    $('.scroll-arrow-bot').hide();

    if (articleTotalHeight > scrollContainerHeight) {
      $('.scroll-arrow-bot').show();
    }

    // (NOTE) NEED TO UPDATE POST CSS 'TOP' VAL. B/C OF EXTRA HEIGHT

    scrollBarHeightCalc = 100 * (scrollContainerHeight / articleTotalHeight);
    console.log(scrollBarHeightCalc);

    for (i = 0; i < scrollBarMove.length; i++) {
      scrollBarMove[i].style.height = scrollBarHeightCalc + '%';
    }

    scrollBarRenderHeightPx = $('.scroll-bar-move').height();

  }, 50);

}

function cmdClear() {

  document.getElementById("cmd-input-hidden").value = "";
  document.getElementById("cmd").getElementsByTagName("span").innerHTML = "";

}

function cmdHideArticles() {

  $('article').velocity({opacity: 0}, {duration: 100});

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

// INFINITE SCROLL
/*var ias = $.ias({
    container: "#content-container",
    item: ".post",
    pagination: "#pagination",
    next: ".next a"
});*/
