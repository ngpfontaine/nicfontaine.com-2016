// DATE CREATED: 20150618

// WRITE CURRENT YEAR
var year = new Date().getFullYear();
document.getElementById("year-container").innerHTML = year;

var cmdInput;
var cmdListUpdate = "";

var cmdArrayMenuItems = ["web", "games", "art", "about", "contact"];
var cmdArrayCurseWords = ['fuck', 'shit', 'asshole', 'cunt', 'fag', 'fuk', 'fck', 'fcuk', 'assfuck', 'assfucker', 'fucker', 'motherfucker', 'asscock', 'asshead', 'asslicker', 'asslick', 'assnigger', 'nigger', 'asssucker', 'bastard', 'bitch', 'bitchtits', 'bitches', 'bitch', 'brotherfucker', 'bullshit', 'bumblefuck', 'buttfucka', 'fucka', 'buttfucker', 'buttfucka', 'fagbag', 'fagfucker', 'faggit', 'faggot', 'faggotcock', 'fagtard', 'fatass', 'fuckoff', 'fuckstick', 'fucktard', 'fuckwad', 'fuckwit', 'dick', 'dickfuck', 'dickhead', 'dickjuice', 'dickmilk', 'doochbag', 'douchebag', 'douche', 'dickweed', 'dyke', 'dumbass', 'dumass', 'fuckboy', 'fuckbag', 'gayass', 'gayfuck', 'gaylord', 'gaytard', 'nigga', 'niggers', 'niglet', 'paki', 'piss', 'prick', 'pussy', 'poontang', 'poonany', 'porchmonkey','porch monkey', 'poon', 'queer', 'queerbait', 'queerhole', 'queef', 'renob', 'rimjob', 'ruski', 'sandnigger', 'sand nigger', 'schlong', 'shitass', 'shitbag', 'shitbagger', 'shitbreath', 'chinc', 'carpetmuncher', 'chink', 'choad', 'chode', 'clitface', 'clusterfuck', 'cockass', 'cockbite', 'cockface', 'skank', 'skeet', 'skullfuck', 'slut', 'slutbag', 'splooge', 'twatlips', 'twat', 'twats', 'twatwaffle', 'vaj', 'vajayjay', 'va-j-j', 'wank', 'wankjob', 'wetback', 'whore', 'whorebag', 'whoreface', 'shitfucker'];
var cmdArrayNavigation = ["back"];
var cmdArrayHome = ["home", "help", "refresh", "index", "welcome", "splash"];

$(document).ready(function() {

    // INITAL SCROLL TO WELCOME ARTICLE
    $("#scroll-welcome").velocity("scroll", {
        duration: 250,
        easing: "ease-in-out",
        offset: -100
    });

    // AUTOFOCUS CMD INPUT
    var windowW = screen.availWidth;
    if (windowW > 848) {
        jQuery(document).ready(function($) {
            jQuery('#cmd-input-hidden').focus();
        });
    }

    document.querySelector('#cmd-input-hidden').addEventListener('keydown', function (e) {
    if (e.which == 9) {
        e.preventDefault();
    }
    });

    // FOCUS INPUT ON CLICK ANYWHERE
    $('html').click(function() {

            $('#cmd-input-hidden').focus();

    });

    // RUN ON KEYUP, IF ELSES, ADD TXT TO CMD LIST, cmdCheck();
    $('#cmd-input-hidden').keyup(function(e) {

        //$('welcome').velocity("fadeOut",{duration: 200});

        // CACHE INPUT, CONVERT TO LOWER CASE
        cmdInput = document.getElementById("cmd-input-hidden").value.toLowerCase();

        // IF KEY IS ENTER
        if(e.keyCode === 13 &&  cmdInput !== "") {

            // IF IS MENU ITEM
            if(cmdArrayMenuItems.indexOf(cmdInput) > -1) {

                //console.log(cmdInput);
                cmdCheck(cmdInput);
                cmdClear();

                // ENTER INTO CMD LIST
                cmdListUpdate += "> " + cmdInput + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate;
            }

            // LIST ALL
            else if(cmdInput === "ls") {

                // NOTE CHANGE TO FOR LOOP, ITER THROUGH ARRAY

                cmdListUpdate += "$ " + cmdInput + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate + "&nbsp; > ART<br>" + "&nbsp; > GAMES<br>" + "&nbsp; > WEB<br>" + "&nbsp; > ABOUT<br>" + "&nbsp; > CONTACT";
                cmdClear();
                cmdCheck("ls");

            }

            // CURSE WORDS
            else if(cmdArrayCurseWords.indexOf(cmdInput) > -1) {

                cmdListUpdate += "$ " + cmdInput + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate;
                cmdClear();
                cmdCheck("curse");

            }

            // GREETING
            else if(cmdInput === "hi" || cmdInput === "hello" || cmdInput === "enter") {

                cmdListUpdate += "$ " + cmdInput + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate;
                cmdClear();
                cmdCheck("confused");

            }

            // NAVIGATION COMMANDS
            else if(cmdArrayNavigation.indexOf(cmdInput) > -1) {

                cmdCheck(cmdInput);
                cmdClear();

                // ENTER INTO CMD LIST
                cmdListUpdate += "> " + cmdInput + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate;

            }

            // HELP, HOME
            else if(cmdArrayHome.indexOf(cmdInput) > -1) {

                cmdCheck("welcome");
                cmdClear();

                // ENTER INTO CMD LIST
                cmdListUpdate += "> " + cmdInput + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate;

            }

            else if(cmdInput === "go twitter") {

                window.open("http://www.twitter.com/arcovelo", "_blank");
                cmdListUpdate += "$ " + cmdInput + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate;
                cmdClear();


            }

            // ERROR COMMAND
            else {

                cmdListUpdate += "$ " + cmdInput + " - error" + "<br>";
                document.getElementById('cmd-list').innerHTML = cmdListUpdate;
                cmdClear();
                cmdCheck("else");
                document.getElementById('cmd-error-in-post').innerHTML = " " + cmdInput + " ";

            }

        }
    });

});

function cmdCheck(x) {

    // CREATE ID NAME STRING FOR SCROL ANCHOR
    var cmdInputCombo = "#scroll-" + x;

    // SCROLL TO INPUT
    $(cmdInputCombo).velocity("scroll", {
        duration: 250,
        easing: "ease-in-out",
        offset: -100
    });
    // CACHE NOT CMD ARTICLES, FADE THEM OUT
    var notCMD = $('article').not(cmdInputCombo);
    if (notCMD) {
        $(notCMD).velocity({opacity: 0}, {duration: 200});
    }
    // FADE IN CMD ARTICLE
    $(cmdInputCombo).velocity({opacity: 1});

}

function cmdClear() {

    document.getElementById("cmd-input-hidden").value = "";

}

function cmdHideArticles() {

    $('article').velocity({opacity: 0}, {duration: 100});

}

// INFINITE SCROLL
/*var ias = $.ias({
    container: "#content-container",
    item: ".post",
    pagination: "#pagination",
    next: ".next a"
});*/
