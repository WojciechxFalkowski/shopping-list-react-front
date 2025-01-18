import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ShoppingListContainer from './components/ShoppingListContainer';
import ShoppingListDetails from './components/ShoppingListDetails'; // Dodaj ten nowy komponent szczegółów listy
import Sidebar from './components/Sidebar';
import ROUTES from './routes';
import BurgerIcon from './components/BurgerIcon';
import ShoppingListManageUser from './components/pages/ShoppingListManageUser';
import GenerateListByText from './components/pages/GenerateListByText';
import ReceiptsPage from './components/pages/ReceiptsPage';
import AddReceiptPage from './components/pages/AddReceiptPage';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setToken(null);
  // };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex mx-auto">
        {!token ? (
          <AuthForm onLogin={handleLogin} />
        ) : (
          <>
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={toggleSidebar}
              setToken={setToken}
            />

            <div className="flex-grow md:px-0">
              <div className="container p-2 m-auto">
                <div className="flex justify-between items-center mb-2 lg:hidden">
                  {/* <h1 className="text-2xl font-bold">Shopping Lists</h1> */}
                  {/* <LogoutButton onClick={handleLogout} /> */}
                  <div></div>

                  <button
                    className="text-lg font-semibold z-20"
                    onClick={toggleSidebar}
                  >
                    <BurgerIcon isOpen={isSidebarOpen} />
                  </button>
                </div>

                <Routes>
                  <Route
                    path={ROUTES.WITHOUT_PARAMS.HOME.path}
                    element={<ShoppingListContainer />}
                  />
                  <Route
                    path={ROUTES.WITH_PARAMS.SHOPPING_LIST_DETAILS().path}
                    element={<ShoppingListDetails />}
                  />
                  <Route
                    path={ROUTES.WITH_PARAMS.SHOPPING_LIST_MANAGE_USER().path}
                    element={<ShoppingListManageUser />}
                  />
                  {/* <Route
                    path={ROUTES.WITHOUT_PARAMS.GENERATE_LIST_BY_URL.path}
                    element={<GenerateListByUrl />}
                  /> */}
                  <Route
                    path={ROUTES.WITHOUT_PARAMS.GENERATE_LIST_BY_TEXT.path}
                    element={<GenerateListByText />}
                  />
                  <Route
                    path={ROUTES.WITHOUT_PARAMS.GET_RECEIPTS.path}
                    element={<ReceiptsPage />}
                  />

                  <Route
                    path={ROUTES.WITHOUT_PARAMS.ADD_RECEIPTS.path}
                    element={<AddReceiptPage />}
                  />
                  <Route
                    path="*"
                    element={
                      <Navigate to={ROUTES.WITHOUT_PARAMS.HOME.path} replace />
                    }
                  />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
