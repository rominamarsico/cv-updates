import TextField from "@mui/material/TextField";

type AvailabilityProps = {
  availabilityDateCallback: (value: string) => void;
  availabilityHoursCallback: (value: string) => void;
};

export function Availability({
  availabilityDateCallback,
  availabilityHoursCallback,
}: AvailabilityProps) {
  return (
    <div style={{ display: "flex" }}>
      <TextField
        label="Available from"
        variant="outlined"
        onChange={(e) => availabilityDateCallback(e.target.value)}
      />
      <TextField
        label="Hours per week"
        variant="outlined"
        onChange={(e) => availabilityHoursCallback(e.target.value)}
      />
    </div>
  );
}
