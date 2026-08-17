"use client";
import { useState, useEffect } from "react";

export default function FreeTextToSpeech({ text }: { text: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Browser voices load asynchronously, so fetch them when available
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    // Stop previous audio
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Pick a natural-sounding free Google/Microsoft voice if available
    const naturalVoice = voices.find(
      (v) =>
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Online")) &&
        v.lang.startsWith("en")
    );

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.rate = 1.0; // Speed
    utterance.pitch = 1.0; // Pitch

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleSpeak}
        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
      >
        {isSpeaking ? "🔊 Speaking..." : "▶️ Read Question"}
      </button>

      {isSpeaking && (
        <button
          onClick={handleStop}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          ⏹ Stop
        </button>
      )}
    </div>
  );
}