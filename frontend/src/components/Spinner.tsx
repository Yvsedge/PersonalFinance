import type {CSSProperties} from "react";
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "var(--primary)",
};

export default function Spinner() {
    const color = "#7E2E84";
    return (
        <>
            <div className="spinnerOverlay">
                <MoonLoader
                color={color}
                loading={true}
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
            </div>
        </>
    );
}
