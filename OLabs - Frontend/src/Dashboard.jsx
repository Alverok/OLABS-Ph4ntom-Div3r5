import React from "react";
import "./dashboard.css";

// Import images from src/images/

import ill from "./images/ill.webp";
import chemistry from "./images/chemistry.webp";
import biology from "./images/bio.webp";
import maths from "./images/maths.webp";
import languages from "./images/languages.webp";
import science from "./images/science.webp";
import social from "./images/social science.webp";
import cs from "./images/cs.webp";
import ar3d from "./images/ar3d.webp";
import edp from "./images/edp.webp";
import isl from "./images/isl.webp";
import olabslogo from "./images/olabs-logo.png";
import bannerimage from "./images/banner-image.png";
import training from "./images/training.png";
import register from "./images/registered.png";
import download from "./images/download.png";
import labVideosImage from "./images/lab-videos.png";
import feat from "./images/featured-simulation.png";
import rform from "./images/register-form.png";




const subjects = [
  { name: "Physics", image: ill },
  { name: "Chemistry", image: chemistry },
  { name: "Biology", image: biology },
  { name: "Maths", image: maths },
  { name: "Language", image: languages },
  { name: "Science", image: science },
  { name: "Social Science", image: social },
  { name: "Computer", image: cs },
  { name: "3D/AR/VR", image: ar3d },
  { name: "EDP", image: edp },
  { name: "ISL", image: isl },
];

