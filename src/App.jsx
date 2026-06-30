import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Quiz from "./components/Quiz";
import BookingForm from "./components/BookingForm";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

function App() {
  const [presetDestination, setPresetDestination] = useState(null);

  const handleBook = (destination) => {
    setPresetDestination({ ...destination, _ts: Date.now() });
  };

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero />
        <Destinations onBook={handleBook} />
        <Quiz onBook={handleBook} />
        <BookingForm presetDestination={presetDestination} />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
