import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Animation sequence takes ~2 seconds (last element starts at 1s + 0.8s animation duration)
        // We'll wait a bit more (3 seconds) to let the user enjoy the animation
        const timer = setTimeout(() => {
            setFadeOut(true);
            // After fade out animation completes (1s transition in CSS), notify parent
            setTimeout(() => {
                if (onFinish) onFinish();
            }, 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
            <div className="splash-content">
                <div className="splash-assistance">Assistance</div>
                <div className="splash-from">from</div>
                <div className="splash-researchers">Researchers</div>
            </div>
        </div>
    );
};

export default SplashScreen;
