import staysData from "@/data/stays.json";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(request: Request) {
  // const staysData =
  return NextResponse.json(staysData);
}
