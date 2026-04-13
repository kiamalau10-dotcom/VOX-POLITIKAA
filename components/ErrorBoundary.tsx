import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Terjadi kesalahan yang tidak terduga.";
      let isFirestoreError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error && parsed.operationType) {
            isFirestoreError = true;
            errorMessage = `Firestore Error (${parsed.operationType}): ${parsed.error}`;
            if (parsed.error.includes('permission-denied')) {
              errorMessage = "Akses ditolak. Anda mungkin tidak memiliki izin untuk melihat data ini atau sesi Anda telah berakhir.";
            }
          }
        }
      } catch {
        // Not a JSON error message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-950 text-white font-sans">
          <div className="max-w-md w-full p-10 rounded-[3rem] bg-zinc-900 border border-white/10 shadow-2xl text-center">
            <div className="w-20 h-20 bg-red-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <AlertCircle size={40} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black uppercase italic mb-4 tracking-tighter">Waduh! Ada Masalah</h2>
            <p className="text-zinc-400 font-medium mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <button 
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95"
            >
              <RotateCcw size={20} /> Muat Ulang Aplikasi
            </button>
            {isFirestoreError && (
              <p className="mt-6 text-[10px] font-bold uppercase opacity-30">
                Saran: Coba login ulang jika masalah berlanjut.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
