"use client";

import React from "react";
import styles from "../page.module.css";
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export default function Generate() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
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
      await sleep(1000);
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
    <>
      <Head>
        <title>Generate Images</title>
      </Head>
      <Header />
      <main>
        <h1>Generate Images</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a prompt to display an image"
          />
          <button type="submit">Submit</button>
        </form>
        {error && <div>{error}</div>}
        {prediction && (
          <div>
            {/* <p>Testing</p> */}
            {prediction.output && (
              <div className={styles.imageWrapper}>
                <Image
                  fill
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                  sizes="100vw"
                />
                {/* <p>Testing2</p> */}
              </div>
            )}
            <p>status: {prediction.status}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
