/* global $, _  */

(() => {
  function splitCamelCaseToString (s) {
    return s.split(/(?=[A-Z])/).join(' ').replace(/^./, (l) => { return l.toUpperCase() })
  }

  function renderNav (name) {
    return `
      <nav>
        <ul class="vertical medium-horizontal menu">
          <li>
            <h3 class="logo"><a href="/">${name}</a></h3>
          </li>
          <li class="active" id="contact-link">
            <a class="in-site" href="#contact">Contact</a>
          </li>
          <li id="experience-link">
            <a class="in-site" href="#experience">Experience</a>
          </li>
          <li id="skills-link">
            <a class="in-site" href="#skills">Skills</a>
          </li>
          <li id="education-link">
            <a class="in-site" href="#education">Education</a>
          </li>
          <li id="projects-link">
            <a class="in-site" href="#projects">Projects</a>
          </li>
          <li>
            <a href="https://github.com/hepuxuan/">Github</a>
          </li>
        </ul>
      </nav>
    `
  }

  function renderContact (contact) {
    return `
      <section class="main-box" id="contact">
        <h4 class="title">Contact:</h4>
        <div class="row">
          <div class="small-12 medium-2 large-1 columns item-label">Tel:</div>
          <div class="small-12 medium-10 large-10 columns"><a href="tel:${contact.tel.replace(/\D/g, '')}">${contact.tel}</a></div>
        </div>
        <div class="row">
          <div class="small-12 medium-2 large-1 columns item-label">Address:</div>
          <div class="small-12 medium-10 large-10 columns"><a href="https://www.google.com/maps/place/${window.encodeURI(contact.address)}">${contact.address}</a></div>
        </div>
        <div class="row">
          <div class="small-12 medium-2 large-2 columns item-label">Email:</div>
          <div class="small-12 medium-10 large-10 columns"><a href="mailto:${contact.email}">${contact.email}</a></div>
        </div>
      </section>
    `
  }

  function renderExperience (experience) {
    const name = experience.name
    const range = experience.range
    delete experience.name
    delete experience.range
    const rest = experience
    return `
      <section>
        <section class="row align-justify">
          <div class="small-12 medium-12 large-8 columns">
            <h5>${name}</h5>
          </div>
          <div class="small-12 medium-12 large-4 columns"> 
            ${range}
          </div>
        </section>
        
        ${_.map(rest, (value, key) => {
          return `
            <section class="row">
              <div class="small-12 medium-12 large-2 columns item-label">${splitCamelCaseToString(key)}:</div>
              <div class="small-12 medium-12 large-10 columns">${value}</div>
            </section>
          `
        }).join('')}
      </section>
    `
  }

  function renderExperiences (experiences) {
    return `
      <section class="main-box" id="experience">
        <h4 class="title">Experience:</h4>
        ${_.map(experiences, renderExperience).join('')}
      </section>
    `
  }

  function renderSkills (skills) {
    return `
      <section class="main-box" id="skills">
        <h4>Skills:</h4>
        ${_.map(skills, (value, key) => {
          return `
            <section class="row">
              <div class="small-12 medium-12 large-2 columns item-label">${splitCamelCaseToString(key)}:</div>
              <div class="small-12 medium-12 large-10 columns">${value}</div>
            </section>
          `
        }).join('')}
      </section>
    `
  }

  function renderEducation (educations) {
    return `
      <section class="main-box" id="education">
        <h4>Education:</h4>
        ${_.map(educations, (education) => {
          return `
            <section class="row align-justify">
              <div class="small-12 medium-12 large-8 columns">${education.degree},&nbsp;&nbsp;${education.school}</div>
              <div class="small-12 medium-12 large-4 columns">${education.range}</div>
            </section>
          `
        }).join('')}
      </section>
    `
  }

  function renderProjects (projects) {
    return `
      <section class="main-box" id="projects">
        <h4>Project:</h4>
        ${_.map(projects, (project) => {
          return `
            <section class="row align-justify">
              <h5>${project.name}:</h5>
              <section>${project.details}</section>
            </section>
          `
        }).join('')}
      </section>
    `
  }

  function render (detail) {
    const template = `
      <div class="page-body">
        <header>
          ${renderNav(detail.name)}
        </header>
        <main>
          ${renderContact(detail.contact)}
          <hr/>
          ${renderExperiences(detail.experiences)}
          <hr/>
          ${renderSkills(detail.skills)}
          <hr/>
          ${renderEducation(detail.educations)}
          <hr/>
          ${renderProjects(detail.projects)}
        </main>
      </div>
    `
    document.getElementById('root').innerHTML = template
    $('nav a.in-site').on('click', (e) => {
      e.preventDefault()
      const sectionSelector = $(e.target).attr('href')
      $('html,body').animate({
        scrollTop: $(sectionSelector).offset().top - 60
      })
    })

    $(document).on('scroll', () => {
      $(document).scrollTop()
      $('.main-box').each((i, box) => {
        const $box = $(box)
        const currentScroll = $(document).scrollTop()
        if (currentScroll > $box.offset().top && currentScroll < ($box.height() + $box.offset().top)) {
          $(`#${$box.attr('id')}-link`).addClass('active')
        } else {
          $(`#${$box.attr('id')}-link`).removeClass('active')
        }
      })
    })
  }

  $.getJSON('profile.json').done(render)
})()
