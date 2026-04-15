import { NavLink, Outlet } from "react-router";

export function Layout ()
{
  return (
    <>
      <h1>Malthes seje pokemon-dex-ting</h1>
      <p style={{color: "red"}}>ADVARSEL: Pas på dine højtalere</p>
      <div className="nav">
        <NavLink to="/">Pokédeks</NavLink>
        <NavLink to="/about">Om</NavLink>
      </div>
      <Outlet />
    </>
  );
}