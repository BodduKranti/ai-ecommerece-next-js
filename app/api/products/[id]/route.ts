import { auth } from "@/app/auth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// GET request handler for fetching a specific election by election_code
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const session: any = await auth();
    const accessToken = session?.accessToken ?? null;
    const resolvedParams = await params;
    const { id } = resolvedParams; // Extract election_code from the route parameters


    try {
        console.log(`Product Details URL`, `${process.env.ECOMMERCE_API}/products/${id}`)

        const response = await axios(`${process.env.ECOMMERCE_API}/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Include the access token
            },
        });
        console.log(`Product details response`, response?.data)

        return NextResponse.json(response?.data, { status: response?.status });
    } catch (e: any) {
        console.error(`Product details error`, e?.response?.data)

        return NextResponse.json(e?.response?.data || e?.message || { message: 'An error occurred' }, {
            status: e?.response?.status || 500,
        });
    }
}