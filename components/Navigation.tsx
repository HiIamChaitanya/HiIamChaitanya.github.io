import Link from "next/link"
import React from "react"
import ThemeSwitch from "@components/ThemeSwitch";
import {useRouter} from "next/router";

const Navigation = () => {
    const {pathname} = useRouter();
    return (
        <div className="sticky top-0 z-20 py-2 md:py-6 md:mb-6  backdrop-blur-xl bg-white/10  border border-zinc-500/50 rounded-lg 			">
            <div className="container px-2 mx-auto lg:max-w-4xl flex items-center justify-between">
                <div className="items-start flex">
                    <Link href="/">
                        <a className={"font-medium tracking-wider transition-colors text-gray-900 dark:hover:text-zinc-500 hover:text-zinc-500 dark:text-white"}>
                            Chaitanya
                        </a>
                    </Link>
                </div>
                <div className="items-end flex space-x-5">
                    <Link href="/">
                        <a
                            className={pathname === "/" ? "font-medium tracking-wider transition-colors dark:text-gray-500 text-zinc-500 hover:text-gray-500  " : "font-medium tracking-wider transition-colors text-gray-900 dark:hover:text-gray-400 hover:text-gray-400  dark:text-white"}
                        >
                            About
                        </a>
                    </Link>
                    <Link href={"/blog"}>
                        <a
                            className={pathname === "/blog" ? "font-medium tracking-wider transition-colors dark:text-gray-500 text-zinc-500 hover:text-gray-500  " : "font-medium tracking-wider transition-colors text-gray-900 dark:hover:text-gray-400 hover:text-gray-400  dark:text-white"}
                        >
                            Blog
                        </a>
                    </Link>
                    <Link href={"/supportme"}>
                        <a
                            className={pathname === "/supportme" ? "font-medium tracking-wider transition-colors dark:text-gray-500 text-zinc-500 hover:text-gray-500 " : "font-medium tracking-wider transition-colors text-gray-900 dark:hover:text-gray-400 hover:text-gray-400  dark:text-white"}
                        >
                            Support Me
                        </a>
                    </Link>
                    <ThemeSwitch/>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
