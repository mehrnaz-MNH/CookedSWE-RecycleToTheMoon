'use client'

import { Home, Users, User, Heart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Heart, label: 'Donate', href: '/donate' },
        { icon: Users, label: 'Community', href: '/community' },
        { icon: User, label: 'Profile', href: '/profile' },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-primary-navy border-t border-white/10 z-50">
            <div className="max-w-md mx-auto px-6 py-4">
                <div className="flex justify-around items-center">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1"
                            >
                                <Icon
                                    className={`nav-icon ${isActive ? 'nav-icon-active' : 'text-white/60'}`}
                                />
                                <span className={`text-xs ${isActive ? 'text-primary-green font-semibold' : 'text-white/60'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}

