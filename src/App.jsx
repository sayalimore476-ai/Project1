import { useEffect, useState } from "react";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Registration from "./pages/registration.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ApiDemo from "./pages/ApiDemo.jsx";

function App() {
  const [page, setPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔄 Restore session on refresh
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.isLoggedIn) {
      setIsLoggedIn(true);
      setPage("dashboard");
    }
  }, []);

  return (
    <div>
      {/* Landing */}
      {page === "landing" && <Landing onNavigate={setPage} />}

      {/* Public Pages */}
      {page === "home" && <Home />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      {page === "api" && <ApiDemo />}

      {/* Register */}
      {page === "register" && (
        <Registration
          onRegisterSuccessful={() => setPage("login")}
        />
      )}

      {/* Login */}
      {page === "login" && (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            localStorage.setItem(
              "user",
              JSON.stringify({ isLoggedIn: true })
            ); 
            setPage("dashboard");
          }}
        />
      )}

      {/* 🔐 Protected Dashboard */}
      {page === "dashboard" &&
        (isLoggedIn ? (
          <Dashboard
            onLogout={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("user");
              setPage("login");
            }}
          />
        ) : (
          <Login
            onLogin={() => {
              setIsLoggedIn(true);
              localStorage.setItem(
                "user",
                JSON.stringify({ isLoggedIn: true })
              );
              setPage("dashboard");
            }}
          />
        ))}

      {/* Dev shortcut */}
      <button onClick={() => setPage("api")}>ApiDemo</button>
    </div>
  );
}

export default App;