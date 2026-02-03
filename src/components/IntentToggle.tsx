"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Briefcase, ShoppingBag, Home } from "lucide-react";

export type UserIntent = 'seller' | 'buyer' | 'owner';

interface IntentToggleProps {
    intent: UserIntent;
    setIntent: (intent: UserIntent) => void;
}

export function IntentToggle({ intent, setIntent }: IntentToggleProps) {
    const tabs = [
        { id: 'seller', label: 'I want to Sell', icon: Briefcase },
        { id: 'buyer', label: 'I want to Buy', icon: ShoppingBag },
        { id: 'owner', label: 'I\'m an Owner', icon: Home },
    ] as const;

    return (
        <div className="flex justify-center w-full">
            <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-stone-200/50 inline-flex relative z-50">
                {tabs.map((tab) => {
                    const isActive = intent === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setIntent(tab.id as UserIntent)}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                                isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-900"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeIntent"
                                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-stone-200"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <Icon className={cn("w-4 h-4", isActive ? "text-amber-600" : "text-stone-400")} />
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
