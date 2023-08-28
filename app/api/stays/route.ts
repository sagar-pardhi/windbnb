import { data } from "@/data/stays";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log(searchParams);

  return NextResponse.json(data);
}
