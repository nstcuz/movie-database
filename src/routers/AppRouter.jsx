import Header from '../components/Header';

// Pages
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavorites from '../pages/PageFavorites';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AppRouter() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header />
                    <Routes>
                        <Route path="/" exact element={<PageHome />} />
                        <Route path="/about" element={<PageAbout />} />
                        <Route path="/favorites" element={<PageFavorites />} />
                    </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;