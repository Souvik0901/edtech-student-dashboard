"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiClock } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { IoMdStar,IoMdStarHalf } from "react-icons/io";
import { AiOutlineSchedule } from "react-icons/ai";
import { axiosInstance } from '@/redux/interceptors';
import { SERVICE_URL } from '@/utils/endpoint';
import Cookies from 'js-cookie';


interface Course {
  id: string;
  courseId: {
    _id: string;
    courseImage: string;
    courseTitle: string;
    lectures: number;
    price: number;
    courseLanguage: string;
    courseCategory: string;
    courseLevel: string;
    purchaseDate: string;
  };
  userId: string;
  _id: string;
}

const StudentsBookmark = () => {
  const user = Cookies.get('token');
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    const fetchLikedData = async () => {
      try {
        const Response = await axiosInstance.get(`${SERVICE_URL}getLikedcourses`);
        console.log('View Response:', Response.data.data);
        setCourses(Response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLikedData();
  }, []);

  return (
    <div>
      <section className="pt-0">
        <div className="container">
          <div className="row">
            {/* Left Sidebar */}
            <div className="col-xl-3">
              {/* Sidebar Content */}
              <nav className="navbar navbar-light navbar-expand-xl mx-0">
                        <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header bg-light">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body p-3 p-xl-0">
                                <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                                    <div className="list-group list-group-dark list-group-borderless">
                                        <a className="list-group-item" href="/student-dashboard"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                                        <a className="list-group-item" href="/subscription"><i className="bi bi-card-checklist fa-fw me-2"></i>My Subscriptions</a>
                                        <a className="list-group-item" href="/mycourselist"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                                        <a className="list-group-item" href="/payment-info"><i className="bi bi-credit-card-2-front fa-fw me-2"></i>Payment info</a>
                                        <a className="list-group-item active" href="/student-bookmark"><i className="bi bi-cart-check fa-fw me-2"></i>Wishlist</a>
                                        <a className="list-group-item" href="/edit-profile"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                                        <a className="list-group-item" href="/settings"><i className="bi bi-gear fa-fw me-2"></i>Settings</a>
                                        <a className="list-group-item" href="/delete-profile"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                                        <a className="list-group-item text-danger bg-danger-soft-hover" href="#"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
              </nav>
            </div>

            {/* Right Content */}
            <div className="col-xl-9">
              <div className="card border rounded-3">
                <div className="card-header border-bottom">
                  <h3 className="mb-0">WishList</h3>
                </div>
                <div className="card-body p-3 p-md-4">
                  <div className="row g-4">
                    {courses?.map((item) => (
                      <div className="col-sm-6 col-lg-4" key={item._id}>
                        <div className="card shadow h-100">
                          <Image src={`${item.courseId.courseImage}`} width={100} height={100} className="card-img-top" alt="course image" />
                          <div className="card-body pb-0">
                            <div className="d-flex justify-content-between mb-2">
                              <a href="#" className="badge bg-success bg-opacity-10 text-success">{item.courseId.courseLevel}</a>
                              <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart"><FcLike /></i></a>
                            </div>
                            <h5 className="card-title fw-normal"><a href="#">{item.courseId.courseTitle}</a></h5>
                            <p className="mb-2 text-truncate-2">Rooms oh fully taken by worse do Points afraid but may end Rooms Points afraid but may end Rooms</p>
                            <ul className="list-inline mb-0">
                              <li className="list-inline-item me-0 small"><IoMdStar /></li>
                              <li className="list-inline-item me-0 small"><IoMdStar /></li>
                              <li className="list-inline-item me-0 small"><IoMdStar /></li>
                              <li className="list-inline-item me-0 small"><IoMdStar /></li>
                              <li className="list-inline-item me-0 small"><IoMdStarHalf /></li>
                              <li className="list-inline-item ms-2 h6 fw-light mb-0"> 4.5/5.0</li>
                            </ul>
                          </div>
                          <div className="card-footer pt-0 pb-3">
                            <hr />
                            <div className="d-flex justify-content-between">
                              <span className="clock"><FiClock />{item.courseId.lectures}h 00m</span>
                              <span className="lect"><AiOutlineSchedule />{item.courseId.lectures} lectures</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentsBookmark;
