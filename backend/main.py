from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
import re

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGroq(
    model="llama-3.3-70b-versatile"
)

prompt =ChatPromptTemplate.from_template("""
Here are my past newsletters for style reference:
{past_newsletters}

Here is the YouTube transcript:
{transcript}

Write a newsletter in my exact style.
Return format:
SUBJECT: <subject line>
BODY: <newsletter body>
""")

parser = StrOutputParser()

chain = prompt | llm | StrOutputParser()

def get_video_id(url):
    patterns = [
        r'v=([a-zA-Z0-9_-]{11})',
        r'youtu\.be/([a-zA-Z0-9_-]{11})',
        r'embed/([a-zA-Z0-9_-]{11})'
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


class GenerateRequest(BaseModel):
    youtube_url: str
    past_newsletters: str
    

@app.post("/generate")
def generate(request: GenerateRequest):
    # 1. get transcript (you already have this code)
    # 2. build prompt using transcript + past_newsletters
    # 3. call groq
    # 4. return subject + body
    try:
        video_id = get_video_id(request.youtube_url)
        if not video_id:
            return {"error": "Invalid YouTube URL. Please check and try again."}
        
        ytt = YouTubeTranscriptApi()
        transcript_list = ytt.fetch(video_id)
        transcript = " ".join([t.text for t in transcript_list])
        
        if len(transcript) > 12000:
            transcript = transcript[:12000]
        
        summary = chain.invoke({
            "past_newsletters": request.past_newsletters
        , "transcript": transcript})    
        return {"result": summary}
    except Exception as e:
        return {"error": f"Error: {str(e)}\nMake sure the video has subtitles/captions enabled."}







