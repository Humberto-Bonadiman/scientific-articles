import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArticlesContextProvider } from './context/ArticlesContext';

function App() {
  return (
    <ArticlesContextProvider>
      <AppRoutes />
    </ArticlesContextProvider>
  );
}

export default App;