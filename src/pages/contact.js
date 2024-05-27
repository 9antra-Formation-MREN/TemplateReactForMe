import React from 'react'
import '../css/homepage.css';
import '../css/training.css';
import '../css/contact.css';
import { Phone, Mail, MapPin } from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import Train from '../img/section/SAB.png';
import Footer from '../component/footer';
import Header from '../component/header';
import SearchBar from '../component/searchbar';

function Contact() {
  return (
    <>
    <div className="searchcour"><SearchBar></SearchBar></div>
    <Header/>
    <div className='title-event mt-5'>
      <h1> Contant Us</h1>
    
     </div>
    <div className="pict">
        <img src={Train} alt="Tailored Course Recommendations" />
      </div>
      <div className="contact-us section" id="contact">
    <div className="container">
        <div className="row">
            <div className="col-lg-6 align-self-center">
                <div className="section-heading">
                    <h1>Contact Us</h1>
                    <h2>Feel Free To Contact Us Anytime</h2>
                    <div className="contact-info">
                        <div className="info-item">
                            <span className="icon-container">
                                <Phone className="iconcontact" />
                            </span>
                            <div className='info'> +216 58 545 654</div>
                        </div>
                        <div className="info-item">
                            <span className="icon-container">
                                <Mail className="iconcontact" />
                            </span>
                            <div className='info'> for.me@gmail.com</div>
                        </div>
                        <div className="info-item">
                            <span className="icon-container">
                                <MapPin className="iconcontact" />
                            </span>
                            <div className='info'>EL Ghazela, Technopole el ghazela</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="contact-us-content">
                    <form id="contact-form" action="" method="post">
                        <div className="row">
                            <div className="col-lg-12">
                                <fieldset>
                                    <input type="text" name="name" id="name" placeholder="Enter your name" autoComplete="on" required />
                                </fieldset>
                            </div>
                            <div className="col-lg-12">
                                <fieldset>
                                    <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Enter your address" required />
                                </fieldset>
                            </div>
                            <div className="col-lg-12">
                                <fieldset>
                                    <textarea name="message" id="message" placeholder="Your message"></textarea>
                                </fieldset>
                            </div>
                            <div className="col-lg-12">
                                <fieldset>
                                    <button type="submit" id="form-submit" className="orange-button">Send message now</button>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

            <Footer/>
    </>
  )
}

export default Contact
