
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";

const GaAuthenticates = ({ onClick }) => {
 // const canAuthenticate = usePermission("CODE");
  const canAuthenticate = true

  return (
    <>
      {canAuthenticate && (
          <Button
            variant="contained"
            color="success"
            onClick={onClick}
            startIcon={<KeyIcon />}
            sx={{
              marginTop : '20px'
            }}
          >
            Click here to Authenticate With Google
          </Button>
      )}
    </>
  );
}

export default GaAuthenticates