const Dashboard = () => {
  return (
    <div>
      <div className="zero-navbar">
        <div className="logo">
        <img src={olabslogo} alt="OLabs Logo" />
        </div>
        <div className="banner">
        <img src={bannerimage} alt="Banner" />  
        </div>
      </div>
      
      <div className="top-navbar">
        <div className="nav-links">
          <ul>
            <li>Home</li>
            <li><a href="#about-section">About</a></li>
            <li>In the news</li>
            <li>Workshops</li>
            <li>Training</li>
            <li>Download</li>
            <li>Contact us</li>
          </ul>
        </div>
      </div>
      
      <div className="main-content">
        <section className="subjects">
          {subjects.map((subject) => (
            <div className="subject-card" key={subject.name}>
            <img src={subject.image} alt={subject.name} />
            <h3>{subject.name}</h3>
          </div>
          
          ))}
        </section>
        {/* New OLabs Info Section */}
        <section className="olabs-info">
          <div className="training-reg">
            <img src={rform}  alt="Olabs Training Registration Form" />
          </div>
          <div className="featured-simulation">
            <h3>Featured Simulation</h3>
            <img src={feat} alt="Featured Simulation" />
            
          </div>
          
          <div className="schools-registered">
  <h3>Schools Registered with OLabs</h3>
  <div className="schools-registered">
  
  <div className="scroll-container">
    <ul className="scrolling-text">
      {[
        "Birla School Pilani, Rajasthan",
        "Kendriya Vidyalaya, Vijayanarayanam, Tamil Nadu",
        "Delhi Public School, Bidhanagar Durgapur, West Bengal",
        "Central Model School, West Bengal",
        "Navy Children School, Chanakyapuri, New Delhi",
        "Abhyasa International Residential School, Toopran",
        "Kendriya Vidyalaya Fort William, Kolkata, West Bengal",
        "Woodlem Park School; Ajman",
        "K.V No-2, Jhapatapur, Railway settlement, Kharagpur, West Bengal",
        "Kendriya Vidyalaya Zirakpur, Punjab",
        "Kendriya Vidyalaya No.2 Raipur Chhattisgarh",
        "Amrita Vidyalayam Bangalore",
        "S.G.K.C.H.S School, Susari, Dhar Madhya Pradesh",
        "University of the Philippines-Cebu (Lahug, Cebu City, Philippines)",
        "Nath Valley School, Aurangabad, Maharashtra",
        "Kendriya Vidyalaya Cachar, Assam",
        "Budding Buds School, Tinsukia, Assam",
        "Namchi Sr. Sec School, South Sikkim, Sikkim",
        "Kendriya Vidyalaya No-1, AirForce Station, Jodhpur, Rajasthan",
        "Jawahar Navoday Vidyalay, Hosangabad, Madhya Pradesh",
      ].map((school, index) => (
        <li key={index}>{school}</li>
      ))}
      {/* Duplicate the list to create infinite scrolling effect */}
      {[
        "Birla School Pilani, Rajasthan",
        "Kendriya Vidyalaya, Vijayanarayanam, Tamil Nadu",
        "Delhi Public School, Bidhanagar Durgapur, West Bengal",
        "Central Model School, West Bengal",
        "Navy Children School, Chanakyapuri, New Delhi",
        "Abhyasa International Residential School, Toopran",
        "Kendriya Vidyalaya Fort William, Kolkata, West Bengal",
        "Woodlem Park School; Ajman",
        "K.V No-2, Jhapatapur, Railway settlement, Kharagpur, West Bengal",
        "Kendriya Vidyalaya Zirakpur, Punjab",
        "Kendriya Vidyalaya No.2 Raipur Chhattisgarh",
        "Amrita Vidyalayam Bangalore",
        "S.G.K.C.H.S School, Susari, Dhar Madhya Pradesh",
        "University of the Philippines-Cebu (Lahug, Cebu City, Philippines)",
        "Nath Valley School, Aurangabad, Maharashtra",
        "Kendriya Vidyalaya Cachar, Assam",
        "Budding Buds School, Tinsukia, Assam",
        "Namchi Sr. Sec School, South Sikkim, Sikkim",
        "Kendriya Vidyalaya No-1, AirForce Station, Jodhpur, Rajasthan",
        "Jawahar Navoday Vidyalay, Hosangabad, Madhya Pradesh",
      ].map((school, index) => (
        <li key={`duplicate-${index}`}>{school}</li>
      ))}
    </ul>
  </div>
</div>

</div>

<div className="lab-videos">
          <h3>Lab Videos</h3>
  <a 
    href="https://www.youtube.com/playlist?list=PLCADAD35473520E06" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <img src={labVideosImage} alt="Lab Videos" />
  </a>
          </div>
          <div className="stats">
            <div className="users">
              <img  src={register} alt="Users" />
              <p>Registered</p>
            </div>
            <div className="training">
              <img src={training}  alt="Training" />
              <p>Teachers & Schools</p>
            </div>
            <div className="mobile-app">
              <img src = {download} alt="Mobile App" />
              <p>Download Olabs android app here</p>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about-section" className="about">
          <h2>About OLabs</h2>
          <p>
            The OLabs is based on the idea that lab experiments can be taught using the Internet, more efficiently and less expensively. 
            The labs can also be made available to students with no access to physical labs or where equipment is not available due to 
            being scarce or costly. This helps them compete with students in better-equipped schools and bridges the digital divide 
            and geographical distances. The experiments can be accessed anytime and anywhere, overcoming the constraints on time 
            felt when having access to the physical lab for only a short period.
          </p>
          <p>
            <strong>Features include:</strong>
          </p>
          <ul>
            <li>Content aligned to NCERT/CBSE and State Board Syllabus.</li>
            <li>Physics, Chemistry, Biology Labs from Class 9 to Class 12. English and Maths lessons for Class 9 and 10.</li>
            <li>Interactive simulations, animations, and lab videos.</li>
            <li>The ability to perform, record, and learn experiments - anywhere, anytime.</li>
            <li>The 'learning-enabled assessment' through OLabs facilitates procedural skills, conceptual understanding, and reporting skills.</li>
          </ul>
          <p>
            The development of OLabs includes the study and use of mathematical techniques to demonstrate various complex functions in science. 
            The labs use cutting-edge simulation technology to create real-world lab environments. Thorough research is done by personnel 
            for better understanding of experimental procedures. Simulations are made interactive using various tools, thus recreating 
            a real lab environment.
          </p>
          <p>
            The OLabs are hosted at <a href="https://www.olabs.edu.in" target="_blank" rel="noopener noreferrer">www.olabs.edu.in</a>. 
            Access to OLabs is free for Schools upon registration.
          </p>
        </section>
      </div>
      {/* Footer */}
      <footer>
        <p>
          Developed by Amrita Vishwa Vidyapeetham & CDAC Mumbai. Funded by MeitY
          (Ministry of Electronics & Information Technology)
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;