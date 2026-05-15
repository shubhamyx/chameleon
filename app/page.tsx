"use client";
import React from "react";
import { useRouter } from 'next/navigation';



export default function Home() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0f", color: "white", fontFamily: "sans-serif" }}>
      {/* NAVBAR */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
          <div style={{ width: 32, height: 32, background: "#c8f04a", borderRadius: "50%" }} />
          Chameleon
        </div>
        <button 
            onClick={()=> router.push('/app')}
            style={{ padding: "8px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer" }}>
          Sign in
        </button>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
          Turn YouTube videos into newsletters in your voice
        </h1>
        <p style={{ marginTop: 16, color: "rgba(255,255,255,0.7)", maxWidth: 600, marginInline: "auto" }}>
          Paste any YouTube link and generate a clean, engaging newsletter that sounds just like you.
        </p>
            <button 
                onClick={() => router.push('/app')}
                style={{ marginTop: 24, padding: "12px 24px", background: "#c8f04a", color: "black", border: "none", cursor: "pointer" }}>
                Get Started Free
            </button>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "60px 20px", maxWidth: 1000, margin: "auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 40 }}>How it works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          <div style={{ padding: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3>1. Paste YouTube URL</h3>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>
              Drop any YouTube video link to get started instantly.
            </p>
          </div>

          <div style={{ padding: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3>2. Add past newsletters</h3>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>
              Train the AI with your previous content to match your tone.
            </p>
          </div>

          <div style={{ padding: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3>3. Generate newsletter</h3>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>
              Get a polished newsletter written in your unique voice.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "60px 20px", background: "rgba(255,255,255,0.05)" }}>
        <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 40 }}>Pricing</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, maxWidth: 800, margin: "auto" }}>
          <div style={{ padding: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3>Free</h3>
            <p style={{ fontSize: 24, fontWeight: "bold" }}>$0</p>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>20 newsletters / month</p>
          </div>

          <div style={{ padding: 20, background: "#c8f04a", color: "black" }}>
            <h3>Pro</h3>
            <p style={{ fontSize: 24, fontWeight: "bold" }}>$9/month</p>
            <p>Unlimited newsletters</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: 20, borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
        © Chameleon 2026
      </footer>
    </div>
  );
}
