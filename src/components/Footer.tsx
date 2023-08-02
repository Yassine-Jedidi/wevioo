import { MDBFooter, MDBIcon } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Social media links */}
        <div className="me-5 d-none d-lg-block">
          <span>Rejoignez-nous sur les réseaux sociaux :</span>
        </div>

        <div>
          <a
            href="https://www.facebook.com/WeviooGroup/"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a
            href="https://www.instagram.com/wevioolife/"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="instagram" />
          </a>
          <a
            href="https://www.linkedin.com/company/wevioo/"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="linkedin" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCMupyJEe6LcCwjGSDcPMXWA"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="youtube" />
          </a>
          <a href="https://www.wevioo.com/" className="me-4 text-reset">
            <MDBIcon fas icon="building" />
          </a>
        </div>
      </section>

      {/* Copyright */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © {new Date().getFullYear()} Copyright: Yassine Jedidi
      </div>
    </MDBFooter>
  );
}
