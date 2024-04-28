import React, { useState } from 'react';
import './Services.css';
import pic1 from './Images/offer1.jpg';
import pic2 from './Images/offer2.jpg';
import pic3 from './Images/offer3.jpg';
import pic4 from './Images/offer4.jpg';
import pic5 from './Images/offer5.jpg';
import pic6 from './Images/offer6.jpg';
import mainImage from './Images/mainImage.jpg';

export default function Services() {
    const [startIndex, setStartIndex] = useState(0); // Index of the first visible offer
    const numVisibleOffers = 3; // Number of offers to show at a time
    const offers = [pic1, pic2, pic3, pic4, pic5, pic6]; // List of offer images

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleNext = () => {
        if (startIndex < offers.length - numVisibleOffers) {
            setStartIndex(startIndex + 1);
        }
    };

    return (
        <div>
            <section id="main-image" className="section">
                <div className="container">
                    <img src={mainImage} alt="Main Image" className="img-fluid" />
                </div>
            </section>
            <section id="offers" className="section">
                <div className="container">
                    <div className="row">
                        {offers.slice(startIndex, startIndex + numVisibleOffers).map((offer, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="text-center">
                                    <img src={offer} className="rounded" alt={`Offer ${index + 1}`} width="100%" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-outline-primary mr-2" onClick={handlePrev}>&lt;</button>
                        <button className="btn btn-outline-primary" onClick={handleNext}>&gt;</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
