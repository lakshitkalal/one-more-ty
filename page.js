import dynamic from "next/dynamic";
const TradingViewChart = dynamic(() => import("../components/TradingViewChart"), { ssr: false });
import ChatAI from "../components/ChatAI";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">📊 My AI Trading Website</h1>
      <TradingViewChart />
      <ChatAI />
    </div>
  );
}
