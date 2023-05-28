import React from "react";

export const Rating = ({rating, numReviews}: { rating: any, numReviews: number }) => {

    rating = Number(rating);

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i className="fa-solid fa-star" key={i} style={{color: "#f0bc00"}}/>);
        }

        if (hasHalfStar) {
            stars.push(<i className="fa-solid fa-star-half-stroke" key={fullStars} style={{color: "#f0bc00"}}/>);
        }

        const remainingStars = 5 - stars.length;
        for (let i = 1; i <= remainingStars; i++) {
            stars.push(<i className="fa-regular fa-star" key={fullStars + i} style={{color: "#f0bc00"}}/>);
        }

        return stars;
    };

    return (
        <div className="mb-4 py-2" style={{height: "1.5rem"}}>
            {renderStars()} <span className="fw-semibold">{rating}</span>
            <span className="text-secondary"> ({numReviews})</span>
        </div>
    );
};