/* global $, _  */

const home = (() => {
  let state = {
    detail: {
      "name": "Puxuan He",
      "contact": {
        "tel": "(816)-718-9015",
        "address": "1607 E 50 PL Chicago, IL, 60615",
        "email": "puxuanhe@gmail.com"
      },
      "experiences": [
        {
          "name": "<a href=\"http://www.expediainc.com/\">Expedia Inc.</a>",
          "range": "April, 2016 - Now",
          "role": "Software Engineer",
          "responsibility": "<p>worked on implementing the new advertising portal for <a href=\"https://www.expediapartnercentral.com\">expedia partner central</a> site.</p>",
          "technologies": "<ul><li><a href=\"https://facebook.github.io/react/\">ReactJs</a></li><li><a href=\"https://github.com/reactjs/redux\">redux</a></li><li>Spring</li></ul>"
        },
        {
          "name": "<a href=\"http://www.gohealthinsurance.com/\">GoHealth Insurance</a>",
          "range": "Sept, 2014 - April, 2016",
          "role": "Software Engineer",
          "responsibility": "<p>worked on front end implementations of gohealth <a href=\"https://www.gohealthinsurance.com/marketplace/\">marketplace</a> site.</p><p>wrote RESTful service to retrieve data from database.</p>",
          "technologies": "<ul><li>Angularjs</li><li>Spring</li><li>Grails</li></ul>"
        },
        {
          "name": "<a href=\"http://www.cerner.com/\">Cerner</a>",
          "range": "July, 2013 – Sept, 2014",
          "role": "Software Engineer",
          "responsibility": "<p>wrote mapreduce job to retrieve patients' and doctors' data from different data source, process data, link data and populate data.</p><p>provided RESTful service to retrieve data.</p><p>wrote RESTful service to retrieve data from database.</p><p>wrote chrome extension to facilitate agents go through federal marketplace</p>",
          "technologies": "<ul><li>Jersey</li><li>Hadoop Map/Reduce</li><li>Rails</li></ul>"
        }
      ],
      "skills": {
        "languages": "<ul><li>javascript</li><li>Java</li><li>groovy</li><li>ruby</li><li>C/C++/C#</li></ul>",
        "frameworks": "<ul><li>ReactJs/ReactNative</li><li>Angularjs</li><li>Rails</li><li>jQuery</li><li>Spring</li></ul>",
        "database": "<ul><li>mysql</li><li>hbase</li><li>Rails</li><li>couchbase</li></ul>"
      },
      "educations": [
        {
          "school": "The University of Iowa",
          "range": "Spet, 2011 – May, 2013",
          "degree": "Masters in Computer Science"
        },
        {
          "school": "Shandong University",
          "range": "Aug, 2007 – Jun, 2011",
          "degree": "Bachelors in Science"
        }
      ],
      "projects": [
        {
          "name": "CrackInvoice",
          "details": "<p>Tool to help people to sync basic info to file an invoice to desktop by using the mobile app to scan a bar code</p><ul><li><a href=\"http://crack-invoice-web.heroku.com/\">web-portal</a></li><li><a href=\"https://github.com/hepuxuan/CrackInvoiceV2\">mobile app</a></li></ul>"
        },
        {
          "name": "<a href=\"https://xiaobaichat.herokuapp.com/?lang=cn\">Baichatbot</a>",
          "details": "<p>chatting robot base on qq chat api</p><ul>"
        },
        {
          "name": "Ceraigslist",
          "details": "<p>Tool to search Craigslist and set up reminders when it provides items you want.</p><ul><li>wrote a web app which facilities searching Craigslist. wrote jobs to retrieve data from craigslist, process data and store data in local database. User can easily search by keyword, price, or even distance from user's home. User can also set up email alert, ceraigslist will send user a email when it find a match of user's search criteria.</li></ul>"
        }
      ]
    } 
  }

  function splitCamelCaseToString (s) {
    return s.split(/(?=[A-Z])/).join(' ').replace(/^./, l => l.toUpperCase())
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
    renderContact()
    renderExperiences()
    renderSkills()
    renderEducation()
    renderProjects()
  }

  return {
    render
  }
})()

home.render()
