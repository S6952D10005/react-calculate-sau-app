import { Link } from "react-router";

export default function CardMenu({
  image,
  title,
  description,
  routePath,
  name,
  detail,
  path,
  to,
}) {
  const displayTitle = title || name;
  const displayDesc = description || detail;
  const targetPath = routePath || path || to || "/";

  return (
    <Link
      to={targetPath}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-between text-center border border-gray-100 hover:-translate-y-1.5 group cursor-pointer h-full"
    >
      <div className="w-36 h-36 mb-6 flex items-center justify-center p-2 rounded-2xl bg-gray-50/60 group-hover:bg-blue-50/40 transition-colors">
        <img
          src={image}
          alt={displayTitle}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 font-kanit">
          {displayTitle}
        </h2>
        <p className="text-xs text-gray-400 font-kanit leading-relaxed">
          {displayDesc}
        </p>
      </div>
    </Link>
  );
}
