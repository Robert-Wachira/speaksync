"use client";

import React from "react";
import styles from "../page.module.css";
import Head from "next/head";
import { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export default function Transcribe() {
  const [transcription, setTranscription] = useState(null);
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
    let transcription = await response.json();
    if (response.status !== 201) {
      setError(transcription.detail);
      return;
    }
    setTranscription(transcription);

    while (
      transcription.status !== "succeeded" &&
      transcription.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/transcriptions/" + transcription.id);
      transcription = await response.json();
      if (response.status !== 200) {
        setError(transcription.detail);
        return;
      }
      console.log({ transcription });
      console.log("transcription.output:", transcription.output);
      setTranscription(transcription);
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
          {transcription && (
            <div>
              {transcription.output && (
                <div className={styles.imageWrapper}>
                  <p className={transcription} />
                </div>
              )}
              <p>status: {transcription.status}</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
