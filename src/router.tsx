import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router';
import App from '@/App';
import { Today } from '@/pages/Today';
import { Inbox } from '@/pages/Inbox';
import { Upcoming } from '@/pages/Upcoming';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Today />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="*" element={<p>404 Not Found</p>} />
        </Route>
    )
);
