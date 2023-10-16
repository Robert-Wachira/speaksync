"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      // await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      console.log("prediction.output:", prediction.output);
      setPrediction(prediction);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Link href="/login"> Login </Link> */}
      <p>
        Dream something with{" "}
        <a href="https://replicate.com/stability-ai/stable-diffusion">SDXL</a>:
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="Enter a prompt to display an image"
        />
        <button type="submit">Go!</button>
      </form>
      {error && <div>{error}</div>}
      {/* {prediction && (
        <div>
          {prediction["output"] && (
            <div className={styles.imageWrapper}>
              <Image
                fill
                src={prediction["output"][prediction["output"]["length"] - 1]}
                alt="output"
                sizes="100vw"
              />
            </div>
          )}
          <p>status: {prediction["status"]}</p>
        </div>
      )} */}
      {prediction && (
        <div>
          <p>Testing</p>
          {prediction.output && (
            <div className={styles.imageWrapper}>
              <Image
                fill
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
              />
              <p>Testing2</p>
            </div>
          )}
          <p>status: {prediction.status}</p>
        </div>
      )}
      {/* {prediction && (
        <div>
          {prediction.status === "succeeded" && prediction.output && (
            <div className={styles.imageWrapper}>
              <Image
                fill
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
              />
            </div>
          )}
          <p>status: {prediction.status}</p>
        </div>
      )} */}
    </main>
  );
}