import { type Genimage } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../page.module.css";
//@ts-ignore
import { Hanko } from "@teamhanko/hanko-elements";

const CollectionPage: NextPage = () => {
  // const icons = api.icons.getIcons.useQuery();
  const session = Hanko.session;
  const images = session.images.getImages.useQuery();
  return (
    <>
      <Head>
        <title>Your Images</title>
        <meta name="description" content="Your Images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main2}>
        <h1>Your Images</h1>

        <ul>
          {images.data?.map((image: Genimage) => (
            <li key={image.id}>
              <Image
                // className="w-full rounded-lg"
                width="100"
                height="100"
                alt={image.prompt ?? "an image of an icon"}
                src={`https://localhost:3000/${image.id}`}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CollectionPage;
