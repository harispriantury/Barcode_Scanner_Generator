import { useEffect } from "react";
import Quagga from "quagga";

// eslint-disable-next-line react/prop-types
const BarcodeScanner = ({ sendCode }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#your-camera-element"), // Sesuaikan dengan elemen kamera Anda
        },
        decoder: {
          readers: ["code_128_reader"], // Atur pembaca barcode yang ingin Anda gunakan
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        locate: true,
      },
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          console.log("Detected barcode: " + result.codeResult.code);
          sendCode(result.codeResult.code);
          Quagga.stop();
        }
      }
    });
  }, []);

  return (
    <div>
      <div id="your-camera-element"></div>
    </div>
  );
};

export default BarcodeScanner;
