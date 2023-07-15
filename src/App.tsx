import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Dropdown, DropdownItem } from "./components/DropDown";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Dropdown label="Select a Pokemon!">
          <DropdownItem value="Pikachu">Pikachu</DropdownItem>
          <DropdownItem value="Dragonite">Dragonite</DropdownItem>
          <DropdownItem value="Lucario">Lucario</DropdownItem>
        </Dropdown>
      </div>
    </>
  );
}

export default App;
