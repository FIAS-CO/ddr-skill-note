import * as React from 'react';
import { useParams } from 'react-router-dom';


const SongDetailPage: React.FC = () => {

    const { songId } = useParams<{ songId: string }>();
    return (

        <h1 className="text-2xl sm:text-3xl font-bold text-center flex-grow">
            {songId} さんの
        </h1>
    );
}

export default SongDetailPage;