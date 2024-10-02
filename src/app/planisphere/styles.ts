import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

  body {
    
    color: #333;
  }

  .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
        }
        h1 {
          text-align: center;
          margin: 0 0 20px 0;
          color: #2c3e50;
          font-weight: 700;
        }
        .world-map {
          flex: 1;
          position: relative;
          background-color: #e6f3ff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: grab;
        }
        .world-map:active {
          cursor: grabbing;
        }
        .country {
          transition: fill 0.3s ease;
          cursor: pointer;
        }
        .country:hover {
          fill-opacity: 0.8;
        }
        .country.selected {
          stroke: #2c3e50;
          stroke-width: 1.5px;
        }
        .controls {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
        }
        .control-btn {
          background-color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .control-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .info-bubble {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.95);
          padding: 15px;
          border-radius: 10px;
          max-height: 400px;
          overflow-y: auto;
          z-index: 10;
          width: 250px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .info-bubble h3 {
          margin: 0 0 10px 0;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 5px;
        }
        .info-content p {
          margin: 5px 0;
          font-size: 14px;
        }
        .legend {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 10px;
          border-radius: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 300px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .legend-item {
          display: flex;
          align-items: center;
          margin: 5px 10px;
          font-size: 12px;
        }
        .color-box {
          width: 15px;
          height: 15px;
          margin-right: 5px;
          border-radius: 3px;
        }
        .info-bubble {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 20px 20px 0 0;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform: translateY(100%);
  opacity: 0;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
}

.info-bubble-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .info-bubble {
    position: absolute;
    top: 20px;
    left: 20px;
    right: auto;
    bottom: auto;
    width: 300px;
    border-radius: 10px;
    transform: translateY(0);
    opacity: 1;
  }
}
`;
