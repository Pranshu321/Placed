import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Auth from '../Auth/Auth'
import { FaBars } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { RiLogoutBoxLine, RiShoppingBag2Fill } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {storage , database} from '../firebase/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import DataService from '../firebase/firebaseOperations'
import { doc, getDoc } from "firebase/firestore";


function Dashboard() {
  const [display, setdisplay] = useState(false);
  const navigate = useHistory();
  const [users, setusers] = useState({});
  const [resume, setresume] = useState();
  const [cover, setcover] = useState();
  const [data , setdata] = useState({});
  const [databasesearch , setdatabasesearch] = useState("");

  const [image, setImage] = useState("https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg")

  const uploadThings =  async (e) => {
    e.preventDefault();
    let ResumeUrl = URL.createObjectURL(resume);
    let CoverUrl = URL.createObjectURL(cover);
    const ResumeRef = ref(storage,`files/${resume.name}`);
    const CoverRef = ref(storage,`files/${cover.name}`);
    uploadBytes(ResumeRef, resume).then(async (snapshot) => {
      
      const val = await getDownloadURL(snapshot.ref);
      await DataService.updateData("company", "pranshujain0111" , {resume : val});
      alert("Done ...");
    });
    uploadBytes(CoverRef, cover).then(async (snapshot) => {
      
      const val = await getDownloadURL(snapshot.ref);
      await DataService.updateData("company", "pranshujain0111" , {cover : val});
    });
   }
  useEffect(() =>
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setusers(user);
        const st = user.email.split('@')[0];
        setdatabasesearch(st);
        
        setdisplay(false);
        // ...
      } else {
        // User is signed out
        setdisplay(true);
        // ...
      }
    })

    , []);

    useEffect(() => {
      getuser(databasesearch);
    });
   
    const getuser = async (usr) => {
      const docRef = doc(database, "user", usr);
      const docSnap = await getDoc(docRef);
   
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setdata(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
   
    }



  return (
    <>
      {display ? navigate.push("/login") :
        <main class="main">
          <nav class="nav">
            <div class="burger-menu">
              <FaBars />
            </div>
            <div class="top">
              <a href="#" class="navbar-logo">
                <img src={users.photoURL} class="navbar-brand" />
              </a>
              <ul class="navigation navbar-top" style={{ marginTop: "50px" }}>
                <li class="item">
                  <a class="" onClick={() => { window.location.reload() }} href="#"><AiFillHome size={25} /></a>
                </li>
                <Link to={"/jobs"}><li class="item" style={{ marginTop: '3rem' }}>
                  <a><RiShoppingBag2Fill size={25} /></a>
                </li>
                </Link>
              </ul>
            </div>
            <div class="bottom">
              <ul class="navigation">
                <li class="item">
                  <a class="" onClick={() => { auth.signOut() }} href="#"><RiLogoutBoxLine size={25} /></a>
                </li>
              </ul>
              <a href="#" class="navbar-user">
              </a>
            </div>
          </nav>
          <div class="content">

            <div class="container">

              <div class="head section-border-radius">
                <form onSubmit={uploadThings}>
                  <h4 style={{ color: "black" , marginRight: '3rem'}}>Welcome <span style={{ color: '#725CDA' }}>{data.Name}</span> </h4>
                  <label htmlFor='resume' style={{ color: 'purple' }}>
                    Resume
                    <input id='resume' name='resume' type={"file"} accept={".pdf"} required="true" onChange={(e) => {
                      setresume(e.target.files[0])
                    }} />
                  </label>
                  <label htmlFor='cover' style={{ color: 'purple' }}>
                    CoverLetter
                    <input id='cover' name='cover' type={"file"} accept={".pdf"} required={"true"} onChange={(e) => setcover(e.target.files[0])} />
                  </label>
                  <button class="btn">Upload</button>
                </form>
              </div>

              <div class="analytics section-border-radius">
                <h3 class="section-header">Job Overview</h3>
                <div class="list-analytics">
                  <div class="analytic a">
                    <span class="icon">
                      <RiShoppingBag2Fill size={30} color={"black"} />
                    </span>
                    <h3 class="num" style={{ color: "purple" }}>35 </h3>
                    <p class="desc" style={{ color: "black" }}>Jobs Viewed</p>
                  </div>
                  <div class="analytic b">
                    <span class="icon">
                      <TiTick size={40} color={"black"} />
                    </span>
                    <h3 class="num" style={{ color: "purple" }}>4</h3>
                    <p class="desc" style={{ color: "black" }}>Jobs Applied</p>
                    <span class="percent up">
                      <i class="fas fa-caret-up"></i>
                      <span class="value">Success Ratio : 50%</span>
                    </span>
                  </div>
                </div>
              </div>


              <div class="message section-border-radius">
                <p class="text">
                  Explore Latest Jobs By Companies.
                </p>
                <Link to={"/jobs"}><button class="btn-discover">Discover</button>
                </Link>
              </div>


              <div class="events-calendar">


                <div class="events">
                  <h3 class="section-header">Feedbacks</h3>
                  <div class="list-events">
                    <div class="event">
                      <h4 class="title green">Website Redesign</h4>
                      <div class="sub-title">
                        <i class="fas fa-calendar"></i>
                        <h3 style={{ color: "black" }}>Frontend Developer</h3>
                      </div>
                      <p class="description">
                        “First, we would like to thank you for participating in our interview process and for all the time and work that you put into it. Unfortunately, we will not be moving forward with your application.

                        We have made this decision after a lot of deliberation. We felt that some of your responses did not meet the standards we were looking for.

                        We were highly impressed by the strategy method you proposed to solve the customer case issue during the interview. The readiness and presence of mind you showcased earned you great respect from all the interviewers. We also saw a passion and zeal in you for the job, which is always great to see.

                        However, what we felt lacking were concrete examples of dispute management. This job will require you to manage angry customers and burned-out coworkers. We could sense that you are not too experienced in this area. If you could earn some experience in this area, you would be a great asset to our organization.

                        Overall, you proved to be a promising candidate, and you were among our top choices. But we do not think you would be a good fit for the role until you earn some more experience in dispute management. In addition, we would recommend you to be more involved with customer service teams in your current organization to have an insight into their work.”
                      </p>
                      <div class="person">
                        <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                        <span>Alfred Nikon</span>
                      </div>
                      <div class="time">
                        <i class="fas fa-calendar icon"></i>
                        <span class="text">Interview Given:</span>
                        <span class="date">08 Aug 2022</span>
                      </div>
                    </div>

                    <div class="event">
                      <h4 class="title orange">Synopsis</h4>
                      <div class="sub-title">
                        <h3 style={{ color: "black" }}>QA Engineer</h3>
                      </div>
                      <p class="description">
                        “Thank you for taking the time to attend the interview for QA Engineer at Synopsis. It was indeed a pleasure meeting and learning about your remarkable skills and accomplishments.

                        Unfortunately, you are not selected for further consideration for the job.

                        I want to remind you that the competition for the job was very strong, and we had more than 500 candidates applying for the job. You should be proud that you made it so far, as you were one of the most promising candidates in the talent pool.

                        While we were impressed by your qualifications and enthusiasm for the role, we felt you were not better prepared for the interview. Your responses felt like guesses, and we didn’t think that you were confident about your answers.

                        We hope you work on your interview preparation skills and confidence because you are a talented and qualified individual. We will be keeping your resume on file for future job openings that fit your profile, and if anything comes up, we will surely contact you.

                        Thank you again for your interest in [organization name], and we wish you luck in your future endeavors.”
                      </p>
                      <div class="person">
                        <img src="https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        <span>Sebastian Mathew</span>
                      </div>
                      <div class="time">
                        <i class="fas fa-calendar icon"></i>
                        <span class="text">Interview Given:</span>
                        <span class="date">01 Aug 2022</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="apps-features">


                <div class="apps">
                  <h3 class="section-header">Interview History</h3>
                  <div class="list-apps section-padding section-border-radius">
                    <div class="app">
                      <div class="desc">
                        <span class="icon"><i class="fab fa-facebook" style={{ color: "black" }}></i></span>
                        <h3 class="name" style={{ color: "black" }}>Website Redesign</h3>
                      </div>
                      <div class="type">
                        <span class="icon"><i class="fab fa-android"></i></span>
                        <h3 class="name" style={{ color: "black" }}>Frontend Developer</h3>
                      </div>
                      <h4 class="time" style={{ color: "black" }}>32.35 min</h4>
                      <div class="btn-cont">
                        <a href="#" class="btn-view">View <i class="fas fa-caret-right"></i></a>
                      </div>
                    </div>
                    <div class="app">
                      <div class="desc">
                        <span class="icon"><i class="fab fa-twitter"></i></span>
                        <h3 class="name" style={{ color: "black" }}>Synopsis</h3>
                      </div>
                      <div class="type">
                        <span class="icon"><i class="fab fa-android"></i></span>
                        <h3 class="name" style={{ color: "black" }}>QA Engineer</h3>
                      </div>
                      <h4 class="time" style={{ color: "black" }}>53.23 min</h4>
                      <div class="btn-cont">
                        <a href="#" class="btn-view">View <i class="fas fa-caret-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="features">
                  <h3 class="section-header">Offer Letter</h3>
                  <div class="feature section-padding section-border-radius">
                    <div class="price-container" style={{alignItems: 'center'}}>
                      { data.email=="pranshujain0221@gmail.com" ? <>
                      <h5 style={{ color: "green" }}>Parentheses : </h5>
                      <button class="btn" style={{marginLeft: '20px'}}><a  target="blank" href={data.offer} >Offer Letter</a></button>
                      </> :
                      <h4 style={{color: 'red'}}>No Offers</h4>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div class="footer section-padding section-border-radius">
                <ul class="links">
                  {/* <li><a href="#">Projects</a></li>
                <li><a href="#">Statistics</a></li>
                <li><a href="#">Features</a></li> */}
                </ul>
                <p class="copyright">
                  All rights &copy; are reserved for <span>Placed.inc</span>.
                </p>
              </div>

            </div>
          </div>
        </main>
      }
    </>

  );
}

export default Dashboard;