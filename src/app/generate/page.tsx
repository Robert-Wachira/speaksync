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
      <div className={styles.divmain}>
        <Head>
          <title>Transcribe Audios</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <h1>Transcribe your audios</h1>
          <p>
            Just upload your video or audio and Whisper API will do the rest.
            Also, you can translate your transcription to listed languages.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              Choose your video or audio{" "}
              <span className="text-xs text-neutral-500">Max: 25MB</span>
            </div>
            <input
              type="file"
              name="prompt"
              onSubmit={handleSubmit}
              accept="audio"
              max={25 * 1024 * 1024}
            />
            <div className="space-y-4">
              <div>
                Write a propmt{" "}
                <span className="text-xs text-neutral-500">
                  You can improve your transcription with a prompt.
                </span>
              </div>
              <input name="prompt" placeholder="Next.js, Typescript..." />
            </div>
            <div className="space-y-4">
              <div>
                Choose a response type{" "}
                <span className="text-xs text-neutral-500">
                  You choose SRT or VTT.
                </span>
              </div>
              {/* <Select
                onValueChange={(value) => {
                  setFileType(value as "vtt" | "srt");
                }}
                defaultValue="vtt"
                name="response_format"
              > */}
              {/* <SelectTrigger>
                  <SelectValue placeholder="Choose a response type." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vtt">VTT</SelectItem>
                  <SelectItem value="srt">SRT</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            {/* <div className="flex gap-4">
              <button type="submit">
                {!handling ? (
                  "Transcribe"
                ) : (
                  <span className="animate-pulse">Transcribing...</span>
                )}{" "}
              </button>
            </div> */}
          </form>
          {error && <div>{error}</div>}
          {prediction && (
            <div>
              {prediction.output && (
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
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
