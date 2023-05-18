import IMPORT_ALL from "../../../Merkurial/Helpers/Misc/importAll";

const Images = IMPORT_ALL(
  require.context("../../../public/diceImages", false, /\.(png|jpe?g|svg)$/)
);

export default Images;
