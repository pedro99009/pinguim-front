"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./search-bar";

export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
        <Image
            src="/images/images.jpg" // Caminho relativo a partir da pasta public
            alt=""
            width={40}
            height={40}
          />
          <span className="ml-3 text-xl font-semibold">Pinguim Stats</span>
        </div>

        

        {/* Menu de navegação */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/estatisticas"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Estatísticas
              </Link>
            </li>
            <li>
              <Link
                href="/jogadores"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Jogadores
              </Link>
            </li>
            <li>
              <Link
                href="/times"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Times
              </Link>
            </li>
            <li>
              <Link
                href="/contato"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
