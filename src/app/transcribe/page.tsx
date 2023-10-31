"use client";

import React from "react";
import styles from "../page.module.css";
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export default function Transcribe() {
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
      <div className={styles.divmain}>
        <Head>
          <title>Transcribe Audios</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <h1>Transcribe your audios</h1>
          <p className={styles.p1}>
            Just upload your audio and we will do the rest.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.p1}>
              Choose your video or audio{" "}
              <span className={styles.formspan}>Max: 25MB</span>
            </div>
            <input
              className={styles.forminput}
              type="file"
              name="prompt"
              onSubmit={handleSubmit}
              accept="audio"
              max={25 * 1024 * 1024}
            />
            <div className={styles.formdiv}>
              <button type="submit">Submit</button>
            </div>
          </form>
          {error && <div>{error}</div>}
          {prediction && (
            <div>
              {prediction.output && (
                <div className={styles.imageWrapper}>
                  <p className={prediction} />
                </div>
              )}
              <p>status: {prediction.status}</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
