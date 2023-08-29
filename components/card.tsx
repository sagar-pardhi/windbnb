import { Stays } from "@/types";
import Image from "next/image";

interface CardProps extends Stays {}

export const Card: React.FC<CardProps> = ({
  title,
  superHost,
  type,
  rating,
  photo,
  beds,
}) => {
  return (
    <div className="flex flex-col my-5">
      <div className="w-full aspect-video relative">
        <Image
          src={photo}
          alt="photo"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="flex py-3 items-center justify-between">
        <div className="flex items-center gap-x-3">
          {superHost && (
            <div className="border px-2 flex items-center py-1 rounded-full border-[#4f4f4f]">
              <span className="text-xs tracking-tight text-center font-bold text-[#4f4f4f] uppercase">
                super host
              </span>
            </div>
          )}

          <p className="text-xs lg:text-sm text-[#828282]">
            {type} {beds && `. ${beds} beds`}
          </p>
        </div>
        <div className="flex items-center gap-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#f18686"
            viewBox="0 0 24 24"
            strokeWidth={0}
            stroke="none"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <span className="text-xs text-[#4f4f4f]">{rating}</span>
        </div>
      </div>
      <div>
        <p className="text-[#333] font-bold">{title}</p>
      </div>
    </div>
  );
};
