import Navbar from '../components/Navbar'
import {Outlet} from 'react-router-dom'
import type {CSSProperties} from "react";
import {useExp} from '../hooks/useExp'
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "var(--primary)",
};


export default function Layout() {
  const {loading, error} = useExp();
  const color = "#7E2E84"; // plain const, no useState needed
  if (loading) return (
      <div className="spinnerOverlay">
            <MoonLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
      </div>
  );

  if (error) return (
      <div className="spinnerOverlay">  {/* same centered treatment */}
          <p>Could not connect to server</p>
      </div>
  );

  return (
      <>
          <Navbar />
          <main className="pageContainer">
              <Outlet />
          </main>
      </>
  );
}
