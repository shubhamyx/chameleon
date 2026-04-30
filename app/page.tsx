// app/page.jsx
"use client";
import { DM_Mono } from "next/font/google";
import { useState } from "react"; 
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'

const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function Home() {

const [youtubeUrl, setYoutubeUrl] = useState("");
const [newsletters, setNewsletters] = useState("");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);
const { isSignedIn, user } = useUser();



async function generate() {
  if (!youtubeUrl.trim()) {
    alert("Please enter a YouTube URL");
    return;
  }

  if (!isSignedIn) {
    alert("Please sign in to generate newsletters");
    return;
  }

  // Check usage
  const { data } = await supabase
    .from('usage')
    .select('count, plan')
    .eq('user_id', user.id)
    .single()

  if (data && data.plan === 'free' && data.count >= 20) {
    alert("You've reached your free limit of 20 newsletters. Please upgrade.");
    return;
  }

  setLoading(true);
  const res = await fetch("http://127.0.0.1:8000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ youtube_url: youtubeUrl, past_newsletters: newsletters }),
  });
  const data2 = await res.json();
  setResult(data2.result);

  // Update usage count
  await supabase.from('usage').upsert({
    user_id: user.id,
    count: (data?.count || 0) + 1,
    plan: data?.plan || 'free'
  })

  setLoading(false);
}

  return (
    <main
      className={`${mono.className} min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6`}
    >
      <div className="w-full max-w-5xl bg-[#0e0e0f] rounded-xl border border-[#1f1f22] overflow-hidden">

    <header className="flex items-center gap-3 px-5 py-4 border-b border-[#1f1f22]">
    <div className="w-6 h-6 rounded-full bg-[#c8f04a] flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-[#0e0e0f]" />
    </div>
    <span className="text-[#f0f0ee] text-sm font-medium tracking-wide">
      Chameleon
    </span>
    <span className="text-[#444] text-xs tracking-wider">
      / newsletter generator
    </span>
    <div className="ml-auto">
      {isSignedIn ? (
        <SignOutButton>
          <button className="text-xs text-[#555] hover:text-[#e8e8e4] transition-colors">
            Sign out
          </button>
        </SignOutButton>
      ) : (
        <SignInButton>
          <button className="text-xs bg-[#c8f04a] text-[#0e0e0f] px-3 py-1.5 rounded-md font-medium">
            Sign in
          </button>
        </SignInButton>
      )}
    </div>
    </header>
      

        {/* Two-panel body */}
        <div className="grid grid-cols-2 min-h-[540px]">

          {/* Left panel */}
          <div className="p-5 border-r border-[#1f1f22] flex flex-col gap-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#555] mb-2">
                YouTube URL
              </label>
              <input
                value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)}
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-[#17171a] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-[#e8e8e4] text-sm placeholder:text-[#3d3d42] focus:outline-none focus:border-[#c8f04a] transition-colors"
              />
            </div>

            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-widest text-[#555] mb-2">
                Past newsletters{" "}
                <span className="normal-case tracking-normal text-[#3a3a3f]">
                  — paste 2–3 for style matching
                </span>
              </label>
              <textarea
                rows={12}
                placeholder="Paste your previous newsletters here. Chameleon will study your voice, tone, and structure..."
                className="w-full h-[280px] bg-[#17171a] border border-[#2a2a2e] rounded-lg px-3 py-2.5 text-[#e8e8e4] text-sm placeholder:text-[#3d3d42] focus:outline-none focus:border-[#c8f04a] transition-colors resize-none"
                value={newsletters}
                onChange={(e) => setNewsletters(e.target.value)}
              />
            </div>

            <button onClick={generate} className="w-full bg-[#c8f04a] text-[#0e0e0f] rounded-lg py-3 text-sm font-medium tracking-wide hover:bg-[#d6f76a] active:scale-[0.99] transition-all cursor-pointer">
              Generate newsletter
            </button>
          </div>

          {/* Right panel */}
          <div className="p-5 bg-[#0c0c0d]">
            <label className="block text-[10px] uppercase tracking-widest text-[#444] mb-3">
              Output
            </label>
            <div className="bg-[#111113] border border-[#1f1f22] rounded-lg p-4 h-[calc(100%-28px)] text-[#e8e8e4] text-sm leading-relaxed  whitespace-pre-wrap Overflow-y-auto">
              {loading ? "Generating..." : result}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}