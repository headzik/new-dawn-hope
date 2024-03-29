'use client'

import clsx from "clsx"
import Hamburger from "hamburger-react"
import { useState } from "react"
import { styles } from "../../styles"
import { MenuList } from "./MenuList"


export function Menu() {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={styles.menu} onBlur={() => setOpen(false)}>
      <nav className={clsx("hidden gap-10 sm:flex")}>
        <MenuList />
      </nav>
      <nav
        className={clsx(
          "sm:hidden absolute -right-5 top-20 w-32",
          "bg-white/90 backdrop-blur-lg",
          "flex flex-col gap-2 p-2 items-center rounded-md duration-200 transition-all",
          isOpen ? 'opacity-1' : 'opacity-0'
        )}
      >
        <MenuList />
      </nav>
      <div className="sm:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
      </div>
    </div>
  )
}
