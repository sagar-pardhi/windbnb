"use client";

import { Card } from "@/components/card";
import { useAppContext } from "@/providers/context-provider";
import { Stays } from "@/types";

export default function Home() {
  const { filteredData } = useAppContext();

  return (
    <section className="my-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">
          Stays in {filteredData[0]?.country}
        </h2>
        <span className="text-sm font-medium text-gray-500">
          {filteredData.length}+ stays
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-5">
        {filteredData?.map((stay: Stays) => (
          <Card key={stay.title} {...stay} />
        ))}
      </div>
    </section>
  );
}
