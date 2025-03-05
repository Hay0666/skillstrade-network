
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProfileView from "./pages/ProfileView";
import ExploreSkills from "./pages/ExploreSkills";
import About from "./pages/About";
import SkillMatches from "./pages/SkillMatches";
import BrowseProfiles from "./pages/BrowseProfiles";
import Subscription from "./pages/Subscription";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<ProfileView />} />
            <Route path="/explore" element={<ExploreSkills />} />
            <Route path="/about" element={<About />} />
            <Route path="/skill-matches" element={<SkillMatches />} />
            <Route path="/browse-profiles" element={<BrowseProfiles />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:conversationId" element={<Chat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
