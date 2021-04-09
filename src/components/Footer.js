import React from 'react';
import './footer.css';
import { faFacebook,faTwitter,faLinkedin,faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
    return (
        <>
            <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-9">
            <h6>About</h6>
            <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
          </div>

          {/* <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
              <li><a href="http://scanfcode.com/category/android/">Android</a></li>
              <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
            </ul>
          </div> */}

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
            <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Home</a></li>
              <li><a href="http://scanfcode.com/about/">Book</a></li>
              <li><a href="http://scanfcode.com/contact/">Dashboard</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Logout</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2017 All Rights Reserved by 
         <a href="#">Scanfcode</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
              <li><a class="twitter" href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a class="dribbble" href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
              <li><a class="linkedin" href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
        </>
    )
}

export default Footer
