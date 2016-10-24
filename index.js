/* global $, _  */

const indexPage = (() => {
  let state = {
    activeSection: 'contacts',
    detail: {}
  }

  function splitCamelCaseToString (s) {
    return s.split(/(?=[A-Z])/).join(' ').replace(/^./, (l) => { return l.toUpperCase() })
  }

  function renderNav () {
    document.getElementById('nav').innerHTML = `
      <nav>
        <ul class="vertical medium-horizontal menu">
          <li>
            <h3 class="logo"><a href="/">${state.detail.name}</a></h3>
          </li>
          <li ${state.activeSection === 'contacts' ? 'class="active"' : ''}>
            <a class="in-site" href="#contacts">Contact</a>
          </li>
          <li ${state.activeSection === 'experiences' ? 'class="active"' : ''}>
            <a class="in-site" href="#experiences">Experience</a>
          </li>
          <li ${state.activeSection === 'skills' ? 'class="active"' : ''}>
            <a class="in-site" href="#skills">Skills</a>
          </li>
          <li ${state.activeSection === 'educations' ? 'class="active"' : ''}>
            <a class="in-site" href="#educations">Education</a>
          </li>
          <li ${state.activeSection === 'projects' ? 'class="active"' : ''}>
            <a class="in-site" href="#projects">Projects</a>
          </li>
          <li>
            <a href="https://github.com/hepuxuan/">Github</a>
          </li>
        </ul>
      </nav>
    `

    $('nav a.in-site').on('click', (e) => {
      e.preventDefault()
      const sectionSelector = $(e.target).attr('href')
      $('html,body').animate({
        scrollTop: $(sectionSelector).offset().top - 60
      })
    })
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

  function renderExperiences () {
    const experiences = state.detail.experiences
    document.getElementById('experiences').innerHTML = `
      <h4 class="title">Experience:</h4>
      ${_.map(experiences, renderExperience).join('')}
    `
  }

  function renderSkills () {
    const skills = state.detail.skills
    document.getElementById('skills').innerHTML = `
      <h4>Skills:</h4>
      ${_.map(skills, (value, key) => {
        return `
          <section class="row">
            <div class="small-12 medium-12 large-2 columns item-label">${splitCamelCaseToString(key)}:</div>
            <div class="small-12 medium-12 large-10 columns">${value}</div>
          </section>
        `
      }).join('')}
    `
  }

  function renderEducation () {
    const educations = state.detail.educations
    document.getElementById('educations').innerHTML = `
      <h4>Education:</h4>
      ${_.map(educations, (education) => {
        return `
          <section class="row align-justify">
            <div class="small-12 medium-12 large-8 columns">${education.degree},&nbsp;&nbsp;${education.school}</div>
            <div class="small-12 medium-12 large-4 columns">${education.range}</div>
          </section>
        `
      }).join('')}
    `
  }

  function renderProjects () {
    const projects = state.detail.projects
    document.getElementById('projects').innerHTML = `
      <h4>Project:</h4>
      ${_.map(projects, (project) => {
        return `
          <section class="row align-justify">
            <h5>${project.name}:</h5>
            <section>${project.details}</section>
          </section>
        `
      }).join('')}
    `
  }

  function renderBackbone () {
    const template = `
      <div class="page-body">
        <header id="nav"></header>
        <main>
          <section class="main-box" id="contacts"></section>
          <hr/>
          <section class="main-box" id="experiences"></section>
          <hr/>
          <section class="main-box" id="skills"></section>
          <hr/>
          <section class="main-box" id="educations"></section>
          <hr/>
          <section class="main-box" id="projects"></section>
        </main>
      </div>
    `
    document.getElementById('root').innerHTML = template
  }

  function render () {
    renderBackbone()
    renderNav()
    renderContact()
    renderExperiences()
    renderSkills()
    renderEducation()
    renderProjects()

    $(document).on('scroll', () => {
      $('.main-box').each((i, box) => {
        const $box = $(box)
        const currentScroll = $(document).scrollTop()
        if (currentScroll > $box.offset().top && currentScroll < ($box.height() + $box.offset().top)) {
          const newActiveSection = $box.attr('id')
          if (newActiveSection !== state.activeSection) {
            state.activeSection = $box.attr('id')
            renderNav()
          }
        }
      })
    })
  }

  return {
    render,
    state
  }
})()

$(document).ready(() => {
  $.getJSON('profile.json').then((detail) => {
    indexPage.state.detail = detail
  }).done(indexPage.render)
})
