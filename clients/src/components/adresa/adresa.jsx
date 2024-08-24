import React, { useState, useEffect } from "react";
import { chisinauStreat, durlestiStreat, stauceniStreat } from "../../helpers/utility";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Adresa = ({ onChange }) => {
  const [oras, setOras] = useState("");
  const [strada, setStrada] = useState("");
  const [apartament, setApartament] = useState("");
  const [bloc, setBloc] = useState("");
  const [scara, setScara] = useState("");
  const [etaj, setEtaj] = useState("");
  const [handleStreat, setHandleStreat] = useState([]);

  useEffect(() => {
    const dataItem = { oras, strada, apartament, bloc, scara, etaj };
    onChange(dataItem);
  }, [oras, strada, apartament, bloc, scara, etaj, onChange]);

  const handleChangeOras = (event) => {
    const selectedOras = event.target.value;
    setOras(selectedOras);

    switch (selectedOras) {
      case "Chișinău":
        setHandleStreat(chisinauStreat);
        break;
      case "Durlești":
        setHandleStreat(durlestiStreat);
        break;
      case "Stăuceni":
        setHandleStreat(stauceniStreat);
        break;
      default:
        setHandleStreat([]);
    }
  };

  const handleChangeStrada = (event, value) => {
    setStrada(value); // Setează direct valoarea selectată
  };

  const handleChangeBloc = (event) => {
    setBloc(event.target.value);
  };

  const handleChangeApartament = (event) => {
    setApartament(event.target.value);
  };

  const handleChangeScara = (event) => {
    setScara(event.target.value);
  };

  const handleChangeEtajul = (event) => {
    setEtaj(event.target.value);
  };

  return (
    <div className="dataSend">
      <h3 className="adres_shop">Adresa</h3>
      <div className="dataSendContainer">
        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-standard-label">Oras</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={oras}
            onChange={handleChangeOras}
            label="Oras"
          >
            <MenuItem value={"Chișinău"}>Chișinău</MenuItem>
            <MenuItem value={"Durlești"}>Durlești</MenuItem>
            <MenuItem value={"Stăuceni"}>Stăuceni</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <Autocomplete
            onChange={handleChangeStrada}
            options={handleStreat.map((option) => option.label)}
            id="clear-on-escape"
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} label="Strada" variant="standard" />
            )}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <TextField
            id="standard-basic"
            label="Nr. Bloc"
            onChange={handleChangeBloc}
            variant="standard"
          />
        </FormControl>
      </div>

      <div className="dataSendContainer">
        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <TextField
            id="standard-basic"
            onChange={handleChangeApartament}
            label="Apartament "
            variant="standard"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <TextField
            id="standard-basic"
            onChange={handleChangeScara}
            label="Scara"
            variant="standard"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <TextField
            id="standard-basic"
            onChange={handleChangeEtajul}
            label="Etajul"
            variant="standard"
          />
        </FormControl>
      </div>
    </div>
  );
};

export default Adresa;