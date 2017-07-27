angular.module('myApp.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("directives/header.html",
    "<header class=\"header dark-bg\"><div class=toggle-nav><div class=\"icon-reorder tooltips\" data-original-title=\"Toggle Navigation\" data-placement=bottom><i class=icon_menu></i></div></div><a ui-sref=admin-dashboard class=logo>Nice <span class=lite>Admin</span></a><div class=\"nav search-row\" id=top_menu><ul class=\"nav top-menu\"><li><form class=navbar-form><input class=form-control placeholder=Search></form></li></ul></div><div class=\"top-nav notification-row\"><ul class=\"nav pull-right top-menu\"><li id=alert_notificatoin_bar class=dropdown><a data-toggle=dropdown class=dropdown-toggle><i class=icon-bell-l></i> <span class=\"badge bg-important\">7</span></a><ul class=\"dropdown-menu extended notification\"><div class=\"notify-arrow notify-arrow-blue\"></div><li><p class=blue>You have 1 new notifications</p></li><li><a href=javascript:void(0)><span class=\"label label-danger\"><i class=icon_book_alt></i></span> Project 3 Completed. <span class=\"small italic pull-right\">1 hr</span></a></li><li><a href=javascript:void(0)>See all notifications</a></li></ul></li><li class=dropdown><a data-toggle=dropdown class=dropdown-toggle><span class=profile-ava><img alt=\"\" src=img/avatar1_small.jpg></span> <span class=username>Jenifer Smith</span> <b class=caret></b></a><ul class=\"dropdown-menu extended logout\"><div class=log-arrow-up></div><li class=eborder-top><a ui-sref=admin-profile><i class=icon_profile></i> My Profile</a></li><li class=eborder-top><a ui-sref=admin-email-config-edit><i class=icon_genius></i> Email Config Setting</a></li><li><a ng-click=logout()><i class=icon_key_alt></i> Log Out</a></li></ul></li></ul></div></header>");
  $templateCache.put("directives/left-menu.html",
    "<aside><div id=sidebar class=nav-collapse><ul class=sidebar-menu><li class=active><a ui-sref=admin-dashboard><i class=icon_house_alt></i> <span>Dashboard</span></a></li><li class=active><a ui-sref=admin-list><i class=icon_document_alt></i> <span>Manage Admin</span></a></li><li class=active><a ui-sref=admin-page-list><i class=icon_document_alt></i> <span>Manage Pages</span></a></li></ul></div></aside>");
  $templateCache.put("libb/angular-scroll/example/container.html",
    "<!DOCTYPE html><html ng-app=myApp><head><meta charset=\"UTF-8\"><!--[if lt IE 9]><script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script><![endif]--><title>Angular.js Container Scroll Example</title><meta name=viewport content=\"width=device-width,initial-scale=1\"><style>html, body {\n" +
    "      margin: 0;\n" +
    "      padding: 0;\n" +
    "      background: #ebebeb;\n" +
    "    }\n" +
    "    body, button {\n" +
    "      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    h1 {\n" +
    "      padding-top: 50px;\n" +
    "    }\n" +
    "    img {\n" +
    "      max-width: 100%;\n" +
    "    }\n" +
    "    nav {\n" +
    "      position: fixed;\n" +
    "      z-index: 1;\n" +
    "      top: 0;\n" +
    "      left: 0;\n" +
    "      right: 0;\n" +
    "      background: #fff;\n" +
    "      background: rgba(255, 255, 255, 0.8);\n" +
    "    }\n" +
    "    nav li, nav ul {\n" +
    "      list-style: none;\n" +
    "      margin: 0;\n" +
    "      padding: 0;\n" +
    "      text-align: center\n" +
    "    }\n" +
    "    nav li, nav a {\n" +
    "      display: inline-block;\n" +
    "    }\n" +
    "    nav a {\n" +
    "      padding: 20px;\n" +
    "      color: #333;\n" +
    "      text-decoration: none;\n" +
    "    }\n" +
    "    a:hover {\n" +
    "      background: #fff;\n" +
    "    }\n" +
    "    a.active {\n" +
    "      background: #00AC7F;\n" +
    "      color: #fff;\n" +
    "    }\n" +
    "    .wrap {\n" +
    "      position: relative;\n" +
    "      max-width: 1000px;\n" +
    "      margin: 0 auto;\n" +
    "      padding: 50px 20px;\n" +
    "    }\n" +
    "    section {\n" +
    "      padding: 20px 0 20px 0;\n" +
    "      margin-bottom: 30px;\n" +
    "    }\n" +
    "    footer {\n" +
    "      text-align: center;\n" +
    "    }\n" +
    "    button {\n" +
    "      font-size: 18px;\n" +
    "      border: 0;\n" +
    "      padding: 15px 30px;\n" +
    "      background: #00AC7F;\n" +
    "      color: #fff;\n" +
    "      cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    #container {\n" +
    "      overflow: auto;\n" +
    "      height: 400px;\n" +
    "      padding: 0;\n" +
    "      margin: 10px 0 20px 0;\n" +
    "    }</style></head><body><div class=wrap ng-controller=MyCtrl><nav du-scroll-container=container><ul><li><a href=#section-1 du-smooth-scroll du-scrollspy>Section 1</a></li><li><a href=#section-2 du-smooth-scroll du-scrollspy>Section 2</a></li><li><a href=#section-3 du-smooth-scroll du-scrollspy>Section 3</a></li><li><a href=\"http://github.com/oblador/angular-scroll/\">Project on Github</a></li></ul></nav><h1>Angular.js Container Scroll Example</h1><div id=container du-scroll-container><section id=section-1><h2>Section 1</h2><p><a href=#section-4 du-smooth-scroll>To section 4</a> Bacon ipsum dolor sit amet sausage tail capicola ground round hamburger ham hock. Short ribs pig andouille meatball, pastrami tri-tip fatback ham hock shank kielbasa swine. Rump pancetta jerky kielbasa doner beef ribs tongue hamburger strip steak drumstick andouille shoulder shank flank. Swine drumstick meatball pig beef sausage strip steak.</p><img src=\"http://lorempixel.com/1000/500/\" alt=\"\"></section><section id=section-2><h2>Section 2</h2><p>Bacon strip steak ground round, tongue pastrami short ribs pork chop venison turducken sausage sirloin. Flank chicken pork chop capicola turkey turducken cow pork loin biltong meatball drumstick pancetta filet mignon ground round fatback. Ham hock jerky short ribs brisket. Meatloaf shoulder pork chop capicola, sirloin swine pig pork. Jerky ribeye hamburger pork loin sirloin kevin bresaola boudin chuck flank. Ham hock pork belly chicken jerky rump bresaola.</p></section><section id=section-3><h2>Section 3</h2><p>Shank fatback pastrami short loin, turkey jowl kielbasa ribeye chicken jerky drumstick flank ham. Swine shankle pork belly kielbasa shoulder flank jowl, sirloin doner. Kevin tri-tip bresaola leberkas. Swine ball tip cow strip steak. Ham filet mignon pork chop, pork fatback andouille pork loin shoulder jowl swine strip steak turducken prosciutto rump.</p><img src=\"http://lorempixel.com/1000/400/\" alt=\"\"><p>Tongue tri-tip pastrami, shoulder rump pork belly ground round. Ham hock chuck leberkas doner, strip steak corned beef tri-tip capicola. Rump turkey ham sausage shankle. Flank shankle pork chop ham hock. Shankle venison kielbasa, pancetta swine beef ball tip t-bone bacon hamburger ground round ribeye flank. Turducken bacon bresaola, chicken kevin boudin ball tip strip steak filet mignon pork turkey shank ground round. Kielbasa fatback prosciutto pork chop, jerky ground round leberkas boudin ball tip beef shankle shoulder swine brisket.</p></section><section id=section-4><h2>Section 4</h2><img src=\"http://lorempixel.com/1000/600/\" alt=\"\"><p><a href=#section-1 du-smooth-scroll>To section 1</a> Shoulder cow tenderloin chuck, pork chop jerky doner leberkas. Chuck sausage hamburger, kevin beef pork chop pork shoulder ground round ball tip turducken flank. Bresaola tri-tip meatloaf, salami venison tail pig shank shankle jowl sausage brisket cow biltong turducken. Swine turducken hamburger ball tip short loin prosciutto kevin jowl tri-tip. Doner meatloaf pork brisket.</p></section></div><footer><button ng-click=toTheTop()>To the top!</button> or <button ng-click=toSection2()>To section 2</button></footer></div><script src=http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js></script><script src=../angular-scroll.js></script><script>angular.module('myApp', ['duScroll']).\n" +
    "  controller('MyCtrl', function($scope){\n" +
    "    var container = angular.element(document.getElementById('container'));\n" +
    "    var section2 = angular.element(document.getElementById('section-2'));\n" +
    "\n" +
    "    $scope.toTheTop = function() {\n" +
    "      container.scrollTop(0, 5000);\n" +
    "    }\n" +
    "\n" +
    "    $scope.toSection2 = function() {\n" +
    "      container.scrollTo(section2, 0, 1000);\n" +
    "    }\n" +
    "  }\n" +
    ");</script></body></html>");
  $templateCache.put("libb/angular-scroll/example/index.html",
    "<!DOCTYPE html><html ng-app=myApp><head><meta charset=\"UTF-8\"><!--[if lt IE 9]><script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script><![endif]--><title>Angular Scrollspy Demo</title><meta name=viewport content=\"width=device-width,initial-scale=1\"><style>html, body {\n" +
    "      margin: 0;\n" +
    "      padding: 0;\n" +
    "      background: #ebebeb;\n" +
    "    }\n" +
    "    body, button {\n" +
    "      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    h1 {\n" +
    "      padding-top: 50px;\n" +
    "    }\n" +
    "    img {\n" +
    "      max-width: 100%;\n" +
    "    }\n" +
    "    nav {\n" +
    "      position: fixed;\n" +
    "      z-index: 1;\n" +
    "      top: 0;\n" +
    "      left: 0;\n" +
    "      right: 0;\n" +
    "      background: #fff;\n" +
    "      background: rgba(255, 255, 255, 0.8);\n" +
    "    }\n" +
    "    nav li, nav ul {\n" +
    "      list-style: none;\n" +
    "      margin: 0;\n" +
    "      padding: 0;\n" +
    "      text-align: center\n" +
    "    }\n" +
    "    nav li, nav a {\n" +
    "      display: inline-block;\n" +
    "    }\n" +
    "    nav a {\n" +
    "      padding: 20px;\n" +
    "      color: #333;\n" +
    "      text-decoration: none;\n" +
    "    }\n" +
    "    a:hover {\n" +
    "      background: #fff;\n" +
    "    }\n" +
    "    a.active {\n" +
    "      background: #00AC7F;\n" +
    "      color: #fff;\n" +
    "    }\n" +
    "    .wrap {\n" +
    "      position: relative;\n" +
    "      max-width: 1000px;\n" +
    "      margin: 0 auto;\n" +
    "      padding: 50px 20px;\n" +
    "    }\n" +
    "    section {\n" +
    "      padding: 50px 0 30px 0;\n" +
    "    }\n" +
    "    footer {\n" +
    "      text-align: center;\n" +
    "    }\n" +
    "    button {\n" +
    "      font-size: 18px;\n" +
    "      border: 0;\n" +
    "      padding: 15px 30px;\n" +
    "      background: #00AC7F;\n" +
    "      color: #fff;\n" +
    "      cursor: pointer;\n" +
    "    }</style></head><body><div class=wrap ng-controller=MyCtrl><nav><ul><li><a href=#section-1 du-smooth-scroll du-scrollspy>Section 1</a></li><li><a href=#section-2 du-smooth-scroll du-scrollspy>Section 2</a></li><li><a du-smooth-scroll=section-3 du-scrollspy>Section 3</a></li><li><a href=\"http://github.com/oblador/angular-scroll/\">Project on Github</a></li></ul></nav><h1>Angular.js Scrollspy Example</h1><section id=section-1><h2>Section 1</h2><p>Bacon ipsum dolor sit amet sausage tail capicola ground round hamburger ham hock. Short ribs pig andouille meatball, pastrami tri-tip fatback ham hock shank kielbasa swine. Rump pancetta jerky kielbasa doner beef ribs tongue hamburger strip steak drumstick andouille shoulder shank flank. Swine drumstick meatball pig beef sausage strip steak.</p><img src=\"http://lorempixel.com/1000/500/\" alt=\"\"></section><section name=section-2><h2>Section 2</h2><p>Bacon strip steak ground round, tongue pastrami short ribs pork chop venison turducken sausage sirloin. Flank chicken pork chop capicola turkey turducken cow pork loin biltong meatball drumstick pancetta filet mignon ground round fatback. Ham hock jerky short ribs brisket. Meatloaf shoulder pork chop capicola, sirloin swine pig pork. Jerky ribeye hamburger pork loin sirloin kevin bresaola boudin chuck flank. Ham hock pork belly chicken jerky rump bresaola.</p></section><section id=section-3><h2>Section 3</h2><p>Shank fatback pastrami short loin, turkey jowl kielbasa ribeye chicken jerky drumstick flank ham. Swine shankle pork belly kielbasa shoulder flank jowl, sirloin doner. Kevin tri-tip bresaola leberkas. Swine ball tip cow strip steak. Ham filet mignon pork chop, pork fatback andouille pork loin shoulder jowl swine strip steak turducken prosciutto rump.</p><img src=\"http://lorempixel.com/1000/400/\" alt=\"\"><p>Tongue tri-tip pastrami, shoulder rump pork belly ground round. Ham hock chuck leberkas doner, strip steak corned beef tri-tip capicola. Rump turkey ham sausage shankle. Flank shankle pork chop ham hock. Shankle venison kielbasa, pancetta swine beef ball tip t-bone bacon hamburger ground round ribeye flank. Turducken bacon bresaola, chicken kevin boudin ball tip strip steak filet mignon pork turkey shank ground round. Kielbasa fatback prosciutto pork chop, jerky ground round leberkas boudin ball tip beef shankle shoulder swine brisket.</p></section><section id=section-4><h2>Section 4</h2><img src=\"http://lorempixel.com/1000/600/\" alt=\"\"><p>Shoulder cow tenderloin chuck, pork chop jerky doner leberkas. Chuck sausage hamburger, kevin beef pork chop pork shoulder ground round ball tip turducken flank. Bresaola tri-tip meatloaf, salami venison tail pig shank shankle jowl sausage brisket cow biltong turducken. Swine turducken hamburger ball tip short loin prosciutto kevin jowl tri-tip. Doner meatloaf pork brisket.</p></section><footer><button ng-click=toTheTop()>Take me back!</button> or <button ng-click=toSection3()>To section 3</button></footer></div><script src=http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js></script><script src=../angular-scroll.js></script><script>angular.module('myApp', ['duScroll']).\n" +
    "  controller('MyCtrl', function($scope, $document){\n" +
    "    $scope.toTheTop = function() {\n" +
    "      $document.scrollTopAnimated(0, 5000).then(function() {\n" +
    "        console && console.log('You just scrolled to the top!');\n" +
    "      });\n" +
    "    }\n" +
    "    var section3 = angular.element(document.getElementById('section-3'));\n" +
    "    $scope.toSection3 = function() {\n" +
    "      $document.scrollToElementAnimated(section3);\n" +
    "    }\n" +
    "  }\n" +
    ").value('duScrollOffset', 30);</script></body></html>");
  $templateCache.put("libb/angular-scroll/example/toc.html",
    "<!DOCTYPE html><html ng-app=myApp><head><meta charset=\"UTF-8\"><!--[if lt IE 9]><script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script><![endif]--><title>Angular Scroll TOC Example</title><meta name=viewport content=\"width=device-width,initial-scale=1\"><style>html, body {\n" +
    "      margin: 0;\n" +
    "      padding: 0;\n" +
    "      background: #ebebeb;\n" +
    "    }\n" +
    "    body, button {\n" +
    "      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    h1 {\n" +
    "      padding-top: 50px;\n" +
    "    }\n" +
    "    img {\n" +
    "      max-width: 100%;\n" +
    "    }\n" +
    "    nav {\n" +
    "      position: fixed;\n" +
    "      z-index: 1;\n" +
    "      top: 0;\n" +
    "      left: 0;\n" +
    "      right: 0;\n" +
    "      background: #fff;\n" +
    "      background: rgba(255, 255, 255, 0.8);\n" +
    "    }\n" +
    "    nav li, nav ul {\n" +
    "      list-style: none;\n" +
    "      margin: 0;\n" +
    "      padding: 0;\n" +
    "      text-align: center\n" +
    "    }\n" +
    "    nav li, nav a {\n" +
    "      display: inline-block;\n" +
    "    }\n" +
    "    nav a {\n" +
    "      padding: 20px;\n" +
    "      color: #333;\n" +
    "      text-decoration: none;\n" +
    "    }\n" +
    "    a:hover {\n" +
    "      background: #fff;\n" +
    "    }\n" +
    "    a.active {\n" +
    "      background: #00AC7F;\n" +
    "      color: #fff;\n" +
    "    }\n" +
    "    .wrap {\n" +
    "      position: relative;\n" +
    "      max-width: 1000px;\n" +
    "      margin: 0 auto;\n" +
    "      padding: 50px 20px;\n" +
    "    }\n" +
    "    section {\n" +
    "      padding: 20px 0 20px 0;\n" +
    "      margin-bottom: 30px;\n" +
    "    }\n" +
    "    footer {\n" +
    "      text-align: center;\n" +
    "    }\n" +
    "    button {\n" +
    "      font-size: 18px;\n" +
    "      border: 0;\n" +
    "      padding: 15px 30px;\n" +
    "      background: #00AC7F;\n" +
    "      color: #fff;\n" +
    "      cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    #container {\n" +
    "      overflow: auto;\n" +
    "      height: 400px;\n" +
    "      padding: 0;\n" +
    "      margin: 10px 0 20px 0;\n" +
    "    }</style></head><body><div class=wrap ng-controller=MyCtrl><nav class=toc><ul><li><a href=#section-1 du-smooth-scroll du-scrollspy>Section 1</a><ul du-spy-context=section-1><li><a href=#section-1-1 du-smooth-scroll du-scrollspy>Sub Section 1</a></li><li><a href=#section-1-2 du-smooth-scroll du-scrollspy>Sub Section 2</a></li><li><a href=#section-1-3 du-smooth-scroll du-scrollspy>Sub Section 3</a></li><li><a href=#section-1-4 du-smooth-scroll du-scrollspy>Sub Section 4</a></li></ul></li><li><a href=#section-2 du-smooth-scroll du-scrollspy>Section 2</a></li><li><a href=#section-3 du-smooth-scroll du-scrollspy>Section 3</a></li><li><a href=\"http://github.com/oblador/angular-scroll/\">Project on Github</a></li></ul></nav><h1>Angular.js Container Scroll Example</h1><section id=section-1><h2>Section 1</h2><div id=section-1-1><h3>Sub Section 1</h3><p>Bacon ipsum dolor sit amet sausage tail capicola ground round hamburger ham hock. Short ribs pig andouille meatball, pastrami tri-tip fatback ham hock shank kielbasa swine. Rump pancetta jerky kielbasa doner beef ribs tongue hamburger strip steak drumstick andouille shoulder shank flank. Swine drumstick meatball pig beef sausage strip steak.</p></div><div id=section-1-2><h3>Sub Section 2</h3><p>Bacon ipsum dolor sit amet sausage tail capicola ground round hamburger ham hock. Short ribs pig andouille meatball, pastrami tri-tip fatback ham hock shank kielbasa swine. Rump pancetta jerky kielbasa doner beef ribs tongue hamburger strip steak drumstick andouille shoulder shank flank. Swine drumstick meatball pig beef sausage strip steak.</p></div><div id=section-1-3><h3>Sub Section 3</h3><p>Bacon ipsum dolor sit amet sausage tail capicola ground round hamburger ham hock. Short ribs pig andouille meatball, pastrami tri-tip fatback ham hock shank kielbasa swine. Rump pancetta jerky kielbasa doner beef ribs tongue hamburger strip steak drumstick andouille shoulder shank flank. Swine drumstick meatball pig beef sausage strip steak.</p></div><div id=section-1-4><h3>Sub Section 4</h3><p>Bacon ipsum dolor sit amet sausage tail capicola ground round hamburger ham hock. Short ribs pig andouille meatball, pastrami tri-tip fatback ham hock shank kielbasa swine. Rump pancetta jerky kielbasa doner beef ribs tongue hamburger strip steak drumstick andouille shoulder shank flank. Swine drumstick meatball pig beef sausage strip steak.</p></div></section><section id=section-2><h2>Section 2</h2><p>Bacon strip steak ground round, tongue pastrami short ribs pork chop venison turducken sausage sirloin. Flank chicken pork chop capicola turkey turducken cow pork loin biltong meatball drumstick pancetta filet mignon ground round fatback. Ham hock jerky short ribs brisket. Meatloaf shoulder pork chop capicola, sirloin swine pig pork. Jerky ribeye hamburger pork loin sirloin kevin bresaola boudin chuck flank. Ham hock pork belly chicken jerky rump bresaola.</p></section><section id=section-3><h2>Section 3</h2><p>Shank fatback pastrami short loin, turkey jowl kielbasa ribeye chicken jerky drumstick flank ham. Swine shankle pork belly kielbasa shoulder flank jowl, sirloin doner. Kevin tri-tip bresaola leberkas. Swine ball tip cow strip steak. Ham filet mignon pork chop, pork fatback andouille pork loin shoulder jowl swine strip steak turducken prosciutto rump.</p><p>Tongue tri-tip pastrami, shoulder rump pork belly ground round. Ham hock chuck leberkas doner, strip steak corned beef tri-tip capicola. Rump turkey ham sausage shankle. Flank shankle pork chop ham hock. Shankle venison kielbasa, pancetta swine beef ball tip t-bone bacon hamburger ground round ribeye flank. Turducken bacon bresaola, chicken kevin boudin ball tip strip steak filet mignon pork turkey shank ground round. Kielbasa fatback prosciutto pork chop, jerky ground round leberkas boudin ball tip beef shankle shoulder swine brisket.</p></section><section id=section-4><h2>Section 4</h2><p><a href=#section-1 du-smooth-scroll>To section 1</a> Shoulder cow tenderloin chuck, pork chop jerky doner leberkas. Chuck sausage hamburger, kevin beef pork chop pork shoulder ground round ball tip turducken flank. Bresaola tri-tip meatloaf, salami venison tail pig shank shankle jowl sausage brisket cow biltong turducken. Swine turducken hamburger ball tip short loin prosciutto kevin jowl tri-tip. Doner meatloaf pork brisket.</p></section></div><footer><button ng-click=toTheTop()>To the top!</button> or <button ng-click=toSection2()>To section 2</button></footer><script src=../bower_components/angular/angular.min.js></script><script src=../angular-scroll.js></script><script>angular.module('myApp', ['duScroll']).\n" +
    "  controller('MyCtrl', function($scope){\n" +
    "    var container = angular.element(document.getElementById('container'));\n" +
    "    var section2 = angular.element(document.getElementById('section-2'));\n" +
    "\n" +
    "    $scope.toTheTop = function() {\n" +
    "      container.scrollTop(0, 5000);\n" +
    "    }\n" +
    "\n" +
    "    $scope.toSection2 = function() {\n" +
    "      container.scrollTo(section2, 0, 1000);\n" +
    "    }\n" +
    "  }\n" +
    ");</script></body></html>");
  $templateCache.put("mailer/partials/forgot-password.html",
    "<h3>HI @model.name! You have requested for password reset.</h3><h4>Your token is - @model.token</h4>");
  $templateCache.put("views/admin/admin/add_bkp.html",
    "<section id=main-content><section class=wrapper><div class=row><div class=col-lg-12><h3 class=page-header><i class=\"fa fa-file-text-o\"></i>Add Admin</h3></div></div><div class=row><div class=col-lg-12><section class=panel><header class=panel-heading>Add Admin</header><div class=panel-body><form class=form-horizontal name=SignUpFrom ng-submit=doSignUp()><div class=form-group><label class=\"col-sm-2 control-label\">Name</label><div class=col-sm-10><input name=name class=form-control ng-model=fromData.name placeholder=name autofocus></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Email</label><div class=col-sm-10><input type=email name=email class=form-control ng-model=fromData.email placeholder=email autofocus></div><div ng-messages=SignUpFrom.email.$error><div ng-messages-include=views/admin/admin/messages-admin.html></div></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Password</label><div class=col-sm-10><input type=password name=password class=form-control ng-model=fromData.password ng-minlength=6 ng-maxlength=30 placeholder=password required></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Confirm Password</label><div class=col-sm-10><input type=password name=confirmPassword class=form-control ng-model=fromData.confirmPassword required pw-check=fromData.password></div><div ng-messages=SignUpFrom.confirmPassword.$error><div ng-messages-include=views/admin/admin/messages-admin.html></div></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Address</label><div class=col-sm-10><input class=form-control placeholder=address ng-model=fromData.address></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Phone Number</label><div class=col-sm-10><input class=form-control placeholder=\"Phone Number \" ng-model=fromData.phone_no></div></div><div class=form-group><div class=col-sm-10><button type=submit class=\"btn btn-primary\">Submit</button></div></div></form></div></section></div></div></section></section>");
  $templateCache.put("views/admin/admin/admin-email-config-inbox.html",
    "<section id=main-content ng-init=emailConfigDetail()><section class=wrapper><div class=row><div ncy-breadcrumb></div></div><div class=row><div class=col-lg-12><section class=panel><header class=panel-heading>Edit Email Config Setting</header><div class=panel-body><form class=form-horizontal name=SignUpFrom ng-submit=updateEmailConfigDetail()><div class=form-group><label class=\"col-sm-2 control-label\">SMTP Status</label><div class=\"switch has-switch\"><div ng-class=\"fromData.SMTP_status ? 'switch-on' : 'switch-off'\"><input type=checkbox ng-model=fromData.SMTP_status data-toggle=switch> <span class=switch-left ng-click=toggleSwitch(false)>ON</span><label>&nbsp;</label><span class=switch-right ng-click=toggleSwitch(true)>OFF</span></div></div></div><div ng-show=fromData.SMTP_status><div class=form-group><label class=\"col-sm-2 control-label\">Host</label><div class=col-sm-10><input name=host class=form-control ng-model=fromData.host placeholder=host autofocus></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Port</label><div class=col-sm-10><input name=Port class=form-control ng-model=fromData.port placeholder=port autofocus></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Username</label><div class=col-sm-10><input name=username class=form-control ng-model=fromData.username placeholder=username></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Password</label><div class=col-sm-10><input name=password class=form-control ng-model=fromData.password></div></div></div><div class=form-group><div class=col-sm-10><button type=submit ng-disabled=\"\" class=\"btn btn-primary\">Save</button></div></div></form></div></section></div></div></section></section>");
  $templateCache.put("views/admin/admin/sentbox.html",
    "<section class=wrapper ng-init=getAdminList()><section id=main-content><div class=row><div class=col-lg-12><h3 class=page-header><i class=\"fa fa-table\"></i> Admin Listing</h3><a title=\"Select All\" ng-click=allNeedsClicked() ng-checked=allNeedsMet() class=\"btn btn-default active\"><i ng-if=allNeedsMet() class=icon_minus_alt2></i> <i ng-if=!allNeedsMet() class=icon_check_alt2></i> <b ng-if=selected>Recored Selected ({{selected}})</b> <b ng-if=!selected>Select All</b></a> <a title=\"Delete All\" ng-click=deleteMulti() ng-if=selected class=\"btn btn-danger\"><b><i class=icon_close_alt2></i> Delete Selected ({{selected}})</b></a> <a title=\"Change Status\" ng-click=multiStatusChange(0) ng-if=selected class=\"btn btn-default\"><b><i class=icon_lightbulb_alt></i> InActive Status ({{selected}})</b></a> <a title=\"Change Status\" ng-click=multiStatusChange(1) ng-if=selected class=\"btn btn-info\"><b><i class=icon_lightbulb_alt></i> Active Status ({{selected}})</b></a> <a title=\"Add Admin\" ui-sref=admin-add class=\"btn btn-primary pull-right\"><b><i class=icon_plus_alt2></i> Add Admin</b></a><section class=panel><uib-pagination total-items=totalItems boundary-links=true ng-model=currentPage ng-change=getAdminList() class=pagination-sm items-per-page=itemsPerPage></uib-pagination><table class=\"table table-striped table-advance table-hover\"><tr><th><i class=icon_profile></i> Full Name</th><th><i class=icon_mail_alt></i> Email</th><th><i class=icon_pin_alt></i> Address</th><th><i class=icon_mobile></i> Mobile</th><th><i class=icon_cogs></i> Action</th></tr><tr ng-repeat=\"item in results\"><td><input type=checkbox ng-value=item._id ng-model=\"item.done\"> {{item.name}}</td><td>{{item.email}}</td><td>{{item.address}}</td><td>{{item.phone_no}}</td><td><div class=btn-group><a class=\"btn btn-primary\" ui-sref=\"admin-edit({ id:item._id })\"><i class=icon_plus_alt2></i></a> <a ng-if=item.status class=\"btn btn-success\" ng-click=statusChange(item.id,item.status)><i class=icon_lightbulb_alt></i></a> <a ng-if=!item.status class=\"btn btn-default\" ng-click=statusChange(item.id,item.status)><i class=icon_lightbulb_alt></i></a> <a class=\"btn btn-danger\" ng-click=delete(item.id)><i class=icon_close_alt2></i></a></div></td></tr></table><uib-pagination total-items=totalItems boundary-links=true ng-model=currentPage ng-change=getAdminList() class=pagination-sm items-per-page=itemsPerPage></uib-pagination></section></div></div></section></section>");
  $templateCache.put("views/admin/admin/admin-manage.html",
    "<section id=main-content><section class=wrapper><div class=row><div class=col-lg-12><a ui-sref=admin-add><h3 class=page-header><i class=\"fa fa-file-text-o\"></i> Add Admin</h3></a></div></div><div class=row ng-init=adminList()><div class=col-lg-12><section class=panel><table class=\"table table-striped table-advance table-hover\"><tbody><tr><th><i class=icon_profile></i> Full Name</th><th><i class=icon_mail_alt></i> Email</th><th><i class=icon_pin_alt></i> Address</th><th><i class=icon_mobile></i> Mobile</th><th><i class=icon_cogs></i> Action</th></tr><div ng-repeat=\"category in products\"><tr><td>Angeline Mcclain</td><td>dale@chief.info</td><td>Rosser</td><td>176-026-5992</td><td><div class=btn-group><a class=\"btn btn-primary\" href=#><i class=icon_plus_alt2></i></a> <a class=\"btn btn-danger\" href=#><i class=icon_close_alt2></i></a></div></td></tr><div></div></div></tbody></table></section></div></div></section></section>");
  $templateCache.put("views/admin/admin/admin-details.profile.html",
    "<section id=main-content ng-init=adminProfile()><section class=wrapper><div class=row><div class=col-lg-12><h3 class=page-header><i class=\"fa fa-user-md\"></i> Profile</h3><ol class=breadcrumb><li><i class=\"fa fa-home\"></i><a ui-sref=admin-dashboard>Dashboard</a></li><li><i class=\"fa fa-user-md\"></i>Profile</li></ol></div></div><div class=row><div class=col-lg-12><div class=\"profile-widget profile-widget-info\"><div class=panel-body><div class=\"col-lg-2 col-sm-2\"><h4>Jenifer Smith</h4><div class=follow-ava><img src=img/profile-widget-avatar.jpg alt=\"\"></div><h6>Administrator</h6></div><div class=\"col-lg-4 col-sm-4 follow-info\"><p>Hello I’m Jenifer Smith, a leading expert in interactive and creative design.</p><p>@jenifersmith</p><p><i class=\"fa fa-twitter\">jenifertweet</i></p><h6><span><i class=icon_clock_alt></i>11:05 AM</span> <span><i class=icon_calendar></i>25.10.13</span> <span><i class=icon_pin_alt></i>NY</span></h6></div></div></div></div></div><div class=row><div class=col-lg-12><section class=panel><header class=\"panel-heading tab-bg-info\"><ul class=\"nav nav-tabs\"><li class={{profileTab}}><a data-toggle=tab ng-click=profileTab()><i class=icon-user></i> Profile</a></li><li class={{editProfileTab}}><a data-toggle=tab ng-click=editProfileTab()><i class=icon-envelope></i> Edit Profile</a></li></ul></header><div class=panel-body><div class=tab-content><div id=profile class=\"tab-pane {{profileTab}}\"><section class=panel><div class=bio-graph-heading>Hello I’m Jenifer Smith, a leading expert in interactive and creative design specializing in the mobile medium. My graduation from Massey University with a Bachelor of Design majoring in visual communication.</div><div class=\"panel-body bio-graph-info\"><h1>Bio Graph</h1><div class=row><div class=bio-row><p><span>First Name</span>: Jenifer</p></div><div class=bio-row><p><span>Last Name</span>: Smith</p></div><div class=bio-row><p><span>Birthday</span>: 27 August 1987</p></div><div class=bio-row><p><span>Country</span>: United</p></div><div class=bio-row><p><span>Occupation</span>: UI Designer</p></div><div class=bio-row><p><span>Email</span>:jenifer@mailname.com</p></div><div class=bio-row><p><span>Mobile</span>: (+6283) 456 789</p></div><div class=bio-row><p><span>Phone</span>: (+021) 956 789123</p></div></div></div></section><section><div class=row></div></section></div><div id=edit-profile><section class=panel><div class=\"panel-body bio-graph-info\"><h1>Profile Info</h1><form class=form-horizontal role=form><div class=form-group><label class=\"col-lg-2 control-label\">First Name</label><div class=col-lg-6><input class=form-control id=f-name placeholder=\" \"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Last Name</label><div class=col-lg-6><input class=form-control id=l-name placeholder=\" \"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">About Me</label><div class=col-lg-10><textarea name=\"\" class=form-control cols=30 rows=5></textarea></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Country</label><div class=col-lg-6><input class=form-control id=c-name placeholder=\" \"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Birthday</label><div class=col-lg-6><input class=form-control id=b-day placeholder=\" \"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Occupation</label><div class=col-lg-6><input class=form-control id=occupation placeholder=\" \"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Email</label><div class=col-lg-6><input class=form-control id=email placeholder=\" \"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Mobile</label><div class=col-lg-6><input class=form-control id=mobile placeholder=\" \"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Website URL</label><div class=col-lg-6><input class=form-control id=url placeholder=\"http://www.demowebsite.com \"></div></div><div class=form-group><div class=\"col-lg-offset-2 col-lg-10\"><button type=submit class=\"btn btn-primary\">Save</button> <button type=button class=\"btn btn-danger\">Cancel</button></div></div></form></div></section></div></div></div></section></div></div></section></section>");
  $templateCache.put("views/admin/admin/dashboard.html",
    "<section id=main-content><section class=wrapper><h3 class=page-header><i class=\"fa fa-laptop\"></i> Dashboard</h3><div class=row><div class=col-lg-12><div ncy-breadcrumb></div></div></div></section></section>");
  $templateCache.put("views/admin/admin/inbox.html",
    "<section id=main-content ng-init=editAdmin()><section class=wrapper><div class=row><div class=col-lg-12><h3 class=page-header><i class=\"fa fa-file-text-o\"></i>Edit Admin</h3></div></div><div class=row><div class=col-lg-12><section class=panel><header class=panel-heading>Edit Admin</header><div class=panel-body><form class=form-horizontal name=SignUpFrom ng-submit=updateAdmin(fromData)><div class=form-group><label class=\"col-sm-2 control-label\">Profile Image</label><div class=col-sm-10><img ng-src=uploads/profile/{{fromData.image}} width=\"200\"></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Upload Screenshot:</label><div class=col-sm-10><input type=file ngf-select ng-model=fromData.file name=file ngf-pattern=\"'image/*'\" accept=\"image/*\"></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Name</label><div class=col-sm-10><input name=name class=form-control ng-model=fromData.name placeholder=name autofocus></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Address</label><div class=col-sm-10><input class=form-control placeholder=address ng-model=fromData.address></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Phone Number</label><div class=col-sm-10><input class=form-control placeholder=\"Phone Number \" ng-model=fromData.phone_no></div></div><div class=form-group><div class=col-sm-10><button type=submit ng-disabled=!SignUpFrom.$valid class=\"btn btn-primary\">Submit</button></div></div></form></div></section></div></div></section></section>");
  $templateCache.put("views/admin/admin/forgot-password.html",
    "<div class=container><form class=login-form name=loginFrom ng-submit=doForgotPassword()><div class=login-wrap><p>Forgot password</p><div class=input-group><span class=input-group-addon><i class=icon_profile></i></span> <input class=form-control ng-model=fromData.email placeholder=Username autofocus></div><label class=checkbox><span class=pull-right><a ui-sref=admin-login>Login</a></span></label><button class=\"btn btn-primary btn-lg btn-block\" type=submit>Send</button></div></form></div>");
  $templateCache.put("views/admin/admin/login.html",
    "<div class=container><form class=login-form name=loginFrom ng-submit=doLogin() novalidate><div class=login-wrap><p class=login-img><i class=icon_lock_alt></i></p><div class=input-group><span class=input-group-addon><i class=icon_profile></i></span> <input class=form-control ng-model=fromData.email placeholder=Username autofocus></div><div class=input-group><span class=input-group-addon><i class=icon_key_alt></i></span> <input type=password class=form-control ng-model=fromData.password placeholder=Password required></div><label class=checkbox><span class=pull-right><a ui-sref=admin-forgot-password>Forgot Password?</a></span></label><button class=\"btn btn-primary btn-lg btn-block\" type=submit>Login</button></div></form></div>");
  $templateCache.put("views/admin/admin/messages-admin.html",
    "<p ng-message=email style=color:darkred>Please provide valid email.</p><p ng-message=minlength style=color:darkred>This field is too short</p><p ng-message=maxlength style=color:darkred>This field is too long.</p><p ng-message=pwCheck style=color:darkred>Confirmation password is required, and must match.</p><p ng-message=clCheck style=color:darkred>Destination address should be differnt from current location.</p><p ng-message=number style=color:darkred>Please provide a valid Number.</p>");
  $templateCache.put("views/admin/page/add-page.html",
    "<section id=main-content><section class=wrapper><div class=row><div class=col-lg-12><h3 class=page-header><i class=\"fa fa-file-text-o\"></i>Add Page</h3></div></div><div class=row><div class=col-lg-12><section class=panel><header class=panel-heading>Add Admin</header><div class=panel-body><form class=form-horizontal novalidate name=SignUpFrom ng-submit=doAddPage()><div class=form-group><label class=\"col-sm-2 control-label\">Title</label><div class=col-sm-10><input class=form-control ng-model=fromData.title placeholder=Title required autofocus></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Page Body</label><div class=col-sm-6><textarea ng-model=fromData.description required name=description></textarea></div></div><div class=form-group><div class=col-sm-10><button type=submit class=\"btn btn-primary\">Submit</button></div></div></form></div></section></div></div></section></section>");
  $templateCache.put("views/admin/page/edit-page.html",
    "<section id=main-content ng-init=editAdmin()><section class=wrapper><div class=row><div class=col-lg-12><h3 class=page-header><i class=\"fa fa-file-text-o\"></i>Edit Admin</h3></div></div><div class=row><div class=col-lg-12><section class=panel><header class=panel-heading>Edit Admin</header><div class=panel-body><form class=form-horizontal name=SignUpFrom ng-submit=updateAdmin(fromData)><div class=form-group><label class=\"col-sm-2 control-label\">Profile Image</label><div class=col-sm-10><img ng-src=uploads/profile/thumb/{{fromData.image}} width=\"200\"></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Name</label><div class=col-sm-10><input name=name class=form-control ng-model=fromData.name placeholder=name autofocus></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Address</label><div class=col-sm-10><input class=form-control placeholder=address ng-model=fromData.address></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Phone Number</label><div class=col-sm-10><input class=form-control placeholder=\"Phone Number \" ng-model=fromData.phone_no></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Page Body</label><div class=col-sm-6><textarea ng-model=fromData.description required name=description></textarea></div></div><div class=form-group><div class=col-sm-10><button type=submit ng-disabled=!SignUpFrom.$valid class=\"btn btn-primary\">Submit</button></div></div></form></div></section></div></div></section></section>");
  $templateCache.put("views/admin/page/page-sentbox.html",
    "<section class=wrapper ng-init=getAdminList()><section id=main-content><div class=row><div class=col-lg-12><h3 class=page-header><i class=\"fa fa-table\"></i> Pages Listing</h3><a title=\"Select All\" ng-click=allNeedsClicked() ng-checked=allNeedsMet() class=\"btn btn-default active\"><i ng-if=allNeedsMet() class=icon_minus_alt2></i> <i ng-if=!allNeedsMet() class=icon_check_alt2></i> <b ng-if=selected>Recored Selected ({{selected}})</b> <b ng-if=!selected>Select All</b></a> <a title=\"Delete All\" ng-click=deleteMultiPage() ng-if=selected class=\"btn btn-danger\"><b><i class=icon_close_alt2></i> Delete Selected ({{selected}})</b></a> <a title=\"Change Status\" ng-click=multiStatusChangePage(0) ng-if=selected class=\"btn btn-default\"><b><i class=icon_lightbulb_alt></i> InActive Status ({{selected}})</b></a> <a title=\"Change Status\" ng-click=multiStatusChangePage(1) ng-if=selected class=\"btn btn-info\"><b><i class=icon_lightbulb_alt></i> Active Status ({{selected}})</b></a> <a title=\"Add Admin\" ui-sref=admin-page-add class=\"btn btn-primary pull-right\"><b><i class=icon_plus_alt2></i> Add Admin</b></a><section class=panel><uib-pagination total-items=totalItems boundary-links=true ng-model=currentPage ng-change=getPageList() class=pagination-sm items-per-page=itemsPerPage></uib-pagination><table class=\"table table-striped table-advance table-hover\"><tr><th><i class=icon_profile></i> Full Name</th><th><i class=icon_mail_alt></i> Email</th><th><i class=icon_pin_alt></i> Address</th><th><i class=icon_mobile></i> Mobile</th><th><i class=icon_cogs></i> Action</th></tr><tr ng-repeat=\"item in results\"><td><input type=checkbox ng-value=item._id ng-model=\"item.done\"> {{item.name}}</td><td>{{item.email}}</td><td>{{item.address}}</td><td>{{item.phone_no}}</td><td><div class=btn-group><a class=\"btn btn-primary\" href=#/admin/{{item.id}}/page-edit><i class=icon_plus_alt2></i></a> <a ng-if=item.status class=\"btn btn-success\" ng-click=statusChange(item.id,item.status)><i class=icon_lightbulb_alt></i></a> <a ng-if=!item.status class=\"btn btn-default\" ng-click=statusChange(item.id,item.status)><i class=icon_lightbulb_alt></i></a> <a class=\"btn btn-danger\" ng-click=delete(item.id)><i class=icon_close_alt2></i></a></div></td></tr></table><uib-pagination total-items=totalItems boundary-links=true ng-model=currentPage ng-change=getAdminList() class=pagination-sm items-per-page=itemsPerPage></uib-pagination></section></div></div></section></section>");
}]);
