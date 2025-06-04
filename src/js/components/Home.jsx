import React, { useEffect, useState, useRef } from "react";
import SecondsCounter from "./Secondscounter";

function Home() {
  const [seconds, setSeconds] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isRunning, setIsRunning] = useState(true); // 🟢 Controla si el contador está activo
  const originalValue = useRef(0); // 🧠 Guarda el valor original para reiniciar

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (reverse) {
          if (prev <= 1) {
            setShowAlert(true);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reverse, isRunning]);

  const handleStartReverse = () => {
    const value = parseInt(customValue, 10);
    if (!isNaN(value) && value >= 0) {
      setSeconds(value);
      originalValue.current = value;
      setReverse(true);
      setIsRunning(true);
      setShowAlert(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    if (seconds > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setSeconds(reverse ? originalValue.current : 0);
    setShowAlert(false);
    setIsRunning(false);
  };

  return (
    <div className="text-center mt-4 position-relative">
      <SecondsCounter seconds={seconds} />

      {/* ALERTA AL LLEGAR A 0 */}
      {showAlert && (
        <div
          className="position-absolute top-50 start-50 translate-middle bg-warning text-dark p-4 rounded shadow"
          style={{ zIndex: 1000, fontSize: "1.5rem" }}
        >
          ⏰ ¡Tiempo agotado!
        </div>
      )}

      {/* CONTROLES */}
      <div className="mt-4">
        <input
          type="number"
          placeholder="Introduce un número"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          className="form-control w-25 d-inline-block me-2"
        />
        <button onClick={handleStartReverse} className="btn btn-warning me-2">
          Empezar cuenta regresiva
        </button>
        <button onClick={handlePause} className="btn btn-danger me-2">
          ⏸ Pausar
        </button>
        <button onClick={handleResume} className="btn btn-success me-2">
          ▶️ Reanudar
        </button>
        <button onClick={handleReset} className="btn btn-secondary">
          🔁 Reiniciar
        </button>
      </div>
    </div>
  );
}

export default Home;
