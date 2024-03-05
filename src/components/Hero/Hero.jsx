import React from "react";

const Hero = () =>{
    return(
        <section className="hero-wrapper">
            <div className="paddings innerWidth hero-container flexCenter"></div>
                <div className="hero-left">
                    Left Section
                </div>
                <div className="flexCenter hero-right">
                    <div className="image-container">
                        <img src="./hero-image.png" alt="" />
                    </div>
                </div>
        </section>
    );
}
export default Hero;