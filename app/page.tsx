import { Card } from "@/components/card";
import { Stays } from "@/types";

const getStaysData = async () => {
  const response = await fetch("http://localhost:3000/api/stays");
  const data = response.json();
  return data;
};

export default async function Home() {
  const data = await getStaysData();

  return (
    <section className="my-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Stays in Finland</h2>
        <span className="text-sm font-medium text-gray-500">12+ stays</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-5">
        {data.staysData?.map((stay: Stays) => (
          <Card key={stay.title} {...stay} />
        ))}
      </div>
    </section>
  );
}
