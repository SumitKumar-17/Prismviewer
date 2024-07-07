import github from "@iconify/icons-simple-icons/github";
import prisma from "@iconify/icons-simple-icons/prisma";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";

const Nav = () => (
  <nav
    className="flex items-center w-full py-4 pl-5 pr-4 text-white bg-gray-600"
    style={{ gridArea: "nav" }}
  >
    {/* <Image src="/img/logo.svg" alt="Prismaliser" width={200} height={20} /> */}

    <div className="flex-1" />

    <div className="flex items-center gap-4">
      <a
        className="button icon light"
        href="https://prisma.io"
        title="Prisma website"
        aria-label="Prisma website"
      >
        <Icon icon={prisma} height={24} />
      </a>

      <a
        className="button icon light"
        href="https://github.com/SumitKumar-17"
        title="Prismviewer GitHub repository"
        aria-label="Prismviewer GitHub repository"
      >
        <Icon icon={github} height={24} />
      </a>
    </div>
  </nav>
);

export default Nav;
