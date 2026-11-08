import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import bmrImg from "../assets/pictures/bmr.png";

export default function Bmr() {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!weight || !height || !age) {
      Swal.fire({
        icon: "warning",
        title: "แจ้งเตือน",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (w <= 0 || h <= 0 || a <= 0) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "ค่าน้ำหนัก ส่วนสูง และอายุต้องมากกว่า 0",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    let bmrVal = 0;
    if (gender === "male") {
      // BMR = 66 + (13.7 x น้ำหนัก กก.) + (5 x ส่วนสูง ซม.) - (6.8 x อายุ)
      bmrVal = 66 + 13.7 * w + 5 * h - 6.8 * a;
    } else {
      // BMR = 665 + (9.6 x น้ำหนัก กก.) + (1.8 x ส่วนสูง ซม.) - (4.7 x อายุ)
      bmrVal = 665 + 9.6 * w + 1.8 * h - 4.7 * a;
    }

    const bmrFixed = bmrVal.toFixed(2);
    setResult(bmrFixed);

    Swal.fire({
      icon: "success",
      title: "ผลการคำนวณ BMR",
      html: `อัตราการเผาผลาญพลังงานขั้นพื้นฐาน:<br/><b class="text-2xl text-blue-600">${bmrFixed}</b> แคลอรี่/วัน`,
      confirmButtonColor: "#2563eb",
    });
  };

  const handleReset = () => {
    setGender("male");
    setWeight("");
    setHeight("");
    setAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center font-kanit">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">BMR Calculator</h1>
          <p className="text-gray-500 text-sm mt-1">
            คำนวณอัตราการเผาผลาญพลังงานพื้นฐาน
          </p>
          <div className="w-24 h-24 mx-auto mt-4 p-2 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <img
              src={bmrImg}
              alt="BMR Calculator"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCalculate} className="space-y-4">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เพศ
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer transition ${
                  gender === "male"
                    ? "border-blue-500 bg-blue-50/50 text-blue-700 font-medium"
                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-blue-600"
                />
                ผู้ชาย
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer transition ${
                  gender === "female"
                    ? "border-pink-500 bg-pink-50/50 text-pink-700 font-medium"
                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="accent-pink-600"
                />
                ผู้หญิง
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              น้ำหนักตัว (กิโลกรัม)
            </label>
            <input
              type="number"
              step="any"
              placeholder="เช่น 60"
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
              placeholder="เช่น 165"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อายุ (ปี)
            </label>
            <input
              type="number"
              placeholder="เช่น 25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              คำนวณ
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              รีเซ็ต
            </button>
          </div>
        </form>

        {/* On-screen Result Box */}
        {result && (
          <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-center animate-fade-in">
            <p className="text-gray-600 text-sm">BMR ที่ต้องการต่อวัน</p>
            <p className="text-3xl font-extrabold text-blue-600 my-1">
              {result}
            </p>
            <p className="text-xs text-gray-500">กิโลแคลอรี่ / วัน</p>
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
