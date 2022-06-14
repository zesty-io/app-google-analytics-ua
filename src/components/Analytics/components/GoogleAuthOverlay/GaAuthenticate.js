import { Fragment } from "react";

// import {usePermission} from "../../../../shell/hooks/use-permissions"

import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import styles from "./GoogleAuthOverlay.less";

const GaAuthenticates = ({ onClick }) => {
 // const canAuthenticate = usePermission("CODE");
  const canAuthenticate = false

  return (
    <Fragment>
      {canAuthenticate && (
        <div className={styles.buttonHolder}>
          <Button
            variant="contained"
            color="success"
            onClick={onClick}
            startIcon={<KeyIcon />}
          >
            Click here to Authenticate With Google
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default GaAuthenticates