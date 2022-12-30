import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div className="footer__titles">
            <h1 className="footer__title">TrainMe</h1>
            <span className="footer__subtitle">App with ours trainers</span>
          </div>
          <ul className="footer__links">
            <li>
              <Link to="/" className="footer__link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/trainers" className="footer__link">
                Our Trainers
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="footer__link">
                Contacts
              </Link>
            </li>
          </ul>
        </div>
        <p className="footer__copy">&#169; All right reserved.</p>
      </div>
    </div>
  );
};
