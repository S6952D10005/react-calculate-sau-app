import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import bmiImg from "../assets/pictures/bmi.png";

export default function Bmi() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!weight || !height) {
      Swal.fire({
        icon: "warning",
        title: "แจ้งเตือน",
        text: "กรุณากรอกน้ำหนักและส่วนสูงให้ครบถ้วน",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to meters

    if (w <= 0 || h <= 0) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "ค่าน้ำหนักและส่วนสูงต้องมากกว่า 0",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const bmiVal = w / (h * h);
    const bmiFixed = bmiVal.toFixed(2);

    let interpretation = "";
    let colorClass = "";

    if (bmiVal < 18.5) {
      interpretation = "น้ำหนักน้อย / ผอม";
      colorClass = "text-blue-500";
    } else if (bmiVal < 23) {
      interpretation = "ปกติ (สมส่วน)";
      colorClass = "text-green-500";
    } else if (bmiVal < 25) {
      interpretation = "ท้วม / น้ำหนักเกิน";
      colorClass = "text-yellow-500";
    } else if (bmiVal < 30) {
      interpretation = "อ้วน / โรคอ้วนระดับ 1";
      colorClass = "text-orange-500";
    } else {
      interpretation = "อ้วนมาก / โรคอ้วนระดับ 2";
      colorClass = "text-red-500";
    }

    const resultData = {
      bmi: bmiFixed,
      text: interpretation,
      color: colorClass,
    };

    setResult(resultData);

    Swal.fire({
      icon: "success",
      title: `ค่า BMI ของคุณ: ${bmiFixed}`,
      html: `เกณฑ์: <b class="${colorClass}">${interpretation}</b>`,
      confirmButtonColor: "#2563eb",
    });
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center font-kanit">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">BMI Calculator</h1>
          <p className="text-gray-500 text-sm mt-1">คำนวณดัชนีมวลกาย</p>
          <div className="w-24 h-24 mx-auto mt-4 p-2 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <img
              src={bmiImg}
              alt="BMI Calculator"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              น้ำหนัก (กิโลกรัม)
            </label>
            <input
              type="number"
              step="any"
              placeholder="เช่น 65"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ส่วนสูง (เซนติเมตร)
            </label>
            <input
              type="number"
              step="any"
              placeholder="เช่น 170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              คำนวณ BMI
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 rounded-lg transition duration-200 cursor-pointer"
              >
                รีเซ็ต
              </button>
            )}
          </div>
        </form>

        {/* On-screen Result Box */}
        {result && (
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 text-center animate-fade-in">
            <p className="text-gray-500 text-sm">ค่า BMI ที่ได้</p>
            <p className="text-3xl font-extrabold text-gray-800 my-1">
              {result.bmi}
            </p>
            <p className={`font-semibold ${result.color}`}>{result.text}</p>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link
            to="/"
            className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition duration-200 cursor-pointer"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
