import React from 'react'
import Image from 'next/image';
import course08 from '../../components/assets/images/courses/4by3/08.jpg';
import avatar07 from '../assets/images/avatar/07.jpg';


const ListedCourse = () => {
  return (
        <section className="pt-0">
            <div className="container">
             
              <div className="row mb-4">
                <h2 className="mb-0">Top Listed Courses</h2>
              </div>

              <div className="row">
              
                <div className="tiny-slider arrow-round arrow-blur arrow-hover">
                  <div className="tiny-slider-inner" data-autoplay="false" data-arrow="true" data-edge="2" data-dots="false" data-items="3" data-items-lg="2" data-items-sm="1">
                  
                   
                    <div>
                      <div className="card p-2 border">
                        <div className="rounded-top overflow-hidden">
                          <div className="card-overlay-hover">
                            <Image src={course08} className="card-img-top" alt="course image"/>
                          </div>
                         
                          <div className="card-img-overlay">
                            <div className="card-element-hover d-flex justify-content-end">
                              <a href="#" className="icon-md bg-white rounded-circle text-center">
                                <i className="fas fa-shopping-cart text-danger"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                         
                          <div className="d-flex justify-content-between">
                          
                            <ul className="list-inline hstack gap-2 mb-0">
                            
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle"><i className="fas fa-user-graduate"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">9.1k</span>
                              </li>
                           
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-warning bg-opacity-15 text-warning rounded-circle"><i className="fas fa-star"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">4.5</span>
                              </li>
                            </ul>
                         
                            <div className="avatar avatar-sm">
                              <Image className="avatar-img rounded-circle" src={avatar07} alt="avatar"/>
                            </div>
                          </div>
                      
                          <hr/>
                        
                          <h5 className="card-title"><a href="#">The Complete Digital Marketing Course - 12 Courses in 1</a></h5>
                        
                          <div className="d-flex justify-content-between align-items-center">
                            <a href="#" className="badge bg-info bg-opacity-10 text-info"><i className="fas fa-circle small fw-bold me-2"></i>Personal Development</a>
                          
                            <h3 className="text-success mb-0">$140</h3>
                          </div>
                        </div>
                      </div>
                    </div>	
             
                    <div>
                      <div className="card p-2 border">
                        <div className="rounded-top overflow-hidden">
                          <div className="card-overlay-hover">
                            <Image src={course08} className="card-img-top" alt="course image"/>
                          </div>
                      
                          <div className="card-img-overlay">
                            <div className="card-element-hover d-flex justify-content-end">
                              <a href="#" className="icon-md bg-white rounded-circle text-center">
                                <i className="fas fa-shopping-cart text-danger"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                     
                          <div className="d-flex justify-content-between">
                       
                            <ul className="list-inline hstack gap-2 mb-0">
                          
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle"><i className="fas fa-user-graduate"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">2.5k</span>
                              </li>
                             
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-warning bg-opacity-15 text-warning rounded-circle"><i className="fas fa-star"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">3.6</span>
                              </li>
                            </ul>
                        
                            <div className="avatar avatar-sm">
                              <Image className="avatar-img rounded-circle" src={avatar07} alt="avatar"/>
                            </div>
                          </div>
                      
                          <hr/>
                     
                          <h5 className="card-title"><a href="#">Fundamentals of Business Analysis</a></h5>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <a href="#" className="badge bg-info bg-opacity-10 text-info"><i className="fas fa-circle small fw-bold me-2"></i>Business Development</a>
                       
                            <h3 className="text-success mb-0">$160</h3>
                          </div>
                        </div>
                      </div>
                    </div>
          
                    <div>
                      <div className="card p-2 border">
                        <div className="rounded-top overflow-hidden">
                          <div className="card-overlay-hover">
                            <Image src={course08} className="card-img-top" alt="course image"/>
                          </div>
                        
                          <div className="card-img-overlay">
                            <div className="card-element-hover d-flex justify-content-end">
                              <a href="#" className="icon-md bg-white rounded-circle text-center">
                                <i className="fas fa-shopping-cart text-danger"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                         
                          <div className="d-flex justify-content-between">
                      
                            <ul className="list-inline hstack gap-2 mb-0">
                        
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle"><i className="fas fa-user-graduate"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">6k</span>
                              </li>
                          
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-warning bg-opacity-15 text-warning rounded-circle"><i className="fas fa-star"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">3.8</span>
                              </li>
                            </ul>
                        
                            <div className="avatar avatar-sm">
                              <Image className="avatar-img rounded-circle" src={avatar07} alt="avatar"/>
                            </div>
                          </div>
                      
                          <hr/>
                       
                          <h5 className="card-title"><a href="#">Google Ads Training: Become a PPC Expert</a></h5>
                     
                          <div className="d-flex justify-content-between align-items-center">
                            <a href="#" className="badge bg-info bg-opacity-10 text-info"><i className="fas fa-circle small fw-bold me-2"></i> SEO</a>
                       
                            <h3 className="text-success mb-0">$226</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    <div>
                      <div className="card p-2 border">
                        <div className="rounded-top overflow-hidden">
                          <div className="card-overlay-hover">
                            <Image src={course08} className="card-img-top" alt="course image"/>
                          </div>
                  
                          <div className="card-img-overlay">
                            <div className="card-element-hover d-flex justify-content-end">
                              <a href="#" className="icon-md bg-white rounded-circle text-center">
                                <i className="fas fa-shopping-cart text-danger"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                   
                          <div className="d-flex justify-content-between">
                          
                            <ul className="list-inline hstack gap-2 mb-0">
                            
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle"><i className="fas fa-user-graduate"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">15k</span>
                              </li>
                            
                              <li className="list-inline-item d-flex justify-content-center align-items-center">
                                <div className="icon-md bg-warning bg-opacity-15 text-warning rounded-circle"><i className="fas fa-star"></i></div>
                                <span className="h6 fw-light ms-2 mb-0">4.8</span>
                              </li>
                            </ul>
                           
                            <div className="avatar avatar-sm">
                              <Image className="avatar-img rounded-circle" src={avatar07} alt="avatar"/>
                            </div>
                          </div>
                        
                          <hr/>
                        
                          <h5 className="card-title"><a href="#">Behavior, Psychology and Care Training</a></h5>
                 
                          <div className="d-flex justify-content-between align-items-center">
                            <a href="#" className="badge bg-info bg-opacity-10 text-info"><i className="fas fa-circle small fw-bold me-2"></i>Lifestyle</a>
                        
                            <h3 className="text-success mb-0">$342</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                 
                  </div>
                </div>
               
              </div>
            </div>
        </section>
  )
}

export default ListedCourse
