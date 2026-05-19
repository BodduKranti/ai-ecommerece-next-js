import axios from "axios";
import { NextResponse } from "next/server";
export const runtime = 'nodejs'

// GET request handler
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const skip = searchParams.get("skip");
    const limit = searchParams.get("limit");
    const searchQueryURL = search ? `${process.env.ECOMMERCE_API}/products/search?skip=${skip}&limit=${limit}&q=${search}` : `${process.env.ECOMMERCE_API}/products/search?skip=${skip}&limit=${limit}`;

    try {
        console.log(`Product URL`, searchQueryURL)

        // const response = await axios(`${process.env.ECOMMERCE_API.replace('/v1', '/v2')}/elections`, 
        const response = await axios(searchQueryURL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`, // Add the access token to the headers
                },
            });
        console.log(`Products List`, response?.data)

        return NextResponse.json(response?.data, { status: response?.status });
    } catch (e: any) {
        console.error(`Error`, e?.response?.data);
        return NextResponse.json(
            e?.response?.data || { error: e?.message },
            { status: e?.response?.status || 500 }
        );
    }
}