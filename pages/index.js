import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [codeInput, setCodeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(`This arduino code ${data.result.choices[0].text}`);

      console.log(data.result);

      setCodeInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Dora Izvjesce Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Input code</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="code"
            rows="30"
            placeholder="Enter arduino code..."
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{result}</p>
      </main>
    </div>
  );
}
