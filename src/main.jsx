// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx'; // Your main App component
// import './index.css'; // Your global CSS imports
// import { BrowserRouter } from 'react-router-dom'; // Required for client-side routing
// import { AuthProvider } from './context/AuthContext.js'; // Your authentication context provider
// // The Toaster is now in App.jsx, no need to import/place it here.
// // import { Toaster } from 'react-hot-toast'; // REMOVED from here

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         {/* BrowserRouter should wrap the entire application for routing */}
//         <BrowserRouter>
//             {/* AuthProvider should wrap components that need authentication context */}
//             <AuthProvider>
//                 <App />
//                 {/* Toaster is handled inside App.jsx, so it's commented out here */}
//                 {/* <Toaster position="top-center" reverseOrder={false} /> */}
//             </AuthProvider>
//         </BrowserRouter>
//     </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast'; // Import Toaster

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* <Toaster position="top-center" reverseOrder={false} />   */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);