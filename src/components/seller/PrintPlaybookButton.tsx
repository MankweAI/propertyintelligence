'use client';

import { Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrintPlaybookButtonProps {
    suburbName: string;
    className?: string;
}

export function PrintPlaybookButton({ suburbName, className = '' }: PrintPlaybookButtonProps) {
    const handlePrint = () => {
        // Set document title for PDF filename
        const originalTitle = document.title;
        document.title = `${suburbName} Seller Playbook - PropertyIntelligence`;

        // Trigger print dialog
        window.print();

        // Restore original title
        setTimeout(() => {
            document.title = originalTitle;
        }, 100);
    };

    return (
        <Button
            variant="outline"
            onClick={handlePrint}
            className={`gap-2 no-print ${className}`}
            title="Download as PDF"
        >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Playbook</span>
            <span className="sm:hidden">PDF</span>
        </Button>
    );
}
