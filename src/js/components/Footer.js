import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <ul className="icon-social">
          <li className="facebook">
            <a href="https://github.com/bayujuara01">
              <i className="fab fa-github-square fa-2x"></i>
            </a>
          </li>
          <li className="twitter">
            <a href="https://www.linkedin.com/in/bayu-ariefyanto">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </li>
          <li className="instagram">
            <a href="https://instagram.com/ariefyantobayu">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </li>
        </ul>
        <div className="tel-fax-mail">
          <ul>
            <li>
              <span>Create With ❤️ By</span> Bayujuara01
            </li>
          </ul>
        </div>
        <div className="ft-bottom">
          <span>Copyright © 2020 All Rights Reserved </span>
        </div>
      </div>
    </footer>
  );
}
