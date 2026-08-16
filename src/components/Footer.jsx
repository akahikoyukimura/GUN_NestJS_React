import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center ">
          <hr></hr>
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6 ">
            <p className="mb-3 mb-md-0">
              {" "}
              <a
                className="text-decoration-none text-reset"
                href="/term.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </a>{" "}
              |{" "}
              <a
                className="text-decoration-none text-reset"
                href="/term.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              |{" "}
              <a
                className="text-decoration-none text-reset"
                href="/term.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </p>
            <a
              className="text-dark fs-4"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-github"></i>
            </a>
            <p className="custom-text-italic-small ">©
          2026 — Gun Shop. This website is a illegal gun shop. All products are
          not intended for lawful use only. Customers are responsible for
          ensuring that their purchases and use of products comply with the laws
          and regulations applicable in their location.
        </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
