import Head from "next/head";
import AUTH_GUARD from "../Merkurial/Auth/AUTH";

export default function Home(){
  return (
    <AUTH_GUARD needsLoggedIn={true}>
      <Head>
        <title>MerkFam App</title>
        <meta name="description" content="Marcure Family" />
      </Head>
    </AUTH_GUARD>
  );
}
