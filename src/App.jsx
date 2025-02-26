import { useState, useEffect } from "react";
import './index.css'; // Certifique-se de que o caminho está correto
import backgroundImage from "./assets/background.jpg";
import starImage from "./assets/star.png";
import clickSoundFile from "./assets/sounds/click.mp3"; // Importando o som de clique
import alertSoundFile from "./assets/sounds/alert.mp3"; // Importando o som de alerta

// Componente de Botão Reutilizável
const StarButton = ({ onClick, children }) => (
  <button
    className="px-6 py-3 rounded-lg text-lg font-bold transition duration-300"
    onClick={onClick}
    style={{
      backgroundImage: `url(${starImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      width: "80px",
      height: "80px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      cursor: "pointer",
      backgroundColor: "transparent",
    }}
  >
    {children}
  </button>
);

export default function App() {
  const [time, setTime] = useState(300); // Tempo em segundos (5 minutos)
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState(5); // Tempo em minutos inserido pelo usuário

  // Sons
  const clickSound = new Audio(clickSoundFile); // Carregando o som de clique
  const alertSound = new Audio(alertSoundFile); // Carregando o som de alerta

  // Pré-carrega o som de alerta
  useEffect(() => {
    alertSound.load();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    clickSound.play(); // Toca o som de clique
  };

  const handlePause = () => {
    setIsRunning(false);
    clickSound.play(); // Toca o som de clique
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(inputTime * 60);
    clickSound.play(); // Toca o som de clique
  };

  const handleChangeTime = (e) => {
    const newTime = Math.max(1, parseInt(e.target.value));
    setInputTime(newTime);
    setTime(newTime * 60);
  };

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
      alertSound.play(); // Toca o som de alerta imediatamente
      alert("✨ Tempo esgotado ✨"); // Exibe o alerta após o som
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  return (


    <div
      className="flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
        position: "relative", // Para posicionar a marca d'água corretamente
      }}
    >
      {/* Contêiner para centralizar o título */}
      <div
        className="flex flex-col items-center justify-center"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
        }}
      >
        <h1
          className="text-5xl font-semibold text-center p-4"
          style={{
            color: "#993300",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
          }}
        >
          ✨Escolha o tempo✨
        </h1>
      </div>

      {/* Contêiner central para os botões */}
      <div
        className="flex flex-col items-center justify-center space-y-6"
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Botões */}
        <div className="flex space-x-4 justify-center w-full">
          <StarButton onClick={handleStart}>Iniciar</StarButton>
          <StarButton onClick={handlePause}>Pausar</StarButton>
          <StarButton onClick={handleReset}>Resetar</StarButton>
        </div>
      </div>

      {/* Contêiner para o timer e input no lado direito */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "10%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "20px",
        }}
      >
        {/* Timer */}
        <div
          className="bg-opacity-60 rounded-lg shadow-lg"
          style={{
            padding: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.0)",
          }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: "30px",
              filter: "drop-shadow(0 0 15px #FFD700) drop-shadow(0 0 10px #FFD700)",
              margin: 0,
              animation: time > 10 ? "none" : "pulse 1s infinite", // Animação apenas nos últimos 10 segundos
            }}
          >
            {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`}
          </p>
        </div>

        {/* Input para definir o tempo (só aparece se o timer não estiver rodando) */}
        {!isRunning && (
          <div>
            <input
              type="number"
              value={inputTime}
              onChange={handleChangeTime}
              min="1"
              className="p-2 rounded-lg text-black text-center"
              style={{
                width: `${inputTime.toString().length + 3}ch`,
                fontSize: "17px",
              }}
              disabled={isRunning}
            />
          </div>
        )}
      </div>

      {/* Marca d'água */}
      <div
        style={{
          position: "absolute",
          bottom: "10px", // Posiciona na parte inferior
          left: "50%", // Centraliza horizontalmente
          transform: "translateX(-50%)", // Ajusta o posicionamento
          color: "rgba(255, 255, 255, 0.5)", // Cor clara com opacidade
          fontSize: "14px",
          zIndex: 10, // Garante que fique acima de outros elementos
        }}
      >
        /karolbernardesc
      </div>
    </div>
  );
}