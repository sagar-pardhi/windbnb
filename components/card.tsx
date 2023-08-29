import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Stays } from "@/types";

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
          <StarIcon className="w-4 h-4 text-[#f18686]" />
          <span className="text-xs text-[#4f4f4f]">{rating}</span>
        </div>
      </div>
      <div>
        <p className="text-[#333] font-bold">{title}</p>
      </div>
    </div>
  );
};
