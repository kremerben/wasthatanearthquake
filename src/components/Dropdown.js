import React, { useState } from "react";

export function Dropdown({ initialSelect, choices, options }) {
  const [selection, setSelection] = useState(initialSelect);
  const dropdownList = Object.keys(choices).map(key => {
    return (
      <li className="animate" key={key} onClick={() => setSelection(key)}>
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
      <ul className="animate" id={options.ulid}>{dropdownList}</ul>
    </nav>
  );
}
