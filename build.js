'use strict';

/* global $, _  */

(function () {
  function splitCamelCaseToString(s) {
    return s.split(/(?=[A-Z])/).join(' ').replace(/^./, function (l) {
      return l.toUpperCase();
    });
  }

  function renderNav(name) {
    return '\n      <nav>\n        <ul class="vertical medium-horizontal menu">\n          <li>\n            <h3 class="logo"><a href="/">' + name + '</a></h3>\n          </li>\n          <li class="active" id="contact-link">\n            <a class="in-site" href="#contact">Contact</a>\n          </li>\n          <li id="experience-link">\n            <a class="in-site" href="#experience">Experience</a>\n          </li>\n          <li id="skills-link">\n            <a class="in-site" href="#skills">Skills</a>\n          </li>\n          <li id="education-link">\n            <a class="in-site" href="#education">Education</a>\n          </li>\n          <li id="projects-link">\n            <a class="in-site" href="#projects">Projects</a>\n          </li>\n          <li>\n            <a href="https://github.com/hepuxuan/">Github</a>\n          </li>\n        </ul>\n      </nav>\n    ';
  }

  function renderContact(contact) {
    return '\n      <section class="main-box" id="contact">\n        <h4 class="title">Contact:</h4>\n        <div class="row">\n          <div class="small-12 medium-2 large-1 columns item-label">Tel:</div>\n          <div class="small-12 medium-10 large-10 columns"><a href="tel:' + contact.tel.replace(/\D/g, '') + '">' + contact.tel + '</a></div>\n        </div>\n        <div class="row">\n          <div class="small-12 medium-2 large-1 columns item-label">Address:</div>\n          <div class="small-12 medium-10 large-10 columns"><a href="https://www.google.com/maps/place/' + window.encodeURI(contact.address) + '">' + contact.address + '</a></div>\n        </div>\n        <div class="row">\n          <div class="small-12 medium-2 large-2 columns item-label">Email:</div>\n          <div class="small-12 medium-10 large-10 columns"><a href="mailto:' + contact.email + '">' + contact.email + '</a></div>\n        </div>\n      </section>\n    ';
  }

  function renderExperience(experience) {
    var name = experience.name;
    var range = experience.range;
    delete experience.name;
    delete experience.range;
    var rest = experience;
    return '\n      <section>\n        <section class="row align-justify">\n          <div class="small-12 medium-12 large-8 columns">\n            <h5>' + name + '</h5>\n          </div>\n          <div class="small-12 medium-12 large-4 columns"> \n            ' + range + '\n          </div>\n        </section>\n        \n        ' + _.map(rest, function (value, key) {
      return '\n            <section class="row">\n              <div class="small-12 medium-12 large-2 columns item-label">' + splitCamelCaseToString(key) + ':</div>\n              <div class="small-12 medium-12 large-10 columns">' + value + '</div>\n            </section>\n          ';
    }).join('') + '\n      </section>\n    ';
  }

  function renderExperiences(experiences) {
    return '\n      <section class="main-box" id="experience">\n        <h4 class="title">Experience:</h4>\n        ' + _.map(experiences, renderExperience).join('') + '\n      </section>\n    ';
  }

  function renderSkills(skills) {
    return '\n      <section class="main-box" id="skills">\n        <h4>Skills:</h4>\n        ' + _.map(skills, function (value, key) {
      return '\n            <section class="row">\n              <div class="small-12 medium-12 large-2 columns item-label">' + splitCamelCaseToString(key) + ':</div>\n              <div class="small-12 medium-12 large-10 columns">' + value + '</div>\n            </section>\n          ';
    }).join('') + '\n      </section>\n    ';
  }

  function renderEducation(educations) {
    return '\n      <section class="main-box" id="education">\n        <h4>Education:</h4>\n        ' + _.map(educations, function (education) {
      return '\n            <section class="row align-justify">\n              <div class="small-12 medium-12 large-8 columns">' + education.degree + ',&nbsp;&nbsp;' + education.school + '</div>\n              <div class="small-12 medium-12 large-4 columns">' + education.range + '</div>\n            </section>\n          ';
    }).join('') + '\n      </section>\n    ';
  }

  function renderProjects(projects) {
    return '\n      <section class="main-box" id="projects">\n        <h4>Project:</h4>\n        ' + _.map(projects, function (project) {
      return '\n            <section class="row align-justify">\n              <h5>' + project.name + ':</h5>\n              <section>' + project.details + '</section>\n            </section>\n          ';
    }).join('') + '\n      </section>\n    ';
  }

  function render(detail) {
    var template = '\n      <div class="page-body">\n        <header>\n          ' + renderNav(detail.name) + '\n        </header>\n        <main>\n          ' + renderContact(detail.contact) + '\n          <hr/>\n          ' + renderExperiences(detail.experiences) + '\n          <hr/>\n          ' + renderSkills(detail.skills) + '\n          <hr/>\n          ' + renderEducation(detail.educations) + '\n          <hr/>\n          ' + renderProjects(detail.projects) + '\n        </main>\n      </div>\n    ';
    document.getElementById('root').innerHTML = template;
    $('nav a.in-site').on('click', function (e) {
      e.preventDefault();
      var sectionSelector = $(e.target).attr('href');
      $('html,body').animate({
        scrollTop: $(sectionSelector).offset().top - 60
      });
    });

    $(document).on('scroll', function () {
      $(document).scrollTop();
      $('.main-box').each(function (i, box) {
        var $box = $(box);
        var currentScroll = $(document).scrollTop();
        if (currentScroll > $box.offset().top && currentScroll < $box.height() + $box.offset().top) {
          $('#' + $box.attr('id') + '-link').addClass('active');
        } else {
          $('#' + $box.attr('id') + '-link').removeClass('active');
        }
      });
    });
  }

  $.getJSON('profile.json').done(render);
})();