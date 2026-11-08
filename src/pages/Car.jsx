import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import carImg from "../assets/pictures/car.png";

export default function Car() {
  const [carPrice, setCarPrice] = useState("");
  const [downPaymentType, setDownPaymentType] = useState("percent"); // 'percent' or 'amount'
  const [downPercent, setDownPercent] = useState("20");
  const [downAmount, setDownAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState("48");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const price = parseFloat(carPrice);
    const interest = parseFloat(interestRate);
    const m = parseInt(months);

    if (!carPrice || !interestRate) {
      Swal.fire({
        icon: "warning",
        title: "แจ้งเตือน",
        text: "กรุณากรอกราคารถและอัตราดอกเบี้ยให้ครบถ้วน",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (price <= 0 || interest < 0) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "ราคารถและอัตราดอกเบี้ยต้องมีค่ามากกว่าหรือเท่ากับ 0",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // 1. คำนวณเงินดาวน์
    let calculatedDown = 0;
    if (downPaymentType === "percent") {
      calculatedDown = price * (parseFloat(downPercent) / 100);
    } else {
      calculatedDown = parseFloat(downAmount) || 0;
    }

    if (calculatedDown >= price) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "เงินดาวน์ต้องน้อยกว่าราคารถ",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // 2. คำนวณยอดจัดไฟแนนซ์: ราคารถ - เงินดาวน์
    const financeAmount = price - calculatedDown;

    // 3. คำนวณดอกเบี้ย: ยอดจัดไฟแนนซ์ x อัตราดอกเบี้ยรายปี (%) x จำนวนปีที่ผ่อน
    const years = m / 12;
    const totalInterest = financeAmount * (interest / 100) * years;

    // 4. คำนวณยอดรวมทั้งหมดที่ต้องผ่อน: ยอดจัดไฟแนนซ์ + ดอกเบี้ยทั้งหมด
    const totalPayment = financeAmount + totalInterest;

    // 5. คำนวณค่างวดต่อเดือน: ยอดรวมทั้งหมดที่ต้องผ่อน / จำนวนเดือนที่ผ่อน
    const monthlyPayment = totalPayment / m;

    const summary = {
      price: price.toLocaleString("th-TH", { minimumFractionDigits: 2 }),
      downPayment: calculatedDown.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
      }),
      financeAmount: financeAmount.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
      }),
      totalInterest: totalInterest.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
      }),
      totalPayment: totalPayment.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
      }),
      monthlyPayment: monthlyPayment.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
      }),
      months: m,
    };

    setResult(summary);

    Swal.fire({
      icon: "success",
      title: "ผลการคำนวณค่างวดรถ",
      html: `
        <div class="text-left text-sm space-y-1.5 font-kanit">
          <p><b>ยอดจัดไฟแนนซ์:</b> ${summary.financeAmount} บาท</p>
          <p><b>ดอกเบี้ยรวม (${years} ปี):</b> ${summary.totalInterest} บาท</p>
          <p><b>ยอดรวมที่ต้องผ่อน:</b> ${summary.totalPayment} บาท</p>
          <hr class="my-2"/>
          <p class="text-base text-blue-600 font-bold">ค่างวดผ่อนชำระ: ${summary.monthlyPayment} บาท/เดือน</p>
        </div>
      `,
      confirmButtonColor: "#2563eb",
    });
  };

  const handleReset = () => {
    setCarPrice("");
    setDownPaymentType("percent");
    setDownPercent("20");
    setDownAmount("");
    setInterestRate("");
    setMonths("48");
    setResult(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center font-kanit">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Car Installment Calculator
          </h1>
          <p className="text-gray-500 text-sm mt-1">คำนวณค่างวดรถยนต์</p>
          <div className="w-24 h-24 mx-auto mt-4 p-2 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <img
              src={carImg}
              alt="Car Installment Calculator"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ราคารถยนต์ (บาท)
            </label>
            <input
              type="number"
              placeholder="เช่น 800000"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                เงินดาวน์
              </label>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="downType"
                    checked={downPaymentType === "percent"}
                    onChange={() => setDownPaymentType("percent")}
                    className="accent-blue-600"
                  />
                  เป็นเปอร์เซ็นต์ (%)
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="downType"
                    checked={downPaymentType === "amount"}
                    onChange={() => setDownPaymentType("amount")}
                    className="accent-blue-600"
                  />
                  เป็นจำนวนเงิน (บาท)
                </label>
              </div>
            </div>

            {downPaymentType === "percent" ? (
              <div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {["15", "20", "25", "30"].map((pct) => (
                    <button
                      type="button"
                      key={pct}
                      onClick={() => setDownPercent(pct)}
                      className={`py-1.5 text-xs rounded-lg border transition font-medium cursor-pointer ${
                        downPercent === pct
                          ? "bg-blue-50 border-blue-500 text-blue-600"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="ระบุ % เงินดาวน์"
                  value={downPercent}
                  onChange={(e) => setDownPercent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                />
              </div>
            ) : (
              <input
                type="number"
                placeholder="ระบุจำนวนเงินดาวน์ (บาท)"
                value={downAmount}
                onChange={(e) => setDownAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อัตราดอกเบี้ยต่อปี (% ต่อปี)
            </label>
            <input
              type="number"
              step="any"
              placeholder="เช่น 2.59"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Month Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนเดือนที่ผ่อน
            </label>
            <select
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white cursor-pointer"
            >
              <option value="24">24 เดือน (2 ปี)</option>
              <option value="36">36 เดือน (3 ปี)</option>
              <option value="48">48 เดือน (4 ปี)</option>
              <option value="60">60 เดือน (5 ปี)</option>
              <option value="72">72 เดือน (6 ปี)</option>
              <option value="84">84 เดือน (7 ปี)</option>
            </select>
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
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 animate-fade-in text-sm">
            <div className="flex justify-between text-gray-600">
              <span>ราคารถ:</span>
              <span className="font-semibold text-gray-800">{result.price} บาท</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>เงินดาวน์:</span>
              <span className="font-semibold text-gray-800">{result.downPayment} บาท</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>ยอดจัดไฟแนนซ์:</span>
              <span className="font-semibold text-gray-800">{result.financeAmount} บาท</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>ดอกเบี้ยรวม:</span>
              <span className="font-semibold text-gray-800">{result.totalInterest} บาท</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>ยอดรวมทั้งหมดที่ต้องผ่อน:</span>
              <span className="font-semibold text-gray-800">{result.totalPayment} บาท</span>
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-gray-800 text-base">
                ค่างวดต่อเดือน:
              </span>
              <span className="font-extrabold text-blue-600 text-xl">
                {result.monthlyPayment} บาท
              </span>
            </div>
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
