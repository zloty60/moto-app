import { TextField, MenuItem, makeStyles } from "@material-ui/core";

// input select overflow y scroll
const selectProps = {
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: 250,
      },
    },
  },
};

const useStyles = makeStyles(() => ({
  root: {
    textTransform: "capitalize",
  },
}));

export function InputSelect({
  options,
  name,
  value,
  onChange,
  label,
  size,
  margin,
  error,
  helperText,
}) {
  const classes = useStyles();
  return (
    <TextField
      SelectProps={selectProps}
      onChange={onChange}
      name={name}
      value={value}
      select
      fullWidth
      variant="outlined"
      size={size ? size : "medium"}
      margin={margin ? margin : "none"}
      label={label}
      error={error ? error : false}
      helperText={helperText ? helperText : ""}
    >
      {options.map((el) => (
        <MenuItem
          key={el.value}
          value={el.value}
          classes={{ root: classes.root }}
        >
          {el.txt}
        </MenuItem>
      ))}
    </TextField>
  );
}
