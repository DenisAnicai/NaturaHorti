import React from "react";

export const RecommendedPercentage = ({rating}: { rating: any }) => {
    if (!rating) {
        rating = 0;
    }
    rating = Number(rating);
    const recommendedPercentage = (rating * 100 / 5).toFixed(0);

    return (
        <div className="recommended-percentage">
            <span className="fw-semibold">{recommendedPercentage}%</span>
            <span className="text-secondary"> recomanda acest produs</span>
        </div>
    );
}