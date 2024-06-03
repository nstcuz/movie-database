import Header from '../components/Header';
import Footer from '../components/Footer';
import { APP_FOLDER_NAME } from '../globals/globals';

// Pages
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavorites from '../pages/PageFavorites';
import PageSingleDetails from '../pages/PageSingleDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AppRouter() {
    return (
        // make sure to add this >basename="/cheeseboard-cinema"< before running npm run build AND do not forget to add your htaccess inside the dist
        <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="/" exact element={<PageHome />} />
                    <Route path="/about" element={<PageAbout />} />
                    <Route path="/favorites" element={<PageFavorites />} />
                    <Route path="/movie/:id" element={<PageSingleDetails/>} />
                    {/* <Route path="/" element={} /> */}
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;