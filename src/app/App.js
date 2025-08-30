import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
                <Switch>
                    {/* ROUTES PRINCIPALES */}
                    <Route path="/" exact component={Home} />
                    <Route path="/nog-lab" component={NOGLab} />
                    <Route path="/learn" component={Learn} />
                    <Route path="/contact" component={Contact} />

                    {/* ROUTES ALTERNATIVES POUR SITELINKS - Redirections vers les pages principales */}

                    {/* Routes alternatives pour la plateforme principale (RAG, Agents IA) */}
                    <Route path="/platform" render={() => <Redirect to="/" />} />
                    <Route path="/agents" render={() => <Redirect to="/" />} />
                    <Route path="/orchestrator" render={() => <Redirect to="/" />} />
                    <Route path="/governance" render={() => <Redirect to="/" />} />
                    <Route path="/rag" render={() => <Redirect to="/" />} />
                    <Route path="/retrieval-augmented-generation" render={() => <Redirect to="/" />} />
                    <Route path="/generation-augmentee" render={() => <Redirect to="/" />} />
                    <Route path="/ia-contextuelle" render={() => <Redirect to="/" />} />
                    <Route path="/contextual-ai" render={() => <Redirect to="/" />} />
                    <Route path="/ai-contextuel" render={() => <Redirect to="/" />} />

                    {/* Routes alternatives pour NOG Lab (Traçabilité, Explicabilité) */}
                    <Route path="/lab" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/laboratory" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/innovation" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/research" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/traceability" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/tracabilite" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/explainable-ai" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/explicabilite" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/explainability" render={() => <Redirect to="/nog-lab" />} />

                    {/* Routes alternatives pour Learn (Académie, Formation) */}
                    <Route path="/formation" render={() => <Redirect to="/learn" />} />
                    <Route path="/academy" render={() => <Redirect to="/learn" />} />
                    <Route path="/training" render={() => <Redirect to="/learn" />} />
                    <Route path="/education" render={() => <Redirect to="/learn" />} />
                    <Route path="/academie" render={() => <Redirect to="/learn" />} />

                    {/* Routes multilingues */}
                    <Route path="/fr" render={() => <Redirect to="/" />} />
                    <Route path="/fr/nog-lab" render={() => <Redirect to="/nog-lab" />} />
                    <Route path="/fr/learn" render={() => <Redirect to="/learn" />} />
                    <Route path="/fr/contact" render={() => <Redirect to="/contact" />} />

                    {/* Route 404 - redirection vers PageNotFound */}
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};
