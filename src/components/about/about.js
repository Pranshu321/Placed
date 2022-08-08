import React from 'react'
import './about.css'
const About = () => {
  return (
    <div>
      <section class="page-section" id="about">
        <div class="container">
          <div class="text-center">
            <h2 class="section-heading text-uppercase">How We work</h2>
            <h3 class="section-subheading text-muted">What to be part of Placed Story</h3>
          </div>
          <ul class="timeline">
            <li>
              <div class="timeline-image"></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4>Start from</h4>
                  <h4 class="subheading">Our Humble Beginnings</h4>
                </div>
                <div class="timeline-body"><p class="text-muted">We approach companies and help the startups to find the best talent as been part of our platform.</p></div>
              </div>
            </li>
            <li class="timeline-inverted">
              <div class="timeline-image"></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4>Going on</h4>
                  <h4 class="subheading">A Student Trust</h4>
                </div>
                <div class="timeline-body"><p class="text-muted">Many of the students faced fear how wiil they manage to answer questions what should be their approach and more , we build trust as we make sure they will be comfortable with platform so they will give their best.</p></div>
              </div>
            </li>
            <li>
              <div class="timeline-image"></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4>Finally</h4>
                  <h4 class="subheading">Unplaced to Placed</h4>
                </div>
                <div class="timeline-body"><p class="text-muted">Due to the effort of the student we manage to grab the opportunity and that victory for us also , Cheers!</p></div>
              </div>
            </li>
            <li class="timeline-inverted">
              <div class="timeline-image">
                <h4>
                  Be Part
                  <br />
                    Of Our
                    <br />
                      Journey!
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
        )
}

        export default About
