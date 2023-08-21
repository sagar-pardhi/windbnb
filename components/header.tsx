import Image from "next/image";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex flex-col md:flex-row md:justify-between gap-y-10">
      <Image
        src="/assets/logo.svg"
        width={100}
        height={100}
        alt="logo"
        className="object-fit"
      />
      <div className="flex items-center">
        <div className="flex border rounded-xl shadow-md">
          <input
            className="w-[50%] p-2 appearance-none outline-none border-r-2 text-center text-sm"
            type="text"
            defaultValue="Helsinki, Finland"
          />
          <input
            className="w-[50%] p-2 appearance-none outline-none border-r-2 text-center text-sm"
            type="text"
            placeholder="Add guests"
          />
          <button className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
