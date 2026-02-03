'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 max-w-md w-full">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Something went wrong!</h2>
                <p className="text-stone-600 mb-8">
                    We apologize for the inconvenience. An unexpected error occurred.
                </p>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Try Again
                </button>
            </div>
        </div>
    )
}
