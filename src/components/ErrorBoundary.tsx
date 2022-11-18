import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlarmFill, ExclamationTriangleFill } from "react-bootstrap-icons";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {

        if (this.state.hasError) {
            return <div className="h-[80vh] w-fill bg-gray-100 flex items-center justify-center ">
                <div className="flex flex-col space-y-10 items-center">
                    <ExclamationTriangleFill color="red" size={50} />

                    <div className="p-30">
                        <h1>An error as occured</h1>
                    </div>
                </div>

            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;




