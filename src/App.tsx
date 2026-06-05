import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Footer } from '@/components/layout/Footer';
import { FavoriteToast } from '@/components/ui/FavoriteToast';
import { HomePage } from '@/pages/HomePage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { MovieDetailPage } from '@/pages/MovieDetailPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen w-full min-w-0 flex-col">
        <FavoriteToast />
        <Header />
        <div className="flex w-full min-w-0 flex-1 flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
