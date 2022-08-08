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
import { doc, getDoc } from "firebase/firestore";
import { database, storage } from '../firebase/firebaseConfig'
import DataService from '../firebase/firebaseOperations'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {VscServerProcess} from 'react-icons/vsc';


function CompDashboard() {
  const [display, setdisplay] = useState(false);
  const navigate = useHistory();
  const [users, setusers] = useState({});
  const [photo, setphoto] = useState("");
  const [databasesearch, setdatabasesearch] = useState("");
  const [data, setdata] = useState({});

  useEffect(() =>
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setusers(user);
        // console.log();
        setphoto(user.photoURL);
        setdatabasesearch(user.email.split('@')[0]);
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
  const [companyname, setcompanyname] = useState("");

  const getuser = async (usr) => {
    const docRef = doc(database, "company", usr);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setdata(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }



  return (
    <>
      {display ? navigate.push("/companylogin") :
        <main class="main">
          <nav class="nav">
            <div class="burger-menu">
              <FaBars />
            </div>
            <div class="top">
              <a href="#" class="navbar-logo">
                <img src={photo} class="navbar-brand" />
              </a>
              <ul class="navigation navbar-top" style={{ marginTop: "50px" }}>
                <li class="item">
                  <a class="" onClick={() => { window.location.reload() }} href="#"><AiFillHome size={25} /></a>
                </li>
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
                <form>
                  <h4 style={{ color: "black" }}>Welcome , {users.displayName} {"->"} lets hire for {data.companyname}</h4>
                </form>
              </div>

              <div class="analytics section-border-radius">
                <h3 class="section-header">Analytics</h3>
                <div class="list-analytics">
                  <div class="analytic a">
                    <span class="icon">
                      <RiShoppingBag2Fill size={30} color={"black"} />
                    </span>
                    <h3 class="num" style={{ color: "purple" }}>9</h3>
                    <p class="desc" style={{ color: "black" }}>Jobs Posted</p>
                  </div>
                  <div class="analytic b">
                    <span class="icon">
                      <TiTick size={40} color={"black"} />
                    </span>
                    <h3 class="num" style={{ color: "purple" }}>0</h3>
                    <p class="desc" style={{ color: "black" }}>Student Hired</p>
                    <span class="percent up">
                      <i class="fas fa-caret-up"></i>
                      <span class="value">Hiring Ratio : 0%</span>
                    </span>
                  </div>
                  <div class="analytic b">
                    <span class="icon">
                      <VscServerProcess size={40} color={"black"} />
                    </span>
                    <h3 class="num" style={{ color: "purple" }}>1</h3>
                    <p class="desc" style={{ color: "black" }}>Student In Process</p>
                  </div>
                </div>
              </div>


              <div class="message section-border-radius">
                <p class="text">
                  Want Only Selected Students.
                </p>
                <Link to={"/jobs"}><button class="btn-discover">Placed Permium ⭐</button>
                </Link>
              </div>


              <div class="apps-features">


                <div class="apps">
                  <h3 class="section-header">Interview Taken</h3>
                  <div class="list-apps section-padding section-border-radius">
                    <div class="app">
                      <div class="desc">
                        <span class="icon"><i class="fab fa-facebook" style={{ color: "black" }}></i></span>
                        <h3 class="name" style={{ color: "black" }}>Anil Sharma</h3>
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
                        <h3 class="name" style={{ color: "black" }}>Priya Mehta</h3>
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
                  <h3 class="section-header">Selected Students</h3>
                  <div class="feature section-padding section-border-radius">
                    <div style={{ alignItems: 'center' }} class="price-container">
                      <h5 style={{ color: "green" }}>Anil Sharma</h5>
                      <button className='btn' style={{ marginLeft: '20px' }}> <a href={data.resume} download={"true"}>Resume</a></button>
                      <button className='btn' style={{ marginLeft: '20px' }}> <a href={data.cover} download={"true"}>Cover</a></button>
                    </div>
                    <span style={{ color: 'green', fontWeight: '600' }}>Want to give Offer letter?</span>
                    <input type={"file"} accept={".pdf"} onChange={(e) => {
                      const offerref = ref(storage, `files/${e.target.files[0].name}`);
                      uploadBytes(offerref, e.target.files[0]).then(async (snapshot) => {

                        const val = await getDownloadURL(snapshot.ref);
                        await DataService.updateData("user", "pranshujain0221", { offer: val });
                        alert("Done ...");
                      });
                    }
                    } />
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

export default CompDashboard;