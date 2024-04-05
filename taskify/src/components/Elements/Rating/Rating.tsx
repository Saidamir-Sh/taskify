import React, { useState } from 'react';

interface RatingProps {
    totalRate: number;
    onChange: (e: number) => void;
}

export const Rating: React.FC<RatingProps> = ({ totalRate,onChange }) => {
    const [rating, setRating] = useState<number>(0);
    const [hoverRate, setHoverRate] = useState<number>(0);

    const handleOnChange = (value: number) => {
        setRating(value);
        onChange(value);
    }

    return (
        <div>
            {[...Array(totalRate)].map((_, index) => {
                const currentRating = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            className="hidden"
                            value={currentRating}
                            onChange={() => handleOnChange(currentRating)}
                        />
                        <span
                            className={`text-3xl cursor-pointer ${currentRating <= (hoverRate || rating)? 'text-yellow-400' : 'text-neutral-400'}`}
                            onMouseEnter={() => setHoverRate(currentRating)}
                            onMouseLeave={() => setHoverRate(0)}
                        >
                            &#9733;
                        </span>
                    </label>
                );
            })}
        </div>
    );
};
