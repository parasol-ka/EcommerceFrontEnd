import { Link } from 'react-router-dom';

/**
 * 
 * @returns A simple 404 error page component that displays an error message if URL is not valid.
 */

const Page404 = () => (
    <div className="text-center mt-5 p-4">
        <h2 className="text-danger">An error has occurred!</h2>
        <img src="https://res.cloudinary.com/dxxpja0jo/image/upload/v1749118303/404_wlakd2.jpg" alt="sad cat meme" />
        <p>Unable to find this page!</p>
        <Link to="/">Click here to go on Home Page</Link>
    </div>
);

export default Page404;
