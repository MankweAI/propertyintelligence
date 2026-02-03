'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    budgetRanges,
    buyerTypes,
    timelineOptions,
    CONSENT_TEXT,
    type LeadFormData,
} from '@/lib/validation';
import { getAllSuburbs, type Suburb } from '@/lib/data';
import { Loader2, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

interface LeadFormProps {
    defaultSuburbs?: string[];
    sourceUrl?: string;
    variant?: 'full' | 'compact';
}

export function LeadForm({
    defaultSuburbs = [],
    sourceUrl = '',
    variant = 'full'
}: LeadFormProps) {
    const router = useRouter();
    const [allSuburbs, setAllSuburbs] = useState<Suburb[]>([]);

    useEffect(() => {
        const fetchSuburbs = async () => {
            const data = await getAllSuburbs();
            setAllSuburbs(data);
        };
        fetchSuburbs();
    }, []);

    const [formData, setFormData] = useState<Partial<LeadFormData>>({
        name: '',
        phone: '',
        email: '',
        buyerType: undefined,
        budgetRange: undefined,
        preferredSuburbs: defaultSuburbs,
        timeline: undefined,
        preApproved: undefined,
        consentGiven: false,
        website: '', // Honeypot
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSuburbToggle = (slug: string) => {
        setFormData(prev => {
            const current = prev.preferredSuburbs || [];
            const updated = current.includes(slug)
                ? current.filter(s => s !== slug)
                : [...current, slug];
            return { ...prev, preferredSuburbs: updated };
        });
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.phone || !/^(\+27|0)[0-9]{9,10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid SA phone number';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.buyerType) {
            newErrors.buyerType = 'Please select your buyer type';
        }

        if (!formData.budgetRange) {
            newErrors.budgetRange = 'Please select your budget range';
        }

        if (!formData.preferredSuburbs || formData.preferredSuburbs.length === 0) {
            newErrors.preferredSuburbs = 'Please select at least one suburb';
        }

        if (!formData.timeline) {
            newErrors.timeline = 'Please select your timeline';
        }

        if (!formData.preApproved) {
            newErrors.preApproved = 'Please indicate if you are pre-approved';
        }

        if (!formData.consentGiven) {
            newErrors.consentGiven = 'You must consent to proceed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    sourceUrl: sourceUrl || window.location.href,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit');
            }

            setSubmitStatus('success');

            // Redirect to thank you page after a brief delay
            setTimeout(() => {
                router.push(`/thank-you?leadId=${data.leadId}`);
            }, 1500);

        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <Card className="border-green-200 bg-green-50">
                <CardContent className="py-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                        Thank you for your enquiry!
                    </h3>
                    <p className="text-green-700">
                        Redirecting you to see what happens next...
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-teal-100 shadow-lg" id="lead-form">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Get Matched with a Vetted Agent
                </CardTitle>
                <p className="text-teal-50 text-sm mt-1">
                    Free, no-obligation introduction to pre-screened Sandton specialists
                </p>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot - hidden from users */}
                    <div className="hidden" aria-hidden="true">
                        <Input
                            type="text"
                            name="website"
                            value={formData.website || ''}
                            onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name || ''}
                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">WhatsApp Number *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+27 or 0..."
                            value={formData.phone || ''}
                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email (Recommended)</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email || ''}
                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Buyer Type */}
                    <div className="space-y-2">
                        <Label>I am a... *</Label>
                        <Select
                            value={formData.buyerType}
                            onValueChange={value => setFormData(prev => ({
                                ...prev,
                                buyerType: value as LeadFormData['buyerType']
                            }))}
                        >
                            <SelectTrigger className={errors.buyerType ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select buyer type" />
                            </SelectTrigger>
                            <SelectContent>
                                {buyerTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.buyerType && <p className="text-red-500 text-sm">{errors.buyerType}</p>}
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                        <Label>Budget Range *</Label>
                        <Select
                            value={formData.budgetRange}
                            onValueChange={value => setFormData(prev => ({
                                ...prev,
                                budgetRange: value as LeadFormData['budgetRange']
                            }))}
                        >
                            <SelectTrigger className={errors.budgetRange ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                                {budgetRanges.map(range => (
                                    <SelectItem key={range.value} value={range.value}>
                                        {range.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.budgetRange && <p className="text-red-500 text-sm">{errors.budgetRange}</p>}
                    </div>

                    {/* Preferred Suburbs */}
                    <div className="space-y-2">
                        <Label>Preferred Suburbs *</Label>
                        <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 border rounded-lg ${errors.preferredSuburbs ? 'border-red-500' : 'border-slate-200'
                            }`}>
                            {allSuburbs.map(suburb => (
                                <label
                                    key={suburb.slug}
                                    className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-50"
                                >
                                    <Checkbox
                                        checked={formData.preferredSuburbs?.includes(suburb.slug) || false}
                                        onCheckedChange={() => handleSuburbToggle(suburb.slug)}
                                    />
                                    <span className="text-sm">{suburb.name}</span>
                                </label>
                            ))}
                        </div>
                        {errors.preferredSuburbs && (
                            <p className="text-red-500 text-sm">{errors.preferredSuburbs}</p>
                        )}
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                        <Label>When do you plan to buy? *</Label>
                        <Select
                            value={formData.timeline}
                            onValueChange={value => setFormData(prev => ({
                                ...prev,
                                timeline: value as LeadFormData['timeline']
                            }))}
                        >
                            <SelectTrigger className={errors.timeline ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                                {timelineOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.timeline && <p className="text-red-500 text-sm">{errors.timeline}</p>}
                    </div>

                    {/* Pre-approved */}
                    <div className="space-y-2">
                        <Label>Are you pre-approved for a bond? *</Label>
                        <Select
                            value={formData.preApproved}
                            onValueChange={value => setFormData(prev => ({
                                ...prev,
                                preApproved: value as 'yes' | 'no'
                            }))}
                        >
                            <SelectTrigger className={errors.preApproved ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="yes">Yes, I&apos;m pre-approved</SelectItem>
                                <SelectItem value="no">No, not yet</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.preApproved && <p className="text-red-500 text-sm">{errors.preApproved}</p>}
                    </div>

                    {/* POPIA Consent */}
                    <div className={`space-y-2 p-4 rounded-lg ${errors.consentGiven ? 'bg-red-50 border border-red-200' : 'bg-slate-50'
                        }`}>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <Checkbox
                                checked={!!formData.consentGiven}
                                onCheckedChange={checked => setFormData(prev => ({
                                    ...prev,
                                    consentGiven: checked as boolean
                                }))}
                                className="mt-0.5"
                            />
                            <span className="text-sm text-slate-700 leading-relaxed">
                                {CONSENT_TEXT} <span className="text-red-500">*</span>
                            </span>
                        </label>
                        {errors.consentGiven && (
                            <p className="text-red-500 text-sm">{errors.consentGiven}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">{errorMessage}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Get Matched with an Agent'
                        )}
                    </Button>

                    <p className="text-xs text-center text-slate-500">
                        Your information is protected under POPIA and will only be shared with vetted agents.
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
