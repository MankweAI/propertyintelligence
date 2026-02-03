import Link from 'next/link';

export const metadata = {
    title: 'Terms of Use | PropertyIntelligence',
    description: 'Terms of Use for PropertyIntelligence. Please read these terms carefully before using our services.',
};

export default function TermsPage() {
    return (
        <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-100">
                <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Terms of Use</h1>

                <div className="prose prose-stone max-w-none text-stone-600">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using PropertyIntelligence ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
                            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">2. Description of Service</h2>
                        <p>
                            PropertyIntelligence provides real estate data analysis, suburb insights, and connections to real estate professionals.
                            We are not a real estate agency but an information and referral platform.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">3. Disclaimer of Warranties</h2>
                        <p>
                            The materials on PropertyIntelligence's website are provided on an 'as is' basis. PropertyIntelligence makes no warranties, expressed or implied,
                            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                            fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                        <p className="mt-2">
                            Further, PropertyIntelligence does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                            <strong> Property prices and market data are estimates and should not be used as the sole basis for financial decisions. Always consult a qualified professional.</strong>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">4. Limitations</h2>
                        <p>
                            In no event shall PropertyIntelligence or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption)
                            arising out of the use or inability to use the materials on PropertyIntelligence's website.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">5. Revisions and Errata</h2>
                        <p>
                            The materials appearing on PropertyIntelligence's website could include technical, typographical, or photographic errors.
                            PropertyIntelligence does not warrant that any of the materials on its website are accurate, complete or current.
                            We may make changes to the materials contained on its website at any time without notice.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">6. Governing Law</h2>
                        <p>
                            Any claim relating to PropertyIntelligence's website shall be governed by the laws of South Africa without regard to its conflict of law provisions.
                        </p>
                    </section>
                </div>

                <div className="mt-8 pt-8 border-t border-stone-100">
                    <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
