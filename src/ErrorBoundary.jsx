import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Something broke
          </h1>
          <p style={{ marginBottom: "1rem" }}>
            An error stopped the page from working. The details below are
            what to send back for a fix.
          </p>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "1rem",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              fontSize: "0.85rem",
            }}
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
