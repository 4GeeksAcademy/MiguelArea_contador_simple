import React from 'react';
import ReactDOM from 'react-dom/client';

// Componentes
import Home from './components/Home';

// Bootstrap y FontAwesome
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
