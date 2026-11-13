import { Route, Switch } from "wouter";
import "./site.css";
import Index from "./pages/index";
import { NotFound } from "./pages/not-found";
import { Provider } from "./components/provider";
import { ErrorBoundary } from "./components/error-boundary";

function App() {
  return (
    <Provider>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={Index} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

