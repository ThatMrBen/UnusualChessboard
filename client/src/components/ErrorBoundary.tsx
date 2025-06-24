import { Component, ErrorInfo } from 'react';
import type { ErrorBoundaryProps } from '../types/components';

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * 错误边界组件
 * 捕获子组件中的JavaScript错误，记录错误信息，并显示降级UI
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新state，下次渲染时显示降级UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // 调用错误处理回调
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 在生产环境中，可以将错误信息发送到错误报告服务
    if (process.env.NODE_ENV === 'production') {
      // 这里可以集成错误报告服务，如Sentry
      // reportError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // 自定义错误UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="mb-6">
              <div className="text-6xl mb-4">😵</div>
              <h1 className="text-2xl font-bold text-error mb-2">
                哎呀，出错了！
              </h1>
              <p className="text-base-content opacity-70 mb-6">
                应用程序遇到了一个意外错误。请尝试刷新页面或联系支持团队。
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="btn btn-primary btn-wide"
              >
                重试
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline btn-wide"
              >
                刷新页面
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-base-content opacity-70">
                  错误详情（仅开发环境）
                </summary>
                <div className="mt-2 p-4 bg-base-200 rounded-lg text-xs font-mono overflow-auto">
                  <div className="mb-2">
                    <strong>错误信息：</strong>
                    <div className="text-error">{this.state.error.message}</div>
                  </div>
                  <div className="mb-2">
                    <strong>错误堆栈：</strong>
                    <div className="whitespace-pre-wrap">{this.state.error.stack}</div>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>组件堆栈：</strong>
                      <div className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</div>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 