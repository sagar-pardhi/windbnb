import { data } from "@/data/stays";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const noOfGuests = searchParams.get("no_of_guests");

  console.log({ city, country, noOfGuests });

  if (city || country || noOfGuests) {
    const filteredData = data
      .filter((hotel) => hotel.city.toLowerCase() === city?.toLowerCase())
      // .filter((hotel) => hotel.country.toLowerCase() === country?.toLowerCase())
      .filter((hotel) => hotel.maxGuests >= +noOfGuests!);

    // console.log(filteredData);

    return NextResponse.json(filteredData);
  }

  return NextResponse.json(data);
}
