import IMPORT_ALL from "../../Merkurial/Helpers/Misc/importAll";
// import sounds from "../../public/SimonSays/sounds"

const SimonSaysSounds = IMPORT_ALL(
  require.context("../../public/SimonSays/sounds", false, /\.(mp3)$/)
);

export default SimonSaysSounds;
