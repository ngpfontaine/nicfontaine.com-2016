// (NOTE) STILL NEED 'TO-TOP' BUTTON ON EVERY PAGE
// (NOTE) MAYBE A 'BACK' BUTTON ON CONTENT PAGES?
// (NOTE) 'HOME' ICON IN BREADCRUMBS?

var theHeight = window.innerHeight;
var scrollAmt = 0;
var fadeEnable = true;
var drawerHeaderClosed = true;
var filename;
var filenameId;
var sectionPush;
var urlString = window.location.toString();
var domC = {
  htmlTag: document.getElementsByTagName("html"),
  bodyInner: document.getElementsByClassName("body-inner"),
  header: document.getElementsByTagName('header'),
  headerInner: document.getElementsByClassName("header-inner"),
  headerDrawer: document.getElementsByClassName("header-drawer"),
  headerDrawerLink: document.getElementsByClassName('header-drawer-link'),
  pageNavContainer : document.getElementsByClassName('page-nav-container'),
  section: document.getElementsByTagName("section"),
  upDnToggle: document.getElementsByClassName("up-dn-toggle"),
  footer: document.getElementsByTagName("footer"),
  iconDragUp: document.getElementsByClassName("icon-drag-up")
};
var noPageNavContainer = domC.pageNavContainer.length;
var noSection = domC.section.length;

filename = urlString.replace(/^.*[\\\/]/, '');
// IF HOME
if (filename.length > 0) {
  filenameId = 'images/' + filename.split('.')[0] + '-c.png';
  // (NOTE) CHANGE WHEN REMOVE FILE EXTENSIONS ON SERVER SETTINGS
  // filenameId = 'images/' + filename + '.png';
  console.log(filename);
  console.log('filename.length ' + filename.length);
}
// NOT INDEX, I.E. HAS PAGE NAME AFTER LAST SLASH
else {
  filenameId = 'images/index.png';
}

// SET BG IMG
domC.htmlTag[0].style.backgroundImage = 'url(' + filenameId + ')';
// document.getElementsByTagName('html')[0].style.backgroundImage = 'url(' + filenameId + ')';

// MOVE SECTION DOWN BELOW FOOTER
function moveSection() {
  sectionPush = theHeight - domC.footer[0].clientHeight;
  // ONLY IF WE HAVE <section> ON PAGE
  if (noSection > 0) {
    domC.section[0].style.top = sectionPush+5 + 'px';
  }
}

moveSection();

if (noPageNavContainer > 0) {
  fadePageNavLi();
}

// RUN ON ROTATE/RESIZE
window.addEventListener('resize', function(){
  // RESET THAT HEIGHT VAR
  theHeight = window.innerHeight;
  console.log(theHeight);

  moveSection();

  if (typeof pageNavContainer !== 'undefined') {
    fadePageNavLi();
  }
});

// HIDE AND SHOW DRAG ICON
domC.bodyInner[0].addEventListener('scroll', function() {
  scrollAmt = this.scrollTop;
  // NOT AT TOP, I.E. SCROLL DOWN
  if (scrollAmt > 0) {
    domC.headerDrawer[0].className = 'header-drawer';
    if (fadeEnable) {
      // ONLY IF WE HAVE iconDragUp ON PAGE
      if (domC.iconDragUp.length > 0) {
        domC.iconDragUp[0].className = 'icon-drag-up drag-fade';
      }
      for (i=0; i-domC.upDnToggle.length; i++) {
        domC.upDnToggle[i].style.transform = 'rotateZ(180deg)';
      }
      // REMOVE EXTRA PADDING WHEN SCROLL DOWN
      if (noPageNavContainer > 0) {
        domC.pageNavContainer[0].className = 'page-nav-container';
      }
      fadeEnable = false;
    }
  }
  // AT TOP
  else {
    // ONLY IF WE HAVE iconDragUp ON PAGE
    if (domC.iconDragUp.length > 0) {
      domC.iconDragUp[0].className = 'icon-drag-up';
    }
    fadeEnable = true;
  }
  // RUN THAT PROXIMITY CHECK
  if (noPageNavContainer > 0) {
    fadePageNavLi();
  }

});

// TOGGLE HEADER DRAWER
function headerDrawerToggle() {
  // OPEN
  if (drawerHeaderClosed) {
    drawerHeaderClosed = false;
    // MOVE PAGE NAV CONT DOWN IF EXISTS
    // (NOTE) WHY DOESN'T [ .typeof !== undefined ] NOT WORK HERE?
    if (noPageNavContainer > 0) {
      domC.pageNavContainer[0].className = 'page-nav-container page-nav-container-drawer-open';
    }
    // if (domC.headerDrawerLink.length > 0) {
    //   for (i=0; i<domC.headerDrawerLink.length; i++) {
    //     domC.headerDrawerLink[i].className = 'header-drawer-link header-drawer-link-toggle';
    //   }
    // }
    for (i=0; i<domC.upDnToggle.length; i++) {
      domC.upDnToggle[i].style.transform = 'rotateZ(0deg)';
    }
    if (domC.headerDrawer.length > 0) {
      domC.headerDrawer[0].className = 'header-drawer header-drawer-open';
    }
  // CLOSE
  } else {
    drawerHeaderClosed = true;
    // MOVE PAGE NAV CONT UP IF EXISTS
    if (noPageNavContainer > 0) {
      domC.pageNavContainer[0].className = 'page-nav-container';
    }
    // if (domC.headerDrawerLink.length > 0) {
    //   for (i=0; i<domC.headerDrawerLink.length; i++) {
    //     domC.headerDrawerLink[0].className = 'header-drawer-link';
    //   }
    // }
    for (i=0; i<domC.upDnToggle.length; i++) {
      domC.upDnToggle[i].style.transform = 'rotateZ(180deg)';
    }
    if (domC.headerDrawer.length > 0) {
      domC.headerDrawer[0].className = 'header-drawer';
    }
  }
}

function fadePageNavLi() {
  // ITERATE
  for (i=0; i<domC.pageNavContainer[0].getElementsByTagName('a').length; i++) {
    // COUNT SCROLL MOVEMENT, & USE W/ LI DISTANCE FROM TOP
    if (domC.pageNavContainer[0].getElementsByTagName('a')[i].offsetTop > theHeight + domC.bodyInner[0].scrollTop - 160) {
      domC.pageNavContainer[0].getElementsByTagName('a')[i].className = 'page-nav-fade';
    }
    else if (domC.pageNavContainer[0].getElementsByTagName('a')[i].offsetTop < domC.bodyInner[0].scrollTop + 20) {
      domC.pageNavContainer[0].getElementsByTagName('a')[i].className = 'page-nav-fade';
    }
    else {
      domC.pageNavContainer[0].getElementsByTagName('a')[i].className = '';
    }
  }
}
