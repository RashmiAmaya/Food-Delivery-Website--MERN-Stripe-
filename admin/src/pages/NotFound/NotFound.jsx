import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-icon-wrapper">
          <div className="error-icon">
            <svg className="h-16 w-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 9.5V13.5" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 17.5L14 17.6" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 14C3 8.02944 7.02944 4 13 4C18.9706 4 23 8.02944 23 14C23 19.9706 18.9706 24 13 24C7.02944 24 3 19.9706 3 14Z" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <h1 className="not-found-title">404 - Page not found</h1>
        <p className="not-found-text">
          The page you are looking for doesn't exist or<br />has been removed.
        </p>
        <Link to="/" className="back-button" style={{ backgroundColor: '#dc2626' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
