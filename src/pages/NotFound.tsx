import { Link } from 'react-router';

export function NotFound() {
    return (
        <div className="h-[85dvh] flex flex-col justify-center items-center">
            <p className="text-9xl">404</p>
            <p className="text-2xl">Not Found</p>
            <Link
                to="/"
                className="mt-4 px-6 py-2 font-semibold bg-main text-white rounded-xl cursor-pointer"
                role="button"
            >
                Back to Home
            </Link>
        </div>
    );
}
