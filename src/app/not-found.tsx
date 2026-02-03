import Link from 'next/link'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 max-w-md w-full">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileQuestion className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Page Not Found</h2>
                <p className="text-stone-600 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                    Return home or check the URL again.
                </p>
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
                    >
                        <Home className="h-4 w-4" />
                        Return Home
                    </Link>
                    <Link
                        href="/property-valuation/sandton"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Valid Seller Locations
                    </Link>
                </div>
            </div>
        </div>
    )
}
