import { useState } from "react";
import Barcode from "react-barcode";
import BarcodeScanner from "./BarcodeScanner";
import CustomButton from "./global/CustomButton";

const BarcodeGenerator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [scanner, setScanner] = useState(false);

  const handleChange = (e) => {
    const v = e.target.value;
    if (v.length >= 39) {
      return;
    }
    setInput(v);
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-gray-200 flex p-4 rounded-xl gag-4">
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 64,
            width: "100%",
          }}
        ></div>
        <div className="gap-4 flex flex-col">
          <label className="text-lg" htmlFor="input">
            Masukan Nama :
          </label>
          <input
            id="input"
            className="px-3 py-2 border border-black rounded-md"
            value={input}
            onChange={(e) => handleChange(e)}
          />
          <Barcode value={input} format="CODE128" displayValue />
        </div>
        <div className="">
          <CustomButton text="Scan" handleClick={() => setScanner(true)} />
          <CustomButton text="Close" handleClick={() => setScanner(false)} />
          {scanner && (
            <BarcodeScanner
              sendCode={(e) => {
                setResult(e);
                setScanner(false);
              }}
            />
          )}
        </div>
      </div>
      <i className="text-3xl mt-24">
        Result == <span>{result}</span>
      </i>
    </div>
  );
};

export default BarcodeGenerator;
