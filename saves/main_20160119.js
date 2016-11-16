// DATE CREATED: 20150618

// (NOTE 20160117) SOMETHING ABOUT HEIGHT OF .ARTICLE-INNER IS LIMITING LONG CONTENTS OF TEXT, NEED TO FIX - CAN SEE ON ABOUT SECTION

// FIX FOR USERS W/ DISABLED JS
document.getElementById('content-container').style.display = "inline-block";
document.getElementById('no-js-container').style.display = "none";
document.getElementById('header').style.display = "block";
document.getElementById('footer').style.display = "block";
document.getElementById('cmd-container').style.display = "block";

// FULLSCREEN CHECK URL CODE
var urlSearchChar = '?cmd=';
var urlString = window.location.toString();
var urlQuery = urlString.split(urlSearchChar);
console.log("url query is = " + urlQuery[1]);

if (urlQuery[1] === "fullscreen") {
  // refreshFullscreen();
  // launchIntoFullscreen(document.documentElement);
  var acceptFullscreen = confirm('Allow Fullscreen? Hit Enter Key to Accept');
}

if (acceptFullscreen) {
  console.log('promptFullscreen()');
  // promptFullscreen();
}

// WRITE CURRENT YEAR
var year = new Date().getFullYear();
document.getElementById("year-container").innerHTML = year;

var cmdInput;
var cmdPrev = '';
var cmdPrevArray = [];
var cmdListUpdate = "";
var uiTabVal = 0;
var scrollNo = 0;

var theHeight = window.innerHeight;

var startHelpInfo = "<span class='font-note'>(NOTE)</span> \"Commands are issued uppercase automatically - no need for caps-lock/shift\" <br /><br /><span class='font-note'>(NOTE)</span>  \"If you ever lose cursor focus of the command line re-focus with ~\" <br /><br /><span class='font-note'>(NOTE)</span>  \"You can always get back to the instructions with the <span class='font-note'>HOME</span> command\"";

var cmdArrayMenuItems = ["web", "games", "art", "about", "contact", "resume"];
var cmdArrayCurseWords = ['fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker', 'motherfucker', 'asscock', 'asshead', 'asslicker', 'asslick', 'assnigger', 'nigger', 'asssucker', 'bastard', 'bitch', 'bitchtits', 'bitches', 'bitch', 'brotherfucker', 'bullshit', 'bumblefuck', 'buttfucka', 'fucka', 'buttfucker', 'buttfucka', 'fagbag', 'fagfucker', 'faggit', 'faggot', 'faggotcock', 'fagtard', 'fatass', 'fuckoff', 'fuckstick', 'fucktard', 'fuckwad', 'fuckwit', 'dick', 'dickfuck', 'dickhead', 'dickjuice', 'dickmilk', 'doochbag', 'douchebag', 'douche', 'dickweed', 'dyke', 'dumbass', 'dumass', 'fuckboy', 'fuckbag', 'gayass', 'gayfuck', 'gaylord', 'gaytard', 'nigga', 'niggers', 'niglet', 'paki', 'piss', 'prick', 'pussy', 'poontang', 'poonany', 'porchmonkey','porch monkey', 'poon', 'queer', 'queerbait', 'queerhole', 'queef', 'renob', 'rimjob', 'ruski', 'sandnigger', 'sand nigger', 'schlong', 'shitass', 'shitbag', 'shitbagger', 'shitbreath', 'chinc', 'carpetmuncher', 'chink', 'choad', 'chode', 'clitface', 'clusterfuck', 'cockass', 'cockbite', 'cockface', 'skank', 'skeet', 'skullfuck', 'slut', 'slutbag', 'splooge', 'twatlips', 'twat', 'twats', 'twatwaffle', 'vaj', 'vajayjay', 'va-j-j', 'wank', 'wankjob', 'wetback', 'whore', 'whorebag', 'whoreface', 'shitfucker', 'ass', 'shitfucker', 'shitfuck'];
var cmdArrayNavigation = ["back"];
var cmdArrayHome = ["home", "help", "refresh", "index", "welcome", "splash"];

document.getElementById('cmd-list').innerHTML = startHelpInfo;

