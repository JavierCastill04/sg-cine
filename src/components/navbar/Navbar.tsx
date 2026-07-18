"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, X } from "lucide-react"
import styles from "@/components/navbar/navbar.module.css";
import { useState } from "react";

export default function Navbar() {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const links = [
        { href: "/", text: "Funciones" },
        { href: "/peliculas", text: "Películas" },
        { href: "/salas", text: "Salas" },
        { href: "/ventas", text: "Ventas" },
        { href: "/dashboard", text: "Dashboard" }
    ];

    return (
        <nav className={styles.navbar}>
            <button className={styles.menuButton} onClick={() => setOpen(!open)}>
                {open ? <X /> : <MenuIcon />}
            </button>
            <div className={`${styles.navLinks} ${open ? styles.show : ""}`}>
                {links.map(link => (
                    <Link
                        key={link.href} href={link.href}
                        onClick={() => setOpen(false)}
                        className={pathname === link.href ? styles.active : ""}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>
        </nav>
    );
}