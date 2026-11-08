import CardMenu from "../components/CardMenu";
import calcImg from "../assets/pictures/calculate.png";
import bmiImg from "../assets/pictures/bmi.png";
import bmrImg from "../assets/pictures/bmr.png";
import carImg from "../assets/pictures/car.png";

export default function Home() {
  return (
    <div className="min-h-screen py-16 px-4 flex flex-col items-center justify-center font-kanit">
      {/* Header */}
      <div className="text-center mb-10 flex flex-col items-center">
        <div className="w-24 h-24 mb-4 flex items-center justify-center p-2 rounded-2xl bg-white shadow-sm border border-gray-100">
          <img
            src={calcImg}
            alt="เครื่องมือคำนวณออนไลน์"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          เครื่องมือคำนวณออนไลน์
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base font-normal">
          เลือกการคำนวณที่คุณต้องการจากรายการด้านล่าง
        </p>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <CardMenu
          image={bmiImg}
          title="BMI (ดัชนีมวลกาย)"
          description="คำนวณว่าน้ำหนักของคุณเหมาะสมกับส่วนสูงหรือไม่"
          routePath="/bmi"
        />
        <CardMenu
          image={bmrImg}
          title="BMR (อัตราการเผาผลาญ)"
          description="คำนวณพลังงานขั้นต่ำที่ร่างกายต้องการในแต่ละวัน"
          routePath="/bmr"
        />
        <CardMenu
          image={carImg}
          title="การผ่อนชำระค่างวดรถ"
          description="คำนวณยอดผ่อนต่อเดือนและดอกเบี้ยรถยนต์"
          routePath="/car"
        />
      </div>
    </div>
  );
}
