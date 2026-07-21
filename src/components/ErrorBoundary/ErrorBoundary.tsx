import { Component, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-6"
          style={{
            background:
              'linear-gradient(135deg, #0a1128 0%, #1e3a8a 50%, #0a1128 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <Heart
              className="w-10 h-10 text-lila-400/40 mx-auto mb-6"
              fill="currentColor"
              strokeWidth={0}
            />
            <h2 className="text-xl font-light text-white/70 mb-3">
              Algo salió mal
            </h2>
            <p className="text-sm text-white/40 font-light mb-8 leading-relaxed">
              No te preocupes, a veces las cosas se complican. Intenta recargar
              la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="glass rounded-full px-6 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              Recargar
            </button>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
