import React from "react";
import Button from "./Button.jsx";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
          <div className="max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-xl font-semibold text-slate-950 dark:text-white">Something broke in the interface.</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Refresh the page to reset the current view.
            </p>
            <Button className="mt-5" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
