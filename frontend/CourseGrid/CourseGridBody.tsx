"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdStar,IoMdStarHalf } from "react-icons/io";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from '@/redux/interceptors';
import { SERVICE_URL } from '@/utils/endpoint';


interface course {
  id:string;
  courseImage: string,
  courseTitle: string;
  lectures: number;
  price: number;
  courseLevel: string;
  courseLanguage: string;
  _id: string
}




const CourseGridBody = () => {

  const [courses, setCourses] = useState<course[]>([]);

  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [selectedskills, setSelectedskills] = useState<string[]>([]);
  const [selectedlanguages, setSelectedlanguages] = useState<string[]>([]);
  const [likedCourse, setLikedCourse] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(`${SERVICE_URL}getcourses`,{
          params: { 
            courseLevel: selectedskills.join(','), 
            courseLanguage: selectedlanguages.join(','), 
            page: currentPage, 
            limit: 6, 
            search,
          }, 
        });
        const data: course[] = response.data.result;
        setCourses(data);
        setPageCount(response.data.pageCount);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [search, currentPage, selectedskills, selectedlanguages]); 


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    };


    const handleSkillLevelChange = (skillLevel: string) => {
      // Toggle the selected skill level
      setSelectedskills((prevSkills) =>
        prevSkills.includes(skillLevel)
          ? prevSkills.filter((skill) => skill !== skillLevel)
          : [...prevSkills, skillLevel]
      );
    };
    
    const handleLanguageChange = (language: string) => {
      // Toggle the selected skill level
      setSelectedlanguages((prevLangs) =>
        prevLangs.includes(language)
          ? prevLangs.filter((lang) => lang !== language)
          : [...prevLangs, language]
      );
    };


    const handleLikeToggle = (courseId: string) => {
      setLikedCourse((prevLikedCourses) =>
        prevLikedCourses.includes(courseId)
          ? prevLikedCourses.filter((id) => id !== courseId)
          : [...prevLikedCourses, courseId]
      );
    };




  
  return (
    <div>

      <section className="py-5">
      <div className="container">
        <div className="row">

          {/* courseCollections UI */}
          <div className="col-lg-8 col-xl-9">

  
            <div className="row mb-4 align-items-center">

              <div className="col-xl-6">
                <form className="bg-body shadow rounded p-2">
                  <div className="input-group input-borderless">
                    <input 
                    className="form-control me-1" 
                    type="search"
                    placeholder="Find your course"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    />
                    <button type="button" className="btn btn-primary mb-0 rounded z-index-1" ><FaSearch/></button>
                  </div>
                </form>
              </div>


              <div className="col-xl-3 mt-3 mt-xl-0">
                <form className="bg-body shadow rounded p-2 input-borderless">
                  <select className="form-select form-select-sm js-choice border-0" aria-label=".form-select-sm">
                    <option value="">Most Viewed</option>
                    <option>Recently search</option>
                    <option>Most popular</option>
                    <option>Top rated</option>
                  </select>
                </form>
              </div>


              <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center mt-3 mt-xl-0">

                <button className="btn btn-primary mb-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                  <i className="fas fa-sliders-h me-1"></i> Show filter
                </button>

                <p className="mb-0 text-end">Showing  page {currentPage} of {pageCount}</p>
              </div>

            </div>

            
            <div className="row g-4">

            {courses && courses.map(course => (
              <div className="col-sm-6 col-xl-4" key={course.id} >
                <div className="card shadow h-100">

                  <Image src={`${course.courseImage}`} width={100} height={100} className="card-img-top" alt="course image"/>

                  <div className="card-body pb-0">

                    <div className="d-flex justify-content-between mb-2">
                      <a href="#" className="badge bg-purple bg-opacity-10 text-purple">{course.courseLevel}</a>
                      <a href="#" className="text-danger" onClick={() => handleLikeToggle(course.id)}>
                           {likedCourse.includes(course.id) ? <FaHeart /> : <FaRegHeart />}
                      </a>
                    </div>

                    <h5 className="card-title"><a href={`/course-details?courseId=${course._id}`}>{course.courseTitle}</a></h5>
                    <p className="mb-2 text-truncate-2">Proposal indulged no do sociable he throwing settling.</p>

                    <ul className="list-inline mb-0">
                      <li className="list-inline-item me-0 small"><IoMdStar/></li>
                      <li className="list-inline-item me-0 small"><IoMdStar/></li>
                      <li className="list-inline-item me-0 small"><IoMdStar/></li>
                      <li className="list-inline-item me-0 small"><IoMdStar/></li>
                      <li className="list-inline-item me-0 small"><IoMdStarHalf /></li>
                      <li className="list-inline-item ms-2 h6 fw-light mb-0"> 4.5/5.0</li>
                    </ul>
                  </div>

                  <div className="card-footer pt-0 pb-3">
                    <hr/>
                    <div className="lower-cont">
                      <span className="clock"><FiClock/>10h 00m</span>
                      <span className="lect"><AiOutlineSchedule />{course.lectures} lectures</span>

                    </div>
                  </div>
                </div>
              </div>
           ))}

  

            </div>
    
          </div>
 
          {/* Sidebar Filter-Portion UI */}
          <div className="col-lg-4 col-xl-3 pt-5 pt-lg-0">      
          </div>
         
        </div>
      </div>
      </section>



      {/* subsribe section */}
      <section className="pt-0">
      </section>

    </div>
  )
}

export default CourseGridBody
