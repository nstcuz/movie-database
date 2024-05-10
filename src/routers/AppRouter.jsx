import Header from '../components/Header';
import Footer from '../components/Footer';

// Pages
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavorites from '../pages/PageFavorites';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleDetail from '../pages/PageSingleDetail';

function AppRouter() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="/" exact element={<PageHome />} />
                    <Route path="/about" element={<PageAbout />} />
                    <Route path="/favorites" element={<PageFavorites />} />
                    {/* <Route path="/" element={} /> */}
                    <Route path="/movie-detail" element={<SingleDetail />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;