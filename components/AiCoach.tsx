import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { QUOTES_PROMPT } from '../constants';
import { Sparkles, RefreshCw, Quote } from 'lucide-react';

export const AiCoach: React.FC = () => {
  const [quote, setQuote] = useState<string>("載入今日會考戰鬥格言...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(false);
    try {
      // Fixed: Use process.env.API_KEY directly as per guidelines, removing import.meta.env to fix TS error
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: QUOTES_PROMPT,
      });
      
      const text = response.text;
      if (text) {
        setQuote(text.trim());
      }
    } catch (e) {
      console.error("Error fetching quote:", e);
      setError(true);
      setQuote("休息是為了走更長遠的路。保持專注，你做得到的！");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Sparkles size={120} className="text-amber-500" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-amber-800 font-bold">
            <Sparkles size={20} />
            <span>AI 陪考教練</span>
          </div>
          <button 
            onClick={fetchAdvice}
            disabled={loading}
            className="p-2 text-amber-600 hover:bg-amber-100 rounded-full transition-colors disabled:opacity-50"
            title="取得新建議"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="flex gap-4">
            <Quote size={32} className="text-amber-300 flex-shrink-0 -mt-1 transform scale-x-[-1]" />
            <p className="text-lg text-slate-700 font-medium leading-relaxed italic">
              {quote}
            </p>
        </div>
      </div>
    </div>
  );
};
