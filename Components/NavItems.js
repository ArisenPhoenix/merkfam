export const financeItems = [{text: "Schedules"}, {text: "Expenses"}]

export const gameItems = [{text: "drum-kit"}, {text: "dicee"}, {text: "simon-says"}, ];

export const navItems = {
  Home: {
    name: "Home",
    isDropDown: false,
    requireLogin: false,
    button: null, 
    dir: "left",
    href: "/home",
  },
  Finances:{
    name: "Finances",
    isDropDown: false,
    items: financeItems,
    button: null,
    dir: "left",
    href:"finances"
  },

  Games: {
    name: "Games",
    isDropDown: false,
    items: gameItems,
    requireLogin: false,
    button: null,
    dir: "left",
    href: "/games",
  },
  
  Blog: {
    name: "Blog",
    isDropDown: false,
    requireLogin: false,
    button: null,
    dir: "right",
    href: "/blog",
  },
};
