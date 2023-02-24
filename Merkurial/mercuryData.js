import IMPORT_ALL from "./Helpers/Misc/importAll";

// export const NAV_DATA = () => {
//   const leftNavs = [{ name: "Projects" }, { name: "Contact" }];
//   const rightNavs = [{ name: "Blog" }, { name: "Resume" }];
//   const leftDs = leftNavs.map((item) => item.name);
//   const rightDs = rightNavs.map((item) => item.name);
//   const dropDowns = [...leftDs, ...rightDs];

//   const nav_data = {
//     leftNavs: leftNavs,
//     rightNavs: rightNavs,
//     currentPage: null,
//     dropDowns: dropDowns,
//   };
//   return nav_data;
// };

export const THEMES = () => {
  const themes = {
    default: "",
    primary: {
      dark: "",
      light: "",
      highContrasy: "",
    },
    secondary: {
      ethereal: "",
      kiddish: "",
      modern: "",
      professional: "",
      holy: "",
    },
    design: {
      angular: "",
      bubbly: "",
      rounded: "",
      natural: "",
    },
    accesibility: {
      red_green_blind: "",
    },
  };

  return themes;
};
