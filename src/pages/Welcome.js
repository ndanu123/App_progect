import React from 'react'
import { Link } from 'react-router-dom'
import './welcome.css';

function Welcome() {
  return (
    <main className="welcome-main">
            <div className="welcome-content">
                <h1>Welcome to <span className="highlight">your Plume & Page</span></h1>
                <p>Your personal library,beautifully organized and always at your fingertips.</p>
                <p>Dive in, organize your collection, and let your passion for books truly flourish here. <bold>Happy Reading!</bold></p>
                <Link to="/library" className="btn">Start Your Library</Link>
            </div>
            <div className="welcome-image">
                
            </div>
    </main>
  )
}

export default Welcome