
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cars from "./pages/Cars";
import Tricycles from "./pages/Tricycles";
import Quadricycles from "./pages/Quadricycles";
import Motorcycles from "./pages/Motorcycles";
import Motorboats from "./pages/Motorboats";
import Watercraft from "./pages/Watercraft";
import Robots from "./pages/Robots";
import Bicycles from "./pages/Bicycles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/tricycles" element={<Tricycles />} />
          <Route path="/quadricycles" element={<Quadricycles />} />
          <Route path="/motorcycles" element={<Motorcycles />} />
          <Route path="/motorboats" element={<Motorboats />} />
          <Route path="/watercraft" element={<Watercraft />} />
          <Route path="/robots" element={<Robots />} />
          <Route path="/bicycles" element={<Bicycles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;