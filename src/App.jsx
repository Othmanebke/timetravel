import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Quiz from "./components/Quiz";
import BookingForm from "./components/BookingForm";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import SectionDivider from "./components/SectionDivider";

function App() {
  const [presetDestination, setPresetDestination] = useState(null);

  const handleBook = (destination) => {
    setPresetDestination({ ...destination, _ts: Date.now() });
  };

  return (
    <div className="min-h-screen bg-ink relative">
      <div className="grain-overlay" />
      <div className="vignette-overlay" />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Destinations onBook={handleBook} />
        <SectionDivider />
        <Quiz onBook={handleBook} />
        <SectionDivider />
        <BookingForm presetDestination={presetDestination} />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
