import React, { useEffect, useState, useRef } from "react";
import SecondsCounter from "./Secondscounter";

function Home() {
  const [seconds, setSeconds] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [isRunning, setIsRunning] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTarget, setAlertTarget] = useState("");
  const [customReached, setCustomReached] = useState(false);

  const originalValue = useRef(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const nextValue = reverse ? Math.max(prev - 1, 0) : prev + 1;

        // Alerta si llega al valor personalizado
        if (
          alertTarget !== "" &&
          parseInt(alertTarget) === nextValue &&
          !customReached
        ) {
          setShowAlert(true);
          setCustomReached(true);
        }

        // Alerta automática si llega a 0 en modo regresivo
        if (reverse && nextValue === 0) {
          setShowAlert(true);
          setIsRunning(false);
        }

        return nextValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reverse, isRunning, alertTarget, customReached]);

  const handleStartReverse = () => {
    const value = parseInt(customValue, 10);
    if (!isNaN(value) && value >= 0) {
      setSeconds(value);
      originalValue.current = value;
      setReverse(true);
      setIsRunning(true);
      setShowAlert(false);
      setCustomReached(false);
    }
  };

  const handlePause = () => setIsRunning(false);
  const handleResume = () => {
    if (seconds > 0 || !reverse) setIsRunning(true);
  };

  const handleReset = () => {
    setSeconds(reverse ? originalValue.current : 0);
    setIsRunning(false);
    setShowAlert(false);
    setCustomReached(false);
  };

  return (
    <div className="text-center mt-4 position-relative">
      <SecondsCounter seconds={seconds} />

      {/* ALERTA VISUAL */}
      {showAlert && (
        <div
          className="position-absolute top-50 start-50 translate-middle bg-warning text-dark p-4 rounded shadow"
          style={{ zIndex: 1000, fontSize: "1.5rem" }}
        >
          ⏰ ¡Se alcanzó el tiempo objetivo!
        </div>
      )}

      {/* CONTROLES */}
      <div className="mt-4">
        <input
          type="number"
          placeholder="Cuenta desde..."
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
        <button onClick={handleReset} className="btn btn-secondary me-2">
          🔁 Reiniciar
        </button>
      </div>

      {/* INPUT PARA ALERTA BONUS */}
      <div className="mt-3">
        <input
          type="number"
          placeholder="Alerta al llegar a..."
          value={alertTarget}
          onChange={(e) => {
            setAlertTarget(e.target.value);
            setCustomReached(false); // reset alerta
            setShowAlert(false);
          }}
          className="form-control w-25 d-inline-block"
        />
      </div>
    </div>
  );
}

export default Home;
