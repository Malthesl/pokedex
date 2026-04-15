import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Pokedex } from "./Pokedex.tsx";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Layout } from "./Layout.tsx";
import { About } from "./About.tsx";
import { PokemonInfo } from "./PokemonInfo.tsx";

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Pokedex />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/pokemon/:name",
        element: <PokemonInfo />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
