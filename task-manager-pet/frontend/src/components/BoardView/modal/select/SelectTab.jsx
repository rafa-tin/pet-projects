import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select"; // ✅ Без фигурных скобок
import { useState } from "react";


export default function SelectTab({array}) {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {array.map((column) => (
            <MenuItem value={column.key} style={{zIndex: "1"}}>{column.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