// JQUERY
(function($) {

  var cursor;

  $('.article-inner').css({'max-height': theHeight/2});
  console.log(theHeight/2);

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

    $('html').css('background-color', 'hsl(' + colorInit2 + ',25%,10%)');
    // $('#cmd-container').css({'background': '-moz-linear-gradient( hsl(' + colorInit2 + ',37%,24%), hsl(' + colorInit2 + ',37%,20%) )'});
    document.getElementById('header-nav').style.color = 'hsl(' + colorInit2 + ',53%,38%)';
    $('header').css({'background': 'linear-gradient(hsl(' + colorInit2 + ',37%,24%), hsl(' + colorInit2 + ',37%,20%))', 'border-bottom': '1px solid hsl(' + colorInit2 + ',40%,21%)'});
    document.getElementById('cmd-input-hidden').style.color = 'hsl(' + colorInit2 + ',55%,40%)';
    $('#cmd span, #cmd-input-container, .font-note').css('color', 'hsl(' + colorInit2 + ',55%,45%)');
    $('#cmd').css('border-color', 'hsl(' + colorInit2 + ',55%,40%)');
    $('#cursor').css('background-color', 'hsl(' + colorInit2 + ',55%,40%)');
    $('footer').css({'background-color': 'hsl(' + colorInit2 + ',21%,7%)', 'color': 'hsl(' + colorInit2 + ',53%,38%)'});
    $('footer').css('color', 'hsl(' + colorInit2 + ',53%,38%)');
    $('#social-container a i').css('color', 'hsl(' + colorInit2 + ',53%,38%)');
    $('#cmd-list-container').css('background-color', 'hsl(' + colorInit2 + ',5%,3%)');
    // $('.font-code').css('background-color', 'hsl(' + colorInit2 + ',11%,12%)');
    // $('.font-code').css('background-color', 'hsl(' + colorInit2 + ',37%,24%)');

    $('#cmd-list').css({'color': 'hsl(' + colorInit1 + ',55%,50%)', 'textShadow': '0 0 3px hsl(' + colorInit1 + ',55%,40%)'});
    $('.font-code').css({'color': 'hsl(' + colorInit1 + ',55%,50%)'});
    $('.font-code-bracket').css({'color': 'hsl(' + colorInit1 + ',55%,25%)'});
    // $('#cmd-list').css('textShadow', '0 0 3px hsl(' + colorInit1 + ',55%,40%)');

  }

  var colorScrubInterval = setInterval(iterColor,200);;

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

    // SCROLL .ARTICLE-INNER ON UP & DOWN ARROW
    document.querySelector('#cmd-input-hidden').addEventListener('keydown', function (e) {
      if (e.which == 9) {
        e.preventDefault();
      } else if (e.which == 40) {
        var y = $('.article-inner').scrollTop();
        $('.article-inner').scrollTop(y + 10);
        // console.log('scrollTop() = ' + y);
        // console.log($('.article-inner').height());
        scrollNo++;

        // KILL INSTRUCTIONS
        if (scrollNo === 10) {
          $('.instructions-scroll').hide();
        }

      } else if (e.which == 38) {
        var y = $('.article-inner').scrollTop();
        $('.article-inner').scrollTop(y - 10);
        // PREVENT INCR IF ALREADY AT TOP
        if (y !== 0) {
          scrollNo++;
        }

        // KILL INSTRUCTIONS
        if (scrollNo === 10) {
          $('.instructions-scroll').hide();
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
    jQuery('html').keyup(function(e) {

      $('input').keyup(function() {
        $('#cmd span').text($(this).val());
      });

      if (e.which === 9) {
        e.preventDefault();
      }

      if(e.keyCode === 9) {

        if(uiTabVal === 0) {
          // CLI MODE
          console.log('tab val - 0');
          uiTabVal = 1;

          document.getElementById('instructions-cli-container').style.display = 'none';
          document.getElementById('instructions-gui-container').style.display = 'block';
          document.getElementById('cmd-container').style.display = 'none';
          $('html').css({'cursor': 'initial'});
        }
        else {
          // GUI MODE
          console.log('tab val - 1');
          uiTabVal = 0;

          document.getElementById('instructions-gui-container').style.display = 'none';
          document.getElementById('instructions-cli-container').style.display = 'block';
          document.getElementById('cmd-container').style.display = 'block';
          $('html').css({'cursor': 'none'});
          cliInputFocus();
        }

      }

    });

    // FOCUS INPUT ON CLICK ANYWHERE
    $('html').click(function() {

      cliInputFocus();
      console.log('focus click');

    });

    document.querySelector('html').addEventListener('keydown', function (e) {
      // (NOTE) NEED TO DISABLE IF WHEN BOTTOM
      if (e.which == 192) {
        e.preventDefault();
      }
    });

    // FOCUS INPUT ON ~
    $('html').keyup(function(e) {
      if (e.which === 192) {
        // $('#cmd-input-hidden').focus();
        cliInputFocus();
        console.log('focus ~');
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
            // document.getElementById('cmd-list').innerHTML = cmdListUpdate + "&nbsp; > FULLSCREEN<br><br>";
            // cmdClear();

            window.location = 'file:///C:/Users/nic/Dropbox/NF_Creative/NF_Website/nicfontaine.com_20150618/index.html?cmd=fullscreen';
          }

          else if(cmdInput === "curse") {
            // LETS CREATE A RANDOM CURSE WORD
            var randCurse = cmdArrayCurseWords[Math.floor(Math.random() * cmdArrayCurseWords.length)];
            cmdListUpdate = '';
            cmdListUpdate = randCurse + '<br><br>';
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            cmdClear();
          }

          else if(cmdInput === "clear") {
            cmdListUpdate = "";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            cmdClear();
          }

          // IF IS MENU ITEMs
          else if(cmdArrayMenuItems.indexOf(cmdInput) > -1) {

            cmdCheck(cmdInput);
            cmdClear();

            // ENTER INTO CMD LIST
            cmdListUpdate += "> " + cmdInput + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
          }

          // LIST ALL
          else if(cmdInput === "ls" || cmdInput === "dir" || cmdInput === "ls -al" || cmdInput === "ls -alt") {

            // (NOTE) CHANGE TO FOR LOOP, ITER THROUGH ARRAY

            cmdListUpdate += "> " + cmdInput + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate + "&nbsp; > ABOUT<br>" + "&nbsp; > GAMES<br>" + "&nbsp; > WEB<br>" + "&nbsp; > ART<br>" + "&nbsp; > CONTACT<br>" + "&nbsp; > RESUME<br>";
            cmdClear();
            cmdCheck("ls");

          }

          // CURSE WORDS
          else if(cmdArrayCurseWords.indexOf(cmdInput) > -1) {

            cmdListUpdate += "> " + cmdInput + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            cmdClear();
            cmdCheck("curse");

          }

          // GREETING
          else if(cmdInput === "hi" || cmdInput === "hello" || cmdInput === "enter") {

            cmdListUpdate += "> " + cmdInput + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            cmdClear();
            cmdCheck("confused");

          }

          // NAVIGATION COMMANDS
          else if(cmdArrayNavigation.indexOf(cmdInput) > -1) {

            cmdCheck(cmdInput);
            cmdClear();

            // ENTER INTO CMD LIST
            cmdListUpdate += "> " + cmdInput + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;

          }

          // HELP, HOME
          else if(cmdArrayHome.indexOf(cmdInput) > -1) {

            cmdCheck("welcome");
            cmdClear();

            // ENTER INTO CMD LIST
            cmdListUpdate = "";
            cmdListUpdate += "> " + cmdInput + "<br><br>" + startHelpInfo;
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;

          }

          else if(cmdInput === "go twitter") {

            window.open("http://www.twitter.com/arcovelo", "_blank");
            cmdListUpdate += "> " + cmdInput + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            cmdClear();

          }

          else if(cmdInput === "go resume") {

            window.open("http://nicfontaine.com/images/nf_resume_generalArt.pdf", "_blank");
            cmdListUpdate += "> " + cmdInput + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            cmdClear();

          }

          // ERROR COMMAND
          else {

            cmdListUpdate += "> " + cmdInput + " - error" + "<br><br>";
            document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            cmdClear();
            cmdCheck("else");
            document.getElementById('cmd-error-in-post').innerHTML = " " + cmdInput + " ";

          }

        }

    });

}(jQuery));

function cliInputFocus() {
  $('#cmd-input-hidden').focus();
}

function cmdCheck(x) {

  // RESET SCROLL WHEN RUN COMMAND
  $('.article-inner').scrollTop(0);

  // CREATE ID NAME STRING FOR SCROL ANCHOR
  var cmdInputCombo = "#scroll-" + x;
  var cmdInputIDName = 'scroll-' + x;
  // CACHE HEIGHT OF QUERIED .POST
  var hashHeight = document.getElementById(cmdInputIDName).clientHeight;
  // hashHeight *= -1;

  $(cmdInputCombo).css({'top': '0'})

  cmdPrev = x;

  // if (cmdPrevArray.indexOf(cmdInputCombo) === -1) {
  //   cmdPrevArray.push(cmdInputCombo);
  //   console.log('pushed');
  // }

  // SCROLL TO INPUT
  $(cmdInputCombo).velocity("scroll", {
      duration: 250,
      easing: "ease-in-out",
      offset: 0
  });

  // VERTICALLY CENTER .POST
  $(cmdInputCombo).css({'top': ((theHeight - hashHeight)/2.2) + 'px'});

  console.log('.post top adj - ' + $(cmdInputCombo).css('top'));
  // (NOTE) > A, > B, > A doesn't work correctly.

  // CACHE NOT CMD ARTICLES, FADE THEM OUT
  var notCMD = $('article').not(cmdInputCombo);
  if (notCMD) {
      $(notCMD).velocity({opacity: 0}, {duration: 100});
  }
  // FADE IN CMD ARTICLE
  $(cmdInputCombo).velocity({opacity: 1});

}

function cmdClear() {

  document.getElementById("cmd-input-hidden").value = "";
  document.getElementById("cmd").getElementsByTagName("span").innerHTML = "";
  console.log('cmdClear()');

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

  document.getElementById('cmd-list').innerHTML = cmdListUpdate + "&nbsp; > FULLSCREEN<br><br>";
  // cmdClear();

}

// INFINITE SCROLL
/*var ias = $.ias({
    container: "#content-container",
    item: ".post",
    pagination: "#pagination",
    next: ".next a"
});*/
