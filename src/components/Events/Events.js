import React from 'react'
import './Events.css'

const Events = () => {
    return (
<div className="page-event">
  <div className="cover">
    <div className="heading">Career</div>
  </div>
  <div className="container">
    <div className="upcoming-sec">
      <div className="heading">Upcoming Events</div>
    </div>
    <div className="upcoming-event-list">
      <div className="event-block">
        <div className="row">
          <div className="col-lg-2 sec-1">
            <table>
              <tr>
                <td>
                  <div className="month">Aug</div>
                  <div className="month-date-devider"></div>
                  <div className="date">8</div>
                </td>
                <td className="title">DASTAAN - a Journey from unplaced to placed</td>
              </tr>
            </table>
          </div>
          <div className="col-lg-5 sec-2">
            <img src="http://jobox.globalconsultingpk.com/images/job_single_img_1.jpg" alt='event png' />
          </div>
          <div className="col-lg-5 sec-3">
            <div className="title">DASTAAN - A Way to from unplaced to placed</div>
            <div className="venue">
              <table>
                <tr>
                  <td><i className="fa fa-map-marker"></i></td>
                  <td>
                    <div>Redison Blu</div>
                    <div className="dim-color">
                      <a href="https://www.google.co.in" target="blank">Get Directions</a>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="time">
              <table>
                <tr>
                  <td><i className="fa fa-clock-o"></i></td>
                  <td>
                    <div>Monday,8 Aug, 20122 at 4:30 PM</div>
                    <div data-livestamp="1517054400" className="dim-color"></div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="sort-story">"For a student to be complete, he/she has to be a blend of team player & extraodinary skills. I feel that I am that student." - Anominous</div>
            <div className="group-of-btn">
              <a href="https://www.google.com" target="blank" className="btn book-ticket">Book Your Entry Pass</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Events
