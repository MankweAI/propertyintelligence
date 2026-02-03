import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | PropertyIntelligence',
    description: 'Privacy Policy for PropertyIntelligence. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-100">
                <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-stone max-w-none text-stone-600">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">1. Introduction</h2>
                        <p>
                            PropertyIntelligence ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">2. Data We Collect</h2>
                        <p className="mb-2">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>To provide the services you request, such as property valuations or connecting you with estate agents.</li>
                            <li>To improve our website and services.</li>
                            <li>To communicate with you about updates or informational content.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">4. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">5. Third-Party Links</h2>
                        <p>
                            This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you.
                            We do not control these third-party websites and are not responsible for their privacy statements.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-4">6. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at:
                            <br />
                            Email: hello@propertyintelligence.co.za
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
