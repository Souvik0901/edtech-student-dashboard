"use client"
import React, { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import avatar from '../../components/assets/images/avatar/09.jpg'
import { axiosInstance } from '@/redux/interceptors';
import { SERVICE_URL } from '@/utils/endpoint';
import { useRouter } from 'next/navigation';
import { FaRegCheckCircle, FaFacebook, FaTwitter, FaInstagram,
         FaLinkedin, FaYoutube, FaStar, FaPlay, FaUserGraduate,
	 FaStarHalfAlt, FaRegStar, FaRegThumbsUp, FaRegThumbsDown, 
	 FaBookOpen, FaClock, FaSignal, FaGlobe, FaMedal, FaUserClock} from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import Cookies from 'js-cookie';
import defaultImg from '../assets/images/avatar/defaultprofile.png';
import {Dialog, DialogContent} from '@material-ui/core';


type AccordionState = {
  collapseOne: boolean;
  collapseTwo: boolean;
  collapseThree: boolean;
  collapseFour: boolean;
  collapseFive: boolean;
  collapseSix: boolean;
  collapseSeven: boolean;
  collapseEight: boolean;
};

interface Course {
id:string;
courseImage: string,
courseTitle: string;
lectures: number;
price: number;
courseLanguage: string;
courseCategory: string;
courseLevel: string;
purchaseDate: string;
shortDescrp: string;
longDescrp: string;
period: number;
videoLink: string;
curriculum: {
    curriculum: {
      lectureName: string;
      topics: {
        topicName: string;
        topicDescription: string;
        topicvideo: string;
      }[];
    }[];
   };
   user_id:{
	name: string;
	 email: string;
	profileImg: string;
	abouttxt: string;
	totalCourses:  number;
   };

  _id: string;
}

interface View {
map(arg0: (item: any) => React.JSX.Element): unknown;
id:string;
courseId: {
_id:string;
courseImage: string,
courseTitle: string;
lectures: number;
price: number;
courseLanguage: string;
courseCategory: string;
courseLevel: string;
purchaseDate: string;
period: number;
}
userId: string;
_id: string;
}

interface Review {
map(arg0: (item: any) => React.JSX.Element): unknown;
id: string;
review: string;
ratings: string;
reply: string;
courseId: string;
student:{
_id:string;
name:string;
profileImg: string;
}
_id:string;
}

const CourseDetailsbody = () => {  
const router = useRouter();
const user = Cookies.get('token');
  const [activeStep, setActiveStep] = useState('Overview');
  const [accordionOpen, setAccordionOpen] = useState<AccordionState>({
    collapseOne: false,
    collapseTwo: false,
    collapseThree: false,
    collapseFour: false,
    collapseFive: false,
    collapseSix: false,
    collapseSeven: false,
    collapseEight: false,
  });

const toggleAccordion = (item: keyof AccordionState) => {
	setAccordionOpen((prevState) => ({
		...prevState,
		[item]: !prevState[item as keyof AccordionState],
	}));
};
	
const handleStepClick = (step: React.SetStateAction<string>) => {
setActiveStep(step);
};


const [course, setCourse] = useState<Course | null>(null);
const [view, setView] = useState<View | null>(null);
const [review, setReview] = useState<Review | null>(null);
const [buttonPopup, setButtonPopup] = useState(false);
const [reviewDetails , setReviewDetails] = useState({
	review: '',
	ratings: '',
	courseId: ''
});
  const [instId, setInstId] = useState('');



  useEffect(() => {
		const fetchData = async () => {
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const courseId = urlParams.get('courseId');		
				if (courseId) {
					const courseResponse = await axiosInstance.get(`${SERVICE_URL}getsinglecourse/${courseId}`);
					const formattedCourse = {
						...courseResponse.data.data,
						purchaseDate: new Date(courseResponse.data.data.purchaseDate).toLocaleDateString()
					};
					console.log(formattedCourse.user_id._id)
					setInstId(formattedCourse.user_id._id);
					setCourse(formattedCourse);	
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		const fetchViewData = async () => {
		        try {
				const viewResponse = await axiosInstance.get(`${SERVICE_URL}recentlyview`);
				setView(viewResponse.data.data);  
			} catch (error) {
					console.error('Error fetching data:', error);
			}
	  };

		const fetchreviewedData = async () => {
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const courseId = urlParams.get('courseId');	
				const reviewedResponse = await axiosInstance.get(`${SERVICE_URL}getreview/${courseId}`);
				setReview(reviewedResponse.data.data);

			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
		fetchViewData();
		fetchreviewedData();
	}, []);
	
	const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setReviewDetails({
      ...reviewDetails,
      [name]: value,
    });
  };

	const handleSubmit = async(e: { preventDefault: () => void; })=>{
		e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
		const courseId = urlParams.get('courseId');
   
		// Make a POST request using axios
		const response = await axiosInstance.post(`${SERVICE_URL}addtocart`, 
			{courseId},
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: user 
				},
			}
		);
		console.log(response.data);
		const responseData = response.data;
		if(responseData.success){
			router.push('/cart');
		}
			
	}



  const postSubmit = async() =>{
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const courseId = urlParams.get('courseId');
      
			let reviewData : any = new FormData();
			reviewData.append('review', reviewDetails.review);
			reviewData.append('ratings', reviewDetails.ratings);
      reviewData.append('courseId', courseId);
			reviewData.append('instructorId', instId);

			axiosInstance.post(`${SERVICE_URL}postreview`, reviewData)
			.then((res)=>{
				console.log(res)
				window.location.reload();
			})
			.catch((error)=>{
        console.log(error)
			})

		} catch (error) {
			console.error('Error creating review:', error);
		}
		
	
	}

	const handleClose = () => {
		setButtonPopup(false); 
	};

	const renderStars = (ratings: string) => {
    // Extract the rating number using regular expression
    const match = ratings.match(/\((\d)\/5\)/);
    const ratingNumber = match ? parseInt(match[1]) : NaN;
  
    // console.log('Rating:', ratings, 'Rating Number:', ratingNumber);
  
    // Ensure ratingNumber is within range (1 to 5)
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      console.error('Invalid rating:', ratings);
      return null; 
    }
  
    // Fill arrays with stars based on ratingNumber
    const fullStars = Array(ratingNumber).fill(<FaStar />);
    const emptyStars = Array(5 - ratingNumber).fill(<FaRegStar />);
  
    // Concatenate and map stars to JSX elements
    return [...fullStars, ...emptyStars].map((star, index) => (
      <span key={index}>{star}</span>
    ));
  };
  

  return (
  <>
		<div>
			<section className="bg-light py-0 py-sm-5">
			<div className="container">
				<div className="row py-5">
					<div className="col-lg-8">
					{course && (
						<>
						<h6 className="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">{course.courseCategory}</h6>
				
						<h1>{course.courseTitle}</h1>
						<p>{course.shortDescrp}
						</p>
					
						<ul className="banner-list-item">
							<li className="banner-list-items-content"><i className="fas fa-star text-warning me-2"><FaStar/></i>4.5/5.0</li>
							<li className="banner-list-items-content"><i className="fas fa-user-graduate text-orange me-2"><FaUserGraduate/></i>0 Enrolled</li>
							<li className="banner-list-items-content"><i className="fas fa-signal text-success me-2"><FaSignal/></i>{course.courseLevel}</li>
							<li className="banner-list-items-content"><i className="bi bi-patch-exclamation-fill text-danger me-2"></i>Last updated {course.purchaseDate}</li>
							<li className="banner-list-items-content"><i className="fas fa-globe text-info me-2"><FaGlobe/></i>{course.courseLanguage}</li>
						</ul>
					</>
					)}

					</div>
				</div>
			</div>
			</section>
		
			<section className="pb-0 py-lg-5">

					<div className="container">
						<div className="row">
						

						{/* main content options box */}
							<div className="col-lg-8">

								<div className="bg-body shadow rounded-2 p-4">
						

										{/* tablist */}
										<ul className="nav nav-pills nav-tabs-line pt-0" id="course-pills-tab" role="tablist">
										
											<li className="nav-item me-2 me-sm-4" role="presentation">
												<button className={`nav-link mb-2 mb-md-0 ${activeStep === 'Overview' ? 'active' : ''}`}  
																id="course-pills-tab-1"
																data-bs-toggle="pill" 
																data-bs-target="#course-pills-1" 
																type="button" role="tab" 
																aria-controls="course-pills-1" 
																aria-selected={activeStep === 'Overview'}
																onClick={()=> handleStepClick('Overview')}
												>
												Overview
												</button>
											</li>
										
											<li className="nav-item me-2 me-sm-4" role="presentation">
												<button className={`nav-link mb-2 mb-md-0 ${activeStep === 'Curriculum' ? 'active' : ''}`} 
																id="course-pills-tab-2" 
																data-bs-toggle="pill" 
																data-bs-target="#course-pills-2" 
																type="button" role="tab" 
																aria-controls="course-pills-2" 
																aria-selected={activeStep === 'Curriculum'}
																onClick={()=> handleStepClick('Curriculum')}
												>
												Curriculum
												</button>
											</li>
										
											<li className="nav-item me-2 me-sm-4" role="presentation">
												<button className={`nav-link mb-2 mb-md-0 ${activeStep === 'Instructor' ? 'active' : ''}`} 
																id="course-pills-tab-3" 
																data-bs-toggle="pill" 
																data-bs-target="#course-pills-3" 
																type="button" role="tab" 
																aria-controls="course-pills-3" 
																aria-selected={activeStep === 'Instructor'}
																onClick={()=> handleStepClick('Instructor')}
												>
												Instructor
												</button>
											</li>
											
											<li className="nav-item me-2 me-sm-4" role="presentation">
												<button className={`nav-link mb-2 mb-md-0 ${activeStep === 'Reviews' ? 'active' : ''}`} 
																id="course-pills-tab-4" 
																data-bs-toggle="pill" 
																data-bs-target="#course-pills-4" 
																type="button" role="tab" 
																aria-controls="course-pills-4" 
																aria-selected={activeStep === 'Reviews'}
																onClick={()=> handleStepClick('Reviews')}
												>
												Reviews
												</button>
											</li>
											
											<li className="nav-item me-2 me-sm-4" role="presentation">
												<button className={`nav-link mb-2 mb-md-0 ${activeStep === 'FAQs' ? 'active' : ''}`} 
																id="course-pills-tab-5" 
																data-bs-toggle="pill" 
																data-bs-target="#course-pills-5" 
																type="button" role="tab" 
																aria-controls="course-pills-5" 
																aria-selected={activeStep === 'FAQs'}
																onClick={()=> handleStepClick('FAQs')}
												>
												FAQs 
												</button>
											</li>
										</ul>

										<hr/>
										
										{/* course-content */}
										<div className="tab-content pt-2" id="course-pills-tabContent">
								

											{/* course-pills-01 */}
											{ activeStep === 'Overview' &&
											<div className="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
											{ course &&(
												<>
													<div>
														<h5 className="mb-3">Course Description</h5>
														<p className="mb-3">{course.longDescrp}</p>
													</div>
												</>	
											)}
											</div>
											}
			
											{/* course-pills-02 */}
											{activeStep === 'Curriculum' && course && (
												<div className="tab-pane fade show active" id="course-pills-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
													<div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
														{course.curriculum.curriculum.map((lecture, index) => (
															<div className="accordion-item mb-3" key={index}>
																<h6 className="accordion-header font-base" id={`heading-${index}`}>
																<button
																	className={`accordion-button fw-bold rounded d-sm-flex d-inline-block ${
																		accordionOpen[`collapse${index + 1}` as keyof AccordionState] ? '' : 'collapsed'
																	}`}
																	type="button"
																	onClick={() => toggleAccordion(`collapse${index + 1}` as keyof AccordionState)}
																	aria-expanded={accordionOpen[`collapse${index + 1}` as keyof AccordionState]}
																	aria-controls={`collapse-${index + 1}`}
																>

																		{lecture.lectureName}
																		<span className="small ms-0 ms-sm-2">({lecture.topics.length} Lectures)</span>
																	</button>
																</h6>
																<div
																	id={`collapse-${index + 1}`}
																	className={`accordion-collapse collapse ${
																		accordionOpen[`collapse${index + 1}` as keyof AccordionState] ? 'show' : ''
																	}`}
																	aria-labelledby={`heading-${index}`}
																	data-bs-parent="#accordionExample2"
																	style={{ visibility: 'visible' }}
																>
																	<div className="accordion-body mt-3">
																		{lecture.topics.map((topic, topicIndex) => (
																			<div key={topicIndex} className="d-flex justify-content-between align-items-center">
																				<div className="position-relative d-flex align-items-center">
																					<a  className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static" onClick={()=>setButtonPopup(true)}>
																						<i className="fas fa-play me-0"><FaPlay/></i>
																					</a>
																					<span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
																						{topic.topicName}
																					</span>
																				</div>
																				{/* <p className="mb-0">2m 10s</p> */}
																			</div>
																		))}
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											)}

									
											{/* course-pills-03 */}
											{ activeStep === 'Instructor' &&
											<div className="tab-pane fade show active" id="course-pills-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
												
												{course && (
													<>
														<div>
														<div className="card mb-0 mb-md-4">
															<div className="row g-0 align-items-center">
																<div className="col-md-5">
																
																{course.user_id.profileImg ? (
																			<Image src={course.user_id.profileImg} width={100} height={100} className="img-fluid rounded-3" alt="instructor-image" />
																			) : (
																			<Image src={defaultImg} width={100} height={100} className="img-fluid rounded-3" alt="default-image" />
																)}
																</div>
																<div className="col-md-7">
																
																	<div className="card-body">
																	
																	<h3 className="card-title mb-0">{course.user_id.name}</h3>
																		<p className="mb-2">Instructor of Technology</p>
																
																		<ul className="list-inline mb-3">
																			<li className="list-inline-item me-3">
																				<a href="#" className="fs-5 text-twitter"><i className="fab fa-twitter-square"><FaTwitter/></i></a>
																			</li>
																			<li className="list-inline-item me-3">
																				<a href="#" className="fs-5 text-instagram"><i className="fab fa-instagram-square"><FaInstagram /></i></a>
																			</li>
																			<li className="list-inline-item me-3">
																				<a href="#" className="fs-5 text-facebook"><i className="fab fa-facebook-square"><FaFacebook /></i></a>
																			</li>
																			<li className="list-inline-item me-3">
																				<a href="#" className="fs-5 text-linkedin"><i className="fab fa-linkedin"><FaLinkedin /></i></a>
																			</li>
																			<li className="list-inline-item">
																				<a href="#" className="fs-5 text-youtube"><i className="fab fa-youtube-square"><FaYoutube/> </i></a>
																			</li>
																		</ul>

																
																		<ul className="list-inline">
																		<li className="list-inline-item">
																			<div className="d-flex align-items-center me-3 mb-2">
																				<span className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle flex justify-center align-center"><i className="fas fa-user-graduate" style={{ padding: '0.85rem' }}><FaUserGraduate/></i></span>
																				<span className="h6 fw-light mb-0 ms-2">0k</span>
																			</div>
																		</li>
																		<li className="list-inline-item">
																			<div className="d-flex align-items-center me-3 mb-2">
																				<span className="icon-md bg-warning bg-opacity-15 text-warning rounded-circle flex justify-center align-center"><i className="fas fa-star" style={{ padding: '0.85rem' }}><FaStar/></i></span>
																				<span className="h6 fw-light mb-0 ms-2">0</span>
																			</div>
																		</li>
																		<li className="list-inline-item">
																			<div className="d-flex align-items-center me-3 mb-2">
																				<span className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle flex justify-center align-center"><i className="fas fa-play" style={{ padding: '0.85rem' }}><FaPlay/></i></span>
																				<span className="h6 fw-light mb-0 ms-2">{course.user_id.totalCourses} Courses</span>
																			</div>
																		</li>
																		<li className="list-inline-item">
																			<div className="d-flex align-items-center me-3 mb-2">
																				<span className="icon-md bg-info bg-opacity-10 text-info rounded-circle flex justify-center align-center"><i className="fas fa-comment-dots" style={{ padding: '0.85rem' }}><AiOutlineMessage/></i></span>
																				<span className="h6 fw-light mb-0 ms-2">0</span>
																			</div>
																		</li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
												
														<h5 className="mb-3">About Instructor</h5>
														<p className="mb-3">{course.user_id.abouttxt}
														</p>											
														<div className="col-12">
															<ul className="list-group list-group-borderless mb-0">
																<li className="list-group-item pb-0">Mail ID:<a href="#" className="ms-2">{course.user_id.email}</a></li>
																<li className="list-group-item pb-0">Web:<a href="#" className="ms-2">https://eduport.com</a></li>
															</ul>
														</div>
														</div>
													</>
												)}	
											

												</div>
											}
								
											{/* course-pills-04 */}
											{activeStep === 'Reviews' &&
											<div className="tab-pane fade show active" id="course-pills-4" role="tabpanel" aria-labelledby="course-pills-tab-4">			
												{course && (
													<>
														<div className="row mb-4" >
															<h5 className="mb-4">Our Student Reviews</h5>					
															<div className="col-md-4 mb-3 mb-md-0">
																<div className="text-center">
																	
																	<h2 className="mb-0">4.5</h2>
															
																	<ul className="list-inline mb-0">
																		<li className="list-inline-item me-0"><i className="fas fa-star text-warning"><FaStar /></i></li>
																		<li className="list-inline-item me-0"><i className="fas fa-star text-warning"><FaStar /></i></li>
																		<li className="list-inline-item me-0"><i className="fas fa-star text-warning"><FaStar /></i></li>
																		<li className="list-inline-item me-0"><i className="fas fa-star text-warning"><FaStar /></i></li>
																		<li className="list-inline-item me-0"><i className="fas fa-star-half-alt text-warning"><FaStarHalfAlt /></i></li>
																	</ul>
																	<p className="mb-0">(Based on todays review)</p>
																</div>
															</div>

														
															<div className="col-md-8">
																<div className="row align-items-center">
																	
																	<div className="col-6 col-sm-8">
																	
																		<div className="progress progress-sm bg-warning bg-opacity-15">
																			<div className="progress-bar bg-warning" role="progressbar" style={{width: 350}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
																		</div>
																	</div>

																	<div className="col-6 col-sm-4">
																
																		<ul className="list-inline mb-0">
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																		</ul>
																	</div>

																
																	<div className="col-6 col-sm-8">
																		
																		<div className="progress progress-sm bg-warning bg-opacity-15">
																			<div className="progress-bar bg-warning" role="progressbar" style={{width: 250}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
																		</div>
																	</div>

																	<div className="col-6 col-sm-4">
																		
																		<ul className="list-inline mb-0">
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar /></i></li>
																		</ul>
																	</div>

																
																	<div className="col-6 col-sm-8">
												
																		<div className="progress progress-sm bg-warning bg-opacity-15">
																			<div className="progress-bar bg-warning" role="progressbar" style={{width: 180}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
																		</div>
																	</div>

																	<div className="col-6 col-sm-4">
																
																		<ul className="list-inline mb-0">
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																		</ul>
																	</div>

																	
																	<div className="col-6 col-sm-8">
																	
																		<div className="progress progress-sm bg-warning bg-opacity-15">
																			<div className="progress-bar bg-warning" role="progressbar" style={{width: 100}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}></div>
																		</div>
																	</div>

																	<div className="col-6 col-sm-4">
																	
																		<ul className="list-inline mb-0">
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																		</ul>
																	</div>

																
																	<div className="col-6 col-sm-8">
																		
																		<div className="progress progress-sm bg-warning bg-opacity-15">
																			<div className="progress-bar bg-warning" role="progressbar" style={{width: 50}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}></div>
																		</div>
																	</div>

																	<div className="col-6 col-sm-4">
																	
																		<ul className="list-inline mb-0">
																			<li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"><FaStar /></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																			<li className="list-inline-item me-0 small"><i className="far fa-star text-warning"><FaRegStar/></i></li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
												
													
													
															<>
															{ review && Array.isArray(review) && review.map((item) => (
																<div className="row" key={item._id} >		
																<div className="d-md-flex my-4" >
																
																	<div className="avatar avatar-xl me-4 flex-shrink-0">
																			{item.student.profileImg ? (
																						<Image src={item.student.profileImg} width={100} height={100} className="avatar-img rounded-circle" alt="student-image" />
																						) : (
																						<Image src={defaultImg} width={100} height={100} className="avatar-img rounded-circle" alt="default-image" />
																			)}			
																	</div>
																
																	<div>
																		<div className="d-sm-flex mt-1 mt-md-0 align-items-center">
																			<h5 className="me-3 mb-0">{item.student.name}</h5>
																	
																			<div className="star-ratings" style={{ display: "flex", color: "yellow"}}>
																				{renderStars(item.ratings)}
																			</div>
																		</div>
																	
																		<p className="small mb-2">2 days ago</p>
																		<p className="mb-2">{item.review}</p>
																		
																	</div>
																</div>
															
					
														
															{item.reply !== "" && (
																<div className="d-md-flex mb-4 ps-4 ps-md-5">
																	<div className="avatar avatar-lg me-4 flex-shrink-0">
																		{course.user_id.profileImg ? (
																			<Image className="avatar-img rounded-circle" src={`${course.user_id.profileImg}`} width={100} height={100}  alt="avatar"/>
																		) : (
																			<Image  className="avatar-img rounded-circle" src={defaultImg} width={100} height={100}  alt="drafault-image" />
																		)}
																	</div>
																	<div>
																		<div className="d-sm-flex mt-1 mt-md-0 align-items-center">
																			<h5 className="me-3 mb-0">{course.user_id.name}</h5>
																		</div>
																		<p className="small mb-2">1 days ago</p>
																		<p className="mb-2">{item.reply}</p>
																	</div>
																</div>
															)}
														
														<hr/>
														</div>
															))}
															</>

												
											

														{/* POST REQUEST ----- > made a review on the course */}
														<div className="mt-2">
															<h5 className="mb-4">Leave a Review</h5>
															<div className="row g-3" >
															
																<div className="col-12 bg-light-input">
																	<select id="inputState2" className="form-select js-choice" name ='ratings' value={reviewDetails.ratings}  onChange={handleChange}>
																		<option>★★★★★ (5/5)</option>
																		<option>★★★★☆ (4/5)</option>
																		<option>★★★☆☆ (3/5)</option>
																		<option>★★☆☆☆ (2/5)</option>
																		<option>★☆☆☆☆ (1/5)</option>
																	</select>
																</div>
															
																<div className="col-12 bg-light-input">
																	<textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Your review" rows={3} name='review' value={reviewDetails.review} onChange={handleChange}></textarea>
																</div>
															
																<div className="col-12">
																	<button className="btn btn-primary mb-0" onClick={()=>{postSubmit()}}>Post Review</button>
																</div>
															</div>
														</div>

													</>
												)}			
											</div>
											}
										
											{/* course-pills-05 */}
											{activeStep === 'FAQs' &&
											<div className="tab-pane fade show active" id="course-pills-5" role="tabpanel" aria-labelledby="course-pills-tab-5">

											<h5 className="mb-3">Frequently Asked Questions</h5>

											<div className="accordion accordion-flush" id="accordionExample">

												<div className="accordion-item">
													<h2 className="accordion-header" id="headingOne">
														<button
															className={`accordion-button ${accordionOpen.collapseOne ? '' : 'collapsed'}`}
															type="button"
															onClick={() => toggleAccordion('collapseOne')}
															data-bs-toggle="collapse"
															data-bs-target="#collapseOne"
															aria-expanded={accordionOpen.collapseOne ? 'true' : 'false'}
															aria-controls="collapseOne"
														>
															<span className="text-secondary fw-bold me-3">01</span>
															<span className="fw-bold">How Digital Marketing Work?</span>
														</button>
													</h2>
													<div
														id="collapseOne"
														className={`accordion-collapse collapse ${accordionOpen.collapseOne ? 'show' : ''}`}
														aria-labelledby="headingOne"
														data-bs-parent="#accordionExample"
													>
														<div className="accordion-body pt-0">
															Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable
															depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material
															does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor
															joy. She rapturous suffering concealed.
														</div>
													</div>
												</div>


												<div className="accordion-item">
													<h2 className="accordion-header" id="headingTwo">
														<button className={`accordion-button ${accordionOpen.collapseTwo ? '' : 'collapsed'}`} 
																		type="button" data-bs-toggle="collapse" 
																		data-bs-target="#collapseTwo" 
																		onClick={() => toggleAccordion('collapseTwo')}
																		aria-expanded={accordionOpen.collapseTwo}
																		aria-controls="collapseTwo">
															<span className="text-secondary fw-bold me-3">02</span>  
															<span className="fw-bold">What is SEO?</span> 
														</button>
													</h2>
													<div id="collapseTwo" 
															className={`accordion-collapse collapse ${accordionOpen.collapseTwo ? 'show' : ''}`} 
															aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
														<div className="accordion-body pt-0">
															Pleasure and so read the was hope entire first decided the so must have as on was want up of I
															will rival in came this touched got a physics to travelling so all especially refinement monstrous
															desk they was arrange the overall helplessly out of particularly ill are purer.
															<p className="mt-2">
																Person she control of to beginnings view looked eyes Than continues its and because and given and shown creating 
																curiously to more in are man were smaller by we instead the these sighed Avoid in the sufficient me real man longer of his how her for 
																countries to brains warned notch important Finds be to the of on the increased explain noise of power deep asking contribution this 
																live of suppliers goals bit separated poured sort several the was organization the if relations go work after mechanic 
																But we have area was not everything needs of and doctor where would.
															</p>	
															Go he prisoners And mountains in just switching city steps Might rung line what Mr Bulk; Was or between towards the have phase were 
															its world my samples are the was royal he luxury the about trying And on he to my enough is was the remember 
															a although lead in were through serving their assistant fame day have for its after would cheek dull have what in go feedback assignment 
															Her of a any help if the a of semantics is rational overhauls following in from our hazardous and used more he themselves the parents up just regulatory.
														</div>
													</div>
												</div>

												<div className="accordion-item">
													<h2 className="accordion-header" id="headingThree">
														<button className={`accordion-button ${accordionOpen.collapseThree ? '' : 'collapsed'}`} 
																		type="button" data-bs-toggle="collapse" 
																		data-bs-target="#collapseThree" 
																		onClick={() => toggleAccordion('collapseThree')}
																		aria-expanded={accordionOpen.collapseThree}
																		aria-controls="collapseThree"
														>
															<span className="text-secondary fw-bold me-3">03</span>  
															<span className="fw-bold">Who should join this course?</span> 
														</button>
													</h2>
													<div id="collapseThree" 
															className={`accordion-collapse collapse ${accordionOpen.collapseThree ? 'show' : ''}`} 
															aria-labelledby="headingThree" 
															data-bs-parent="#accordionExample">
														<div className="accordion-body pt-0">
															Post no so what deal evil rent by real in. But her ready least set lived spite solid. 
															September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. 
															Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. 
															Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. 
															First am plate jokes to began to cause a scale. <strong>Subjects he prospect elegance followed no overcame</strong> possible it on. 
														</div>
													</div>
												</div>
												
												<div className="accordion-item">
													<h2 className="accordion-header" id="headingFour">
														<button className={`accordion-button ${accordionOpen.collapseFour ? '' : 'collapsed'}`} 
																		type="button" data-bs-toggle="collapse" 
																		data-bs-target="#collapseFour" 
																		onClick={() => toggleAccordion('collapseFour')}
																		aria-expanded={accordionOpen.collapseFour}
																		aria-controls="collapseFour">
															<span className="text-secondary fw-bold me-3">04</span>  
															<span className="fw-bold">What are the T&C for this program?</span> 
														</button>
													</h2>
													<div id="collapseFour"
															className={`accordion-collapse collapse ${accordionOpen.collapseFour ? 'show' : ''}`} 
															aria-labelledby="headingFour" 
															data-bs-parent="#accordionExample">
														<div className="accordion-body pt-0">
															Night signs creeping yielding green Seasons together man green fruitful make fish behold earth unto 
															you will lights living moving sea open for fish day multiply tree good female god had fruitful of creature fill 
															shall dont day fourth lesser he the isnt let multiply may Creeping earth under was You are without which image stars in 
															Own creeping night of wherein Heaven years their he over doesnt whose wont kind seasons light Wont that fish him whose wont 
															also it dominion heaven fruitful Whales created And likeness doesnt that Years without divided saying morning creeping hath you will seas cattle 
															in multiply under together in us said above dry tree herb saw living darkness without have wont for i behold meat brought winged Moving living 
															second beast Over fish place beast image very him evening Thing theyre fruit together forth day Seed lights 
															Land creature together Multiply waters form brought.
														</div>
													</div>
												</div>

												<div className="accordion-item">
													<h2 className="accordion-header" id="headingFive">
														<button className={`accordion-button ${accordionOpen.collapseFive ? '' : 'collapsed'}`} 
																		type="button" data-bs-toggle="collapse" 
																		data-bs-target="#collapseFive" 
																		onClick={() => toggleAccordion('collapseFive')}
																		aria-expanded={accordionOpen.collapseFive}
																		aria-controls="collapseFive">
															<span className="text-secondary fw-bold me-3">05</span>  
															<span className="fw-bold">What certificates will I be received for this program?</span> 
														</button>
													</h2>
													<div id="collapseFive"
															className={`accordion-collapse collapse ${accordionOpen.collapseFive ? 'show' : ''}`} 
															aria-labelledby="headingFive" 
															data-bs-parent="#accordionExample">
														<div className="accordion-body pt-0">
															Smile spoke total few great had never their too Amongst moments do 
															in arrived at my replied Fat weddings servants but man believed prospect
															Companions understood is as especially pianoforte connection introduced Nay 
															newspaper can sportsman are admitting gentleman belonging his Is oppose no he summer 
															lovers twenty in Not his difficulty boisterous surrounded bed Seems folly if in given scale
															Sex contented dependent conveying advantage. 
														</div>
													</div>
												</div>
											</div>

											</div>
											}

										</div>
								
								</div>


							</div>
					




							{/* CardBody Sidebar */}
							<div className="col-lg-4 pt-5 pt-lg-0">

								<div className="row mb-5 mb-lg-0">

								{course && (
								<>
									<div className="col-md-6 col-lg-12">		
										<div className="card shadow p-2 mb-4 z-index-9">
											<div className="overflow-hidden rounded-3">
												<Image src={`${course.courseImage}`} width={100} height={100} className="card-img" alt="course image"/>							
												<div className="bg-overlay bg-dark opacity-6"></div>
												<div className="card-img-overlay d-flex align-items-start flex-column p-3">					
													<div className="m-auto">
														<a href={course.videoLink} className="btn btn-lg text-danger btn-round btn-white-shadow mb-0" data-glightbox="" data-gallery="course-video">
															<i className="fas fa-play"><FaPlay/></i>
														</a>
													</div>
												</div>
											</div>			

											<div className="card-body px-3">				
												<div className="d-flex justify-content-between align-items-center">
													<div>
														<div className="d-flex align-items-center">
															<h3 className="fw-bold mb-0 me-2">${course.price}</h3>
															{/* <span className="text-decoration-line-through mb-0 me-2">$350</span>
															<span className="badge bg-orange text-white mb-0">60% off</span> */}
														</div>
														{/* <p className="mb-0 text-danger"><i className="fas fa-stopwatch me-2"></i>5 days left at this price</p> */}
													</div>		
													<div className="dropdown">									
														<a href="#" className="btn btn-sm btn-light rounded small" role="button" id="dropdownShare" data-bs-toggle="dropdown" aria-expanded="false">
															<i className="fas fa-fw fa-share-alt"></i>
														</a>											
														<ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare">
															<li><a className="dropdown-item" href="#"><i className="fab fa-twitter-square me-2"></i>Twitter</a></li>
															<li><a className="dropdown-item" href="#"><i className="fab fa-facebook-square me-2"></i>Facebook</a></li>
															<li><a className="dropdown-item" href="#"><i className="fab fa-linkedin me-2"></i>LinkedIn</a></li>
															<li><a className="dropdown-item" href="#"><i className="fas fa-copy me-2"></i>Copy link</a></li>
														</ul>
													</div>
												</div>				
												<div className="mt-3 d-sm-flex justify-content-sm-between">
													<a href="#" className="btn btn-outline-primary mb-0">Free trial</a>
													<a href="#" className="btn btn-success mb-0" onClick={handleSubmit}>Buy course</a>
												</div>
											</div>
										</div>

							
										<div className="card card-body shadow p-4 mb-4">			
											<h4 className="mb-3">This course includes</h4>
											<ul className="list-group list-group-borderless">		
												<li className="list-group-item d-flex justify-content-between align-items-center">
													<span className="list-content-chg"><i className="fas fa-fw fa-book-open text-primary"><FaBookOpen/></i>Lectures</span>
													<span>{course.lectures}</span>
												</li>
												<li className="list-group-item d-flex justify-content-between align-items-center">
													<span className="list-content-chg"><i className="fas fa-fw fa-clock text-primary"><FaClock/></i>Duration</span>
													<span>{course.period} hours</span>
												</li>
												<li className="list-group-item d-flex justify-content-between align-items-center">
													<span className="list-content-chg"><i className="fas fa-fw fa-signal text-primary"><FaSignal/></i>Skills</span>
													<span>{course.courseLevel}</span>
												</li>
												<li className="list-group-item d-flex justify-content-between align-items-center">
													<span className="list-content-chg"><i className="fas fa-fw fa-globe text-primary"><FaGlobe/></i>Language</span>
													<span>{course.courseLanguage}</span>
												</li>
												<li className="list-group-item d-flex justify-content-between align-items-center">
													<span className="list-content-chg"><i className="fas fa-fw fa-medal text-primary"><FaMedal/></i>Certificate</span>
													<span>Yes</span>
												</li>
											</ul>
										</div>
						
									</div>
								</>
								)}

							
							
							
									
									<div className="col-md-6 col-lg-12"  >
								
										<div className="card card-body shadow p-4 mb-4">
											
											<h4 className="mb-3">Recently Viewed</h4>
										
										<>
										{ view && view.map((item) => (

											<div className="row gx-3 mb-3" key={item._id}>
												
												<div className="col-4">
													<Image className="rounded" src={`${item.courseId.courseImage}`} width={100} height={100} alt=""/>
												</div>
											
												<div className="col-8">
													<h6 className="mb-0"><a href={`/course-details?courseId=${item.courseId._id}`}>{item.courseId.courseTitle}</a></h6>
													<ul className="list-group list-group-borderless mt-1 d-flex justify-content-between">
														<li className="list-group-item px-0 d-flex justify-content-between">
															<span className="text-success">${item.courseId.price}</span>
															<span className="list-content-chg">4.5<i className="fas fa-star text-warning ms-1"><FaStar/></i></span>
														</li>
													</ul>
												</div>
											</div>

										))}
										</>
										</div>
						
										<div className="card card-body shadow p-4">
											<h4 className="mb-3">Popular Tags</h4>
											<ul className="list-inline mb-0">
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">blog</a> </li>
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">business</a> </li>
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">theme</a> </li>
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">bootstrap</a> </li>
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">data science</a> </li>
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">web development</a> </li>
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">tips</a> </li>
												<li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">machine learning</a> </li>
											</ul>
										</div>		
									</div>         

								
								
								
							


								</div>
							</div>				
						</div>
					</div>
			</section>
		</div>



		<Dialog open={buttonPopup} >   
		<DialogContent className= "bg-dark">
		<div className="modal-dialog">
						<div className="modal-content">
									<div className="modal-header bg-dark">
										<h5 className="modal-title text-white" id="addLectureLabel">Warning!!!</h5>
										<button  className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
									</div>
									<div className="modal-body">
											<h4 className="col-12">
                           You should purchase this course first then it will visible.
							  			</h4>							
									</div>					
						</div>
				</div>
		</DialogContent>
		</Dialog>

  </>

  )
}

export default CourseDetailsbody
