// Define the types for navigation items
type NavigationSubMenuItem = {
  name: string
  type: string
  link?: string
  displayName?: string 
}

type NavigationItem = {
  name: string
  type: string
  link?: string
  subMenu?: NavigationSubMenuItem[]
}

export const navigationLinks: NavigationItem[] = [
  // { name: "about us", type: "section" },
  { name: "products", type: "section" },
   { 
    name: "about us", 
    type: "menu",
    subMenu: [
      { 
        name: "about us", 
        link: "about", 
        type: "page",
        displayName: "About Us" 
      },
      { 
        name: "careers", 
        link: "careers", 
        type: "page",
        displayName: "Careers" 
      }
    ]
  },
  { name: "Resources", link: "resources", type: "page" }, 
  { name: "Contact Us", link: "contact", type: "page" }, 
  // Uncomment if you need this menu item with subMenu
  /*
  {
    name: "impact",
    type: "menu",
    subMenu: [
      {
        name: "projects",
        type: "page",
      },
      {
        name: "partners",
        type: "page",
      },
      {
        name: "achievements",
        type: "page",
      },
      {
        name: "partners",
        type: "page",
      },
    ],
  },
  */
]