import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import './landingAnimation.css';

const LandingAnimation = () => {
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!showAnimation) return null;

    return (
        <div className="landing-animation">
            <HashLoader
                color="#ff4e4e"
                size={100}
                speedMultiplier={1.2}
            />
        </div>
    );
};

export default LandingAnimation;
