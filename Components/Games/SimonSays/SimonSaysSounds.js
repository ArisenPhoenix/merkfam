import IMPORT_ALL from "../../../Merkurial/Helpers/Misc/importAll";

const SimonSaysSounds = IMPORT_ALL(
  require.context("../../../public/SimonSays/sounds", false, /\.(mp3)$/)
);

export default SimonSaysSounds;
