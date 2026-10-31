import { Component, type ReactNode } from 'react'

interface State { hasError: boolean }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(err: unknown) { console.error(err) }
  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center', background: '#1e0f0a', color: '#fff4e2', fontFamily: 'system-ui' }}>
        <div>
          <h1 style={{ fontSize: 32, marginBottom: 12 }}>Pizzeria El Chocolate</h1>
          <p style={{ marginBottom: 16 }}>Something went wrong. Please call us at <a href="tel:+12399469006" style={{ color: '#f2b33d' }}>(239) 946-9006</a>.</p>
          <a href="/" style={{ color: '#f2b33d' }}>Reload</a>
        </div>
      </div>
    )
  }
}
