import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const LOGIN_URL = `${process.env.ECOMMERCE_API}/auth/login`;
        console.log(`${LOGIN_URL}`)
        // const LOGIN_URL = `${process.env.EBALLOT_ONLINE_API_LOGIN.replace('/v1', '/v2')}/auth/login`;
        console.log(`${LOGIN_URL}`)
        const respnose = await axios(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                ...body,
                // user_type: USER_TYPE.ADMIN,
                expiresInMins: 30, // optional, defaults to 60
            }),
        });
        console.log('login response', respnose?.data)
        return NextResponse.json({ ...respnose?.data }, { status: respnose?.status });
    } catch (e: any) {

        console.error('login Error response', e?.response?.data)
        return NextResponse.json(e?.response?.data || e?.message, { status: e.response?.status || 500 });
    }
    // return NextResponse.json(TEMP_DATA, { status:200 });
}
