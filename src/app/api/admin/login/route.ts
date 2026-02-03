import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, createAdminSession, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        if (!verifyAdminPassword(password)) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        const sessionToken = createAdminSession();

        const response = NextResponse.json({ success: true });
        response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    } catch {
        return NextResponse.json(
            { error: 'An error occurred' },
            { status: 500 }
        );
    }
}
