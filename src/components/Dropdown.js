import React, { useState } from "react";

export function Dropdown({
  handleTimeframeUpdate,
  initialSelect,
  choices,
  options
}) {
  const [selection, setSelection] = useState(initialSelect);
  function updates(key) {
    setSelection(key);
    handleTimeframeUpdate(key);
  }
  const dropdownList = Object.keys(choices).map(key => {
    return (
      <li className="animate" key={key} onClick={() => updates(key)}>
        {choices[key]}
      </li>
    );
  });

  return (
    <nav>
      <input id="toggleDropdown" type="checkbox" />
      <label htmlFor="toggleDropdown" className="animate">
        {options.title}: {selection}
      </label>
      <ul className="animate" id={options.ulid}>
        {dropdownList}
      </ul>
    </nav>
  );
}
