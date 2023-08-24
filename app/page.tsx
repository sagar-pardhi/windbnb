"use client";

import { Card } from "@/components/card";
import { Stays } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [staysData, setStaysData] = useState<Stays[]>([]);

  useEffect(() => {
    async function getStaysData() {
      const response = await fetch(`/api/stays`);
      const data = await response.json();
      setStaysData(data);
    }

    getStaysData();
  }, []);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Stays in {staysData[0]?.country}</h2>
        <span className="text-sm font-medium text-gray-500">
          {staysData.length}+ stays
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-5">
        {staysData?.map((stay: Stays) => (
          <Card key={stay.title} {...stay} />
        ))}
      </div>
    </section>
  );
}
