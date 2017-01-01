/* global $, _  */

const home = (() => {
  let state = {
    activeSection: 'cover'
  }

  function splitCamelCaseToString (s) {
    return s.split(/(?=[A-Z])/).join(' ').replace(/^./, l => l.toUpperCase())
  }

  function onNavClick (e) {
    e.preventDefault()
    const sectionSelector = $(e.target).attr('href')
    $('html,body').animate({
      scrollTop: $(sectionSelector).offset().top - 60
    })
  }

  function renderCover () {
    const {role, name} = state.detail.experiences[0]
    document.getElementById('cover').innerHTML = `
      <div class='bg-content'>
        <h2>Hi, This is Puxuan He</h2>
        <p>I'm a ${role} at ${name}</p>
      </div>
    `
  }

  function renderNav () {
    document.getElementById('nav').innerHTML = `
      <nav ${state.activeSection === 'cover' ? 'class="scroll0"' : ''}>
        <div class="row">
          <div class="small-12 medium-6 large-6 columns">
            <ul class="vertical medium-horizontal menu">
              <li>
                <h3 class="logo"><a href="/">Puxuan's Home</a></h3>
              </li>
            </ul>
          </div>
          <div class="small-12 medium-6 large-6 columns">
            <ui class="vertical medium-horizontal menu large-right">
              <li ${state.activeSection === 'contacts' ? 'class="active"' : ''}>
                <a onclick="home.onNavClick(event)" href="#contacts">Contact</a>
              </li>
              <li ${state.activeSection === 'experiences' ? 'class="active"' : ''}>
                <a onclick="home.onNavClick(event)" href="#experiences">Experience</a>
              </li>
              <li ${state.activeSection === 'skills' ? 'class="active"' : ''}>
                <a onclick="home.onNavClick(event)" href="#skills">Skills</a>
              </li>
              <li ${state.activeSection === 'educations' ? 'class="active"' : ''}>
                <a onclick="home.onNavClick(event)" href="#educations">Education</a>
              </li>
              <li ${state.activeSection === 'projects' ? 'class="active"' : ''}>
                <a onclick="home.onNavClick(event)" href="#projects">Projects</a>
              </li>
              <li>
                <a href="https://github.com/hepuxuan/">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `
  }

  function renderContact () {
    const contact = state.detail.contact
    document.getElementById('contacts').innerHTML = `
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
    `
  }

  function renderExperiences () {
    const experiences = state.detail.experiences
    document.getElementById('experiences').innerHTML = `
      <h4 class="title">Experience:</h4>
        ${_.map(experiences, ({name, range, ...rest}) => `
        <section>
          <section class="row align-justify">
            <div class="small-12 medium-12 large-8 columns">
              <h5>${name}</h5>
            </div>
            <div class="small-12 medium-12 large-4 columns">
              ${range}
            </div>
          </section>

          ${_.map(rest, (value, key) => `
              <section class="row">
                <div class="small-12 medium-12 large-2 columns item-label">${splitCamelCaseToString(key)}:</div>
                <div class="small-12 medium-12 large-10 columns">${value}</div>
              </section>
            `).join('')}
        </section>
      `).join('')}
    `
  }

  function renderSkills () {
    const skills = state.detail.skills
    document.getElementById('skills').innerHTML = `
      <h4>Skills:</h4>
      ${_.map(skills, (value, key) => `
          <section class="row">
            <div class="small-12 medium-12 large-2 columns item-label">${splitCamelCaseToString(key)}:</div>
            <div class="small-12 medium-12 large-10 columns">${value}</div>
          </section>
        `).join('')}
    `
  }

  function renderEducation () {
    const educations = state.detail.educations
    document.getElementById('educations').innerHTML = `
      <h4>Education:</h4>
      ${_.map(educations, (education) => `
          <section class="row align-justify">
            <div class="small-12 medium-12 large-8 columns">${education.degree},&nbsp;&nbsp;${education.school}</div>
            <div class="small-12 medium-12 large-4 columns">${education.range}</div>
          </section>
        `).join('')}
    `
  }

  function renderProjects () {
    const projects = state.detail.projects
    document.getElementById('projects').innerHTML = `
      <h4>Project:</h4>
      ${_.map(projects, (project) => `
          <section class="row align-justify">
            <h5>${project.name}:</h5>
            <section>${project.details}</section>
          </section>
        `).join('')}
    `
  }

  function render () {
    renderCover()
    renderNav()
    renderContact()
    renderExperiences()
    renderSkills()
    renderEducation()
    renderProjects()
  }

  function init () {
    $(document).on('scroll', () => {
      const currentScroll = $(document).scrollTop()
      const currentBox = $('.main-box').filter((i, box) => {
        const $box = $(box)
        const halfWindowHeight = $(window).height() / 2
        return currentScroll + halfWindowHeight >= $box.offset().top && currentScroll + halfWindowHeight < ($box.height() + $box.offset().top)
      })
      if (state.activeSection !== currentBox.attr('id')) {
        state.activeSection = currentBox.attr('id')
        renderNav()
      }
    })

    return $.getJSON('profile.json').then(detail => {
      state.detail = detail
      render()
    })
  }

  return {
    init,
    onNavClick
  }
})()

home.init()
