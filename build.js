'use strict';function _objectWithoutProperties(obj,keys){var target={};for(var i in obj)!(0<=keys.indexOf(i))&&Object.prototype.hasOwnProperty.call(obj,i)&&(target[i]=obj[i]);return target}/* global $, _  */var home=function(){function a(n){return n.split(/(?=[A-Z])/).join(' ').replace(/^./,function(o){return o.toUpperCase()})}function b(){var _m$detail$experiences=m.detail.experiences[0],n=_m$detail$experiences.role,o=_m$detail$experiences.name;document.getElementById('cover').innerHTML='\n      <div class=\'bg-content\'>\n        <h2>Hi, This is Puxuan He</h2>\n        <p>I\'m a '+n+' at '+o+'</p>\n      </div>\n    '}function c(){document.getElementById('nav').innerHTML='\n      <nav '+('cover'===m.activeSection?'class="scroll0"':'')+'>\n        <ul class="vertical medium-horizontal menu">\n          <li>\n            <h3 class="logo"><a href="/">'+m.detail.name+'</a></h3>\n          </li>\n          <li '+('contacts'===m.activeSection?'class="active"':'')+'>\n            <a onclick="home.onNavClick(event)" href="#contacts">Contact</a>\n          </li>\n          <li '+('experiences'===m.activeSection?'class="active"':'')+'>\n            <a onclick="home.onNavClick(event)" href="#experiences">Experience</a>\n          </li>\n          <li '+('skills'===m.activeSection?'class="active"':'')+'>\n            <a onclick="home.onNavClick(event)" href="#skills">Skills</a>\n          </li>\n          <li '+('educations'===m.activeSection?'class="active"':'')+'>\n            <a onclick="home.onNavClick(event)" href="#educations">Education</a>\n          </li>\n          <li '+('projects'===m.activeSection?'class="active"':'')+'>\n            <a onclick="home.onNavClick(event)" href="#projects">Projects</a>\n          </li>\n          <li>\n            <a href="https://github.com/hepuxuan/">Github</a>\n          </li>\n        </ul>\n      </nav>\n    '}function d(){var n=m.detail.contact;document.getElementById('contacts').innerHTML='\n      <h4 class="title">Contact:</h4>\n      <div class="row">\n        <div class="small-12 medium-2 large-1 columns item-label">Tel:</div>\n        <div class="small-12 medium-10 large-10 columns"><a href="tel:'+n.tel.replace(/\D/g,'')+'">'+n.tel+'</a></div>\n      </div>\n      <div class="row">\n        <div class="small-12 medium-2 large-1 columns item-label">Address:</div>\n        <div class="small-12 medium-10 large-10 columns"><a href="https://www.google.com/maps/place/'+window.encodeURI(n.address)+'">'+n.address+'</a></div>\n      </div>\n      <div class="row">\n        <div class="small-12 medium-2 large-2 columns item-label">Email:</div>\n        <div class="small-12 medium-10 large-10 columns"><a href="mailto:'+n.email+'">'+n.email+'</a></div>\n      </div>\n    '}function f(){var n=m.detail.experiences;document.getElementById('experiences').innerHTML='\n      <h4 class="title">Experience:</h4>\n        '+_.map(n,function(_ref){var o=_ref.name,p=_ref.range,q=_objectWithoutProperties(_ref,['name','range']);return'\n        <section>\n          <section class="row align-justify">\n            <div class="small-12 medium-12 large-8 columns">\n              <h5>'+o+'</h5>\n            </div>\n            <div class="small-12 medium-12 large-4 columns">\n              '+p+'\n            </div>\n          </section>\n\n          '+_.map(q,function(r,t){return'\n              <section class="row">\n                <div class="small-12 medium-12 large-2 columns item-label">'+a(t)+':</div>\n                <div class="small-12 medium-12 large-10 columns">'+r+'</div>\n              </section>\n            '}).join('')+'\n        </section>\n      '}).join('')+'\n    '}function g(){var n=m.detail.skills;document.getElementById('skills').innerHTML='\n      <h4>Skills:</h4>\n      '+_.map(n,function(o,p){return'\n          <section class="row">\n            <div class="small-12 medium-12 large-2 columns item-label">'+a(p)+':</div>\n            <div class="small-12 medium-12 large-10 columns">'+o+'</div>\n          </section>\n        '}).join('')+'\n    '}function h(){var n=m.detail.educations;document.getElementById('educations').innerHTML='\n      <h4>Education:</h4>\n      '+_.map(n,function(o){return'\n          <section class="row align-justify">\n            <div class="small-12 medium-12 large-8 columns">'+o.degree+',&nbsp;&nbsp;'+o.school+'</div>\n            <div class="small-12 medium-12 large-4 columns">'+o.range+'</div>\n          </section>\n        '}).join('')+'\n    '}function j(){var n=m.detail.projects;document.getElementById('projects').innerHTML='\n      <h4>Project:</h4>\n      '+_.map(n,function(o){return'\n          <section class="row align-justify">\n            <h5>'+o.name+':</h5>\n            <section>'+o.details+'</section>\n          </section>\n        '}).join('')+'\n    '}function k(){var n='\n      <div id="cover" class=\'main-box bg-image\'></div>\n      <div class="page-body">\n        <header id="nav"></header>\n        <main>\n          <section class="main-box" id="contacts"></section>\n          <hr/>\n          <section class="main-box" id="experiences"></section>\n          <hr/>\n          <section class="main-box" id="skills"></section>\n          <hr/>\n          <section class="main-box" id="educations"></section>\n          <hr/>\n          <section class="main-box" id="projects"></section>\n        </main>\n      </div>\n    ';document.getElementById('root').outerHTML=n}var m={activeSection:'cover'};return{render:function render(){k(),b(),c(),d(),f(),g(),h(),j()},init:function init(){return $(document).on('scroll',function(){var o=$(document).scrollTop(),p=$('.main-box').filter(function(q,r){var t=$(r);return o>=t.offset().top&&o<t.height()+t.offset().top});m.activeSection!==p.attr('id')&&(m.activeSection=p.attr('id'),c())}),$.getJSON('profile.json').then(function(o){m.detail=o})},onNavClick:function onNavClick(o){o.preventDefault();var p=$(o.target).attr('href');$('html,body').animate({scrollTop:$(p).offset().top-60})}}}();home.init().done(home.render);