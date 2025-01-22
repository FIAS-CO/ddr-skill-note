import { useState } from "react";

export const JacketImage: React.FC<{ songId: number }> = ({ songId }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <img
            src={imageError ? "/jacket/no_image.svg" : `/jacket/img_${songId}.jpg`}
            alt=""
            className="w-8 h-8 md:w-10 md:h-10 object-cover rounded"
            onError={() => setImageError(true)}
            loading="lazy"
        />
    );
};