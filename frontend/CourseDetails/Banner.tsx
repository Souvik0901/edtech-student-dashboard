import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaStar, FaPlay, FaUserGraduate, FaStarHalfAlt, FaRegStar, 
  FaRegThumbsUp,FaRegThumbsDown, FaBookOpen,FaClock, FaSignal, FaGlobe, FaMedal, FaUserClock   } from "react-icons/fa";

const Banner = () => {

  return (
  
      <section className="bg-light py-0 py-sm-5">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8">
          
              <h6 className="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">Digital Marketing</h6>
          
              <h1>The Complete Digital Marketing Course - 12 Courses in 1</h1>
              <p>Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if.
                Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.</p>
            
              <ul className="list-inline mb-0">
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"><FaStar/></i>4.5/5.0</li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>12k Enrolled</li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-signal text-success me-2"></i>All levels</li>
                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="bi bi-patch-exclamation-fill text-danger me-2"></i>Last updated 09/2021</li>
                <li className="list-inline-item h6 mb-0"><i className="fas fa-globe text-info me-2"><FaGlobe/></i>English</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Banner
