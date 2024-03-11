import React from 'react';
import './GetStarted.css';

const GetStarted = () =>{
    return(
        <section className="g-wrapper">
            <div className="paddings innerWidth g-container">
                <div className="flexColCenter inner-container">
                    <span className="primaryText">Get Started with Homyz</span>
                    <span className="secondaryText">
                        Subscribe and get attractive prices price quotes from Homyz
                        <br />
                        Find your residence soon
                    </span>
                    <button className="button">
                        <a href="mailto:tototeambuilder@gmail.com">Get Started</a>
                    </button>
                </div>
            </div>
        </section>
    );
}
export default GetStarted;