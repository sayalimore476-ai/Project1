import { useState } from "react"

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try{
      const response = await fetch("http://localhost:5000/api/auth/login",{
        method: "POST",
        headers: {  
          "Content-Type": "application/json",

        },
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();
      if(response.ok){
        onLogin();
      }else {
        setError(data.message || "Login failed");
      }
    } catch (err){
      setError("An error occured during login/server might be down");
    }
  };


    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
    );
}
export default Login;