"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/lib/data/menu";
import { activities } from "@/lib/data/activities";
import ActivityCard from "@/components/ActivityCard";
import { useAppStore } from "@/store/useAppStore";

const POLITE_PHRASES = ["I would like", "Could I have", "May I please have", "I'll have"];
const RUDE_PHRASES = ["Give me", "I want", "Get me", "Bring"];

type Tab = "menu" | "order" | "nouns";

export default function RestaurantPage() {
  const [tab, setTab] = useState<Tab>("menu");
  const [cart, setCart] = useState<string[]>([]);
  const [orderPhrase, setOrderPhrase] = useState("");
  const [orderResult, setOrderResult] = useState<string | null>(null);
  const [nounMode, setNounMode] = useState<"countable" | "uncountable" | null>(null);
  const [nounScore, setNounScore] = useState(0);
  const { addXP, student } = useAppStore();
  const [actIdx, setActIdx] = useState(0);

  const restaurantActivities = activities.filter((a) => a.type === "restaurant" && a.options && a.answer);
  const nounActivities = activities.filter((a) => a.type === "noun" && a.options && a.answer);

  const menuByCategory = {
    mains: menuItems.filter((m) => m.category === "mains"),
    drinks: menuItems.filter((m) => m.category === "drinks"),
    desserts: menuItems.filter((m) => m.category === "desserts"),
    snacks: menuItems.filter((m) => m.category === "snacks"),
  };

  const addToCart = (name: string) => {
    if (cart.length < 5) setCart((c) => [...c, name]);
  };

  const submitOrder = () => {
    if (!orderPhrase || cart.length === 0) return;
    const isPolite = POLITE_PHRASES.some((p) => orderPhrase.toLowerCase().includes(p.toLowerCase()));
    if (isPolite) {
      setOrderResult("success");
      addXP(10);
    } else {
      setOrderResult("rude");
    }
  };

  const handleNounComplete = async (correct: boolean) => {
    if (correct) { addXP(10); setNounScore((s) => s + 1); }
    setTimeout(() => setActIdx((i) => i + 1), 1800);
  };

  return (
    <div className="module-page px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">🍜 Robot Restaurant</h1>
          <p className="text-slate-400 mt-1">Learn to order politely and sort countable nouns!</p>
        </div>

        <div className="flex gap-2 mb-6">
          {(["menu", "order", "nouns"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl font-bold text-sm capitalize transition-colors ${
                tab === t ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {t === "menu" ? "📋 Menu" : t === "order" ? "🤖 Order" : "🔢 Nouns"}
            </button>
          ))}
        </div>

        {tab === "menu" && (
          <div className="space-y-6">
            {Object.entries(menuByCategory).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="font-black text-white capitalize mb-3">{cat}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {items.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => addToCart(item.name)}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card p-3 text-center hover:border-orange-500/50 transition-all"
                    >
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <p className="text-xs font-medium text-slate-200 capitalize">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.countable ? "countable" : "uncountable"}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "order" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-white mb-3">🛒 Your Order</h3>
              {cart.length === 0 ? (
                <p className="text-slate-500 text-sm">Go to Menu and add items first!</p>
              ) : (
                <div className="space-y-2">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center justify-between glass-card px-3 py-2">
                      <span className="text-sm text-slate-200 capitalize">{item}</span>
                      <button onClick={() => setCart((c) => c.filter((_, j) => j !== i))} className="text-red-400 text-xs">✕</button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <p className="text-sm text-slate-400 mb-2">💬 How will you order? (be polite!)</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {POLITE_PHRASES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setOrderPhrase(p + " " + (cart[0] ?? "noodles"))}
                      className="px-3 py-2 rounded-lg bg-emerald-900/40 border border-emerald-700/40 text-emerald-300 text-xs font-medium hover:border-emerald-500 transition-colors"
                    >
                      "{p}..."
                    </button>
                  ))}
                </div>
                <input
                  value={orderPhrase}
                  onChange={(e) => setOrderPhrase(e.target.value)}
                  placeholder="Type your order here..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={submitOrder}
                  className="mt-2 w-full py-2.5 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-400 transition-colors"
                >
                  🤖 Send Order to Robot Waiter
                </button>
              </div>

              <AnimatePresence>
                {orderResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl font-medium text-sm ${
                      orderResult === "success"
                        ? "bg-emerald-900/50 border border-emerald-600 text-emerald-300"
                        : "bg-red-900/50 border border-red-600 text-red-300"
                    }`}
                  >
                    {orderResult === "success"
                      ? "🤖 Robot Waiter: 'Of course! Your order is coming!' +10 XP 🎉"
                      : "🤖 Robot Waiter: 'Please be polite! Use: I would like / Could I have...'"
                    }
                    <button onClick={() => { setOrderResult(null); setCart([]); setOrderPhrase(""); }} className="block mt-2 text-xs underline">
                      Order again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <h3 className="font-bold text-white mb-3">💬 Ordering Practice</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={actIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {restaurantActivities[actIdx % restaurantActivities.length] && (
                    <ActivityCard
                      prompt={restaurantActivities[actIdx % restaurantActivities.length].prompt!}
                      options={restaurantActivities[actIdx % restaurantActivities.length].options!}
                      answer={restaurantActivities[actIdx % restaurantActivities.length].answer!}
                      onComplete={(c) => {
                        if (c) addXP(10);
                        setTimeout(() => setActIdx((i) => i + 1), 1800);
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {tab === "nouns" && (
          <div className="max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">🔢 Countable vs Uncountable Nouns</h3>
              <span className="text-emerald-400 font-bold">{nounScore} correct</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              <strong className="text-white">Countable</strong> nouns can be counted: a burger, two burgers.<br/>
              <strong className="text-white">Uncountable</strong> nouns cannot: some rice, some milk.
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={actIdx + 100}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {nounActivities[actIdx % nounActivities.length] && (
                  <ActivityCard
                    prompt={nounActivities[actIdx % nounActivities.length].prompt!}
                    options={nounActivities[actIdx % nounActivities.length].options!}
                    answer={nounActivities[actIdx % nounActivities.length].answer!}
                    onComplete={handleNounComplete}
                    xpReward={10}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
