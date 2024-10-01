import React from 'react';

// Spinner Component
const Spinner = () => {
    return (
        <div className='spinner-container'>
            <div className='spinner'></div>
        </div>
    );
};

// CSS styles as a string
const styles = `
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Adjust based on your layout */
}

.spinner {
    border: 8px solid rgba(255, 255, 255, 0.3); /* Light border */
    border-top: 8px solid #3498db; /* Primary color */
    border-radius: 50%;
    width: 50px; /* Adjust size */
    height: 50px; /* Adjust size */
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Create a style tag and append styles
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);

export default Spinner;
