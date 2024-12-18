"use client";

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Appbar from "@repo/ui/Appbar";
import { User } from "@repo/db/client";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  
  return (
    <div>
      <div>{status === 'authenticated' ? `Logged in as ${session.user?.email}` : 'Not logged in'}</div>
    </div>
  );
}
