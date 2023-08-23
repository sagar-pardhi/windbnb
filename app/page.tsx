import { Card } from "@/components/card";
import { Stays } from "@/types";

interface StaysData {
  staysData: Stays[];
}

const getStaysData = async (): Promise<StaysData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stays`);
  const data = response.json();
  return data;
};

const Home = async () => {
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
};

export default Home;
