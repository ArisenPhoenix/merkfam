const games = [
  { name: "Simon Says", href: "games/simon-says" },
  { name: "Drum Kit", href: "games/drum-kit" },
  { name: "Dicee", href: "games/dicee" },
];

export const navItems = {
  Home: {
    name: "Home",
    isDropDown: false,
    requireLogin: false,
    button: null,
    dir: "left",
    href: "/home",
  },
  Games: {
    name: "Games",
    isDropDown: false,
    items: games,
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
