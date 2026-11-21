import { useEffect, useState } from 'react';

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/v1/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error('API request failed');
        }

        return response.json();
      })
      .then((data) => setHealth(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>GitHub Practice</h1>

      <h2>Backend Health</h2>
      {error && <p>Error: {error}</p>}

      {!health && !error && <p>Checking backend...</p>}

      {health && (
        <div>
          <p>Status: {health.status}</p>
          <p>Version: {health.version}</p>
        </div>
      )}
    </div>
  );
}

export default App
