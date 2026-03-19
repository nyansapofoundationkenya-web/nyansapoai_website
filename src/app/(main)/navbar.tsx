"use client"
import Link from "next/link"
import { Disclosure } from "@headlessui/react"
import Image from "next/image"
import { navigationLinks } from "@/constants/links"
import { useWindowScroll } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { CTAButton } from "./CTAButton"


export default function Navbar() {
  const [{ x, y }, scrollTo] = useWindowScroll()
  const [addBg, setAddBg] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    if (y && y > 500) {
      setAddBg(true)
    } else if (y && y < 500) {
      setAddBg(false)
    }
  }, [y])
  
  // Helper function to format display names
  const getDisplayName = (item: any) => {
    if (item.displayName) return item.displayName;
    return item.name.split('-').map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div
      className={`w-[100vw] lg:w-full fixed ${
        addBg ? "bg-background/95 backdrop-blur-md" : "bg-gradient-to-b from-black/80 via-black/50 to-transparent"
      } text-foreground duration-200 top-0 left-0 z-50 shadow-sm`}
    >
      <nav className="relative flex flex-wrap py-3 px-6 gap-1 items-center justify-between lg:justify-between max-w-7xl mx-auto">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/imgs/logos/nyansapo-logo.png"
                    alt="Nyansapo AI"
                    width="150"
                    height="150"
                    className="rounded-sm brightness-0 invert dark:invert-0"
                  />
                </Link>
                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto rounded-md lg:hidden hover:text-accent focus:text-accent focus:bg-accent/10 focus:outline-none dark:focus:bg-accent/20"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                {/* Mobile Menu Panel */}
                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <div className="flex flex-col w-full bg-background/95 backdrop-blur-md rounded-lg p-4 shadow-xl border border-border">
                    {navigationLinks.map((item, index) => {
                      // Handle section type
                      if (item.type === "section") {
                        return (
                          <div
                            key={index}
                            className="w-full capitalize px-2 py-2 text-muted-foreground font-semibold text-sm tracking-wider"
                          >
                            {item.name}
                          </div>
                        );
                      }
                      // Handle page type
                      else if (item.type === "page") {
                        return (
                          <Link
                            className="w-full capitalize px-2 py-2 rounded-md font-medium hover:bg-accent/10 hover:text-accent transition-all duration-200"
                            key={index}
                            href={`/${item.link || item.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {item.name}
                          </Link>
                        );
                      } 
                      // Handle menu type with subMenu
                      else if (item.type === "menu" && Array.isArray(item.subMenu)) {
                        return (
                          <div key={index} className="flex flex-col w-full">
                            {/* Parent menu item - just a label, not clickable */}
                            <div className="w-full capitalize px-2 py-2 rounded-md font-semibold text-foreground flex items-center justify-between">
                              <span>{item.name}</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                            {/* Submenu items - these are the clickable links */}
                            <div className="ml-4 flex flex-col border-l-2 border-border pl-3 space-y-1 mt-1">
                              {item.subMenu.map((sub: any, i: number) => (
                                <Link
                                  className="px-3 py-2 rounded-md hover:bg-accent/10 hover:text-accent transition-all duration-200 font-medium"
                                  key={i}
                                  href={`/${sub.link || sub.name}`}
                                >
                                  {getDisplayName(sub)}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                    
                    {/* Mobile CTA Buttons */}
                    <div className="flex flex-col my-3 gap-3 px-2">
                      <a
                        href="/getstarted"
                        className={cn(
                          buttonVariants({ variant: "default" }),
                          "text-lg text-center bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        Get Started
                      </a>
                      <Link
                        href="/request-demo"
                        className="text-accent border-2 border-accent px-4 py-2.5 rounded-md hover:bg-accent hover:text-white transition-all duration-200 text-center font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Request a Demo
                      </Link>
                    </div>
                  </div>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* Desktop Menu */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 list-none lg:pt-0 lg:flex space-x-1">
            {navigationLinks.map((item, index) => (
              <li className="relative" key={index}>
                {/* Handle section type */}
                {item.type === "section" ? (
                  <span className="w-full capitalize px-3 py-2 font-semibold text-muted-foreground text-sm tracking-wider">
                    {item.name}
                  </span>
                ) : item.type === "page" ? (
                  <Link
                    className="w-full capitalize px-3 py-2 font-medium rounded-md hover:text-accent transition-colors duration-200 inline-block"
                    href={`/${item.link || item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </Link>
                ) : item.type === "menu" ? (
                  <NavigationMenu className="bg-transparent">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center gap-1 bg-transparent hover:bg-accent/10 hover:text-accent capitalize text-md font-medium px-3 py-2 rounded-md transition-all duration-200">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 py-1 bg-popover border border-border rounded-lg shadow-lg">
                          {item.subMenu?.map((subItem, index) => (
                            <Link href={`/${subItem.link || subItem.name}`} key={index}>
                              <NavigationMenuLink
                                className={cn(
                                  "block px-4 py-2.5 text-sm hover:bg-accent/10 hover:text-accent transition-colors duration-200",
                                  "focus:outline-none focus:bg-accent/10 focus:text-accent"
                                )}
                              >
                                {getDisplayName(subItem)}
                              </NavigationMenuLink>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenu>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Right Side Buttons */}
        <div className="hidden space-x-3 lg:flex items-center">
          <CTAButton />
          <Link
            href="/request-demo"
            className="text-accent border-2 border-accent px-5 py-2 rounded-lg hover:bg-accent hover:text-white transition-all duration-200 font-medium"
          >
            Request a Demo
          </Link>
        </div>
      </nav>
    </div>
  )
}