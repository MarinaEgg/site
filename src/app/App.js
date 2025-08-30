import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetMeta } from "./HelmetMeta";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { logCredits } from "../utils/logCredits";
import { Home } from "../pages/Home";
import { NOGLab } from "../pages/NOGLab";
import { Learn } from "../pages/Learn";
import { Contact } from "../pages/Contact";
import { PageNotFound } from "../pages/PageNotFound";

// 🌍 Import i18n pour activer les traductions
import "../i18n/i18n";

export const App = () => {
    logCredits();
    
    return (
        <ThemeProvider>
            <CssBaseline />
            <Router>
                <HelmetMeta />
                <Routes>
                    {/* ROUTES PRINCIPALES */}
                    <Route path="/" element={<Home />} />
                    <Route path="/nog-lab" element={<NOGLab />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* ROUTES ALTERNATIVES POUR SITELINKS - Redirections vers les pages principales */}
                    
                    {/* Routes alternatives pour la plateforme principale (RAG, Agents IA) */}
                    <Route path="/platform" element={<Navigate to="/" replace />} />
                    <Route path="/agents" element={<Navigate to="/" replace />} />
                    <Route path="/orchestrator" element={<Navigate to="/" replace />} />
                    <Route path="/governance" element={<Navigate to="/" replace />} />
                    <Route path="/rag" element={<Navigate to="/" replace />} />
                    <Route path="/retrieval-augmented-generation" element={<Navigate to="/" replace />} />
                    <Route path="/generation-augmentee" element={<Navigate to="/" replace />} />
                    <Route path="/ia-contextuelle" element={<Navigate to="/" replace />} />
                    <Route path="/contextual-ai" element={<Navigate to="/" replace />} />
                    <Route path="/ai-contextuel" element={<Navigate to="/" replace />} />
                    
                    {/* Routes alternatives pour NOG Lab (Traçabilité, Explicabilité) */}
                    <Route path="/lab" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/laboratory" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/innovation" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/research" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/traceability" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/tracabilite" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/explainable-ai" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/explicabilite" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/explainability" element={<Navigate to="/nog-lab" replace />} />
                    
                    {/* Routes alternatives pour Learn (Académie, Formation) */}
                    <Route path="/formation" element={<Navigate to="/learn" replace />} />
                    <Route path="/academy" element={<Navigate to="/learn" replace />} />
                    <Route path="/training" element={<Navigate to="/learn" replace />} />
                    <Route path="/education" element={<Navigate to="/learn" replace />} />
                    <Route path="/academie" element={<Navigate to="/learn" replace />} />
                    
                    {/* Routes multilingues */}
                    <Route path="/fr" element={<Navigate to="/" replace />} />
                    <Route path="/fr/nog-lab" element={<Navigate to="/nog-lab" replace />} />
                    <Route path="/fr/learn" element={<Navigate to="/learn" replace />} />
                    <Route path="/fr/contact" element={<Navigate to="/contact" replace />} />
                    
                    {/* Route 404 - redirection vers PageNotFound */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};
