"use client";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import TicketIcon from "../../public/pics/ticket.svg";
import Person from "../../public/pics/person.svg";

import { CartContext } from "../contexts/CartContext"; // Import CartContext

const TopNav = () => {
  // Brug CartContext for at få adgang til kurven
  const { cartItems } = useContext(CartContext);

  return (
    <header className="p-6 text-white bg-transparent absolute top-0 left-0 w-full z-50" style={{ borderColor: "var(--light-grey-font)" }}>
      <nav className="flex items-center justify-between w-full">
        {/* Venstre - Logo for større skærme */}
        <div className="flex-shrink-0 md:flex hidden">
          <Link href="/">
            {" "}
            <h4 className="text-[6rem] text-left" style={{ color: "var(--font-color)" }}>
              Foo
            </h4>
          </Link>
        </div>

        {/* Midten - Logo for mobil version */}
        <div className="md:hidden absolute left-1/2 top-6 transform -translate-x-1/2">
          <h4 className="text-[6rem] text-center" style={{ color: "var(--font-color)" }}>
            Foo
          </h4>
        </div>

        {/* Navigationslinks for større skærme */}
        <div className="hidden md:flex flex-grow justify-center space-x-8 text-white">
          <Link href="/program" className="hover:underline hover:text-gray-300 text-2xl">
            PROGRAM
          </Link>
          <Link href="/lineup" className="hover:underline hover:text-gray-300 text-2xl">
            LINE-UP
          </Link>
          <Link href="/tickets" className="hover:underline hover:text-gray-300 text-2xl">
            TICKETS
          </Link>
        </div>

        {/* Højre - Billet og Profil ikoner */}
        <div className="flex items-center space-x-6 md:flex hidden">
          {/* Billet ikon */}
          <Link href="/basket">
            <div className="relative">
              <Image src={TicketIcon} alt="Cart" width={40} height={40} className="hover:scale-110 transition-transform duration-200" />
              {/* Vis antal varer i kurven */}
              {cartItems.length > 0 && <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItems.length}</span>}
            </div>
          </Link>

          {/* Profil ikon */}
          <Link href="/favorites">
            <Image src={Person} alt="Profile" width={30} height={30} className="hover:scale-110 transition-transform duration-200" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
