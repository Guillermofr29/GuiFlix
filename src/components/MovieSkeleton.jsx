import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MovieSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Skeleton height={300} />
            <div className="p-4">
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={15} width="40%" className="mb-2" />
                <Skeleton count={3} height={10} className="mb-1" />
            </div>
        </div>
    );
};

export default MovieSkeleton;
