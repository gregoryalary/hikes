// React
import PropTypes from "prop-types";

// Material UI
import Box from "@mui/material/Box";

function RandomWave({ fillColor }) {
  const random = Math.floor(Math.random() * 3); // 0, 1, 2

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        zIndex: 999,
        width: "100%",
        transform: "scaleY(.15) translateY(75px)",
        transformOrigin: "bottom",
      }}
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill={fillColor}
        d={
          {
            0: "M0,64L26.7,90.7C53.3,117,107,171,160,176C213.3,181,267,139,320,128C373.3,117,427,139,480,160C533.3,181,587,203,640,197.3C693.3,192,747,160,800,133.3C853.3,107,907,85,960,74.7C1013.3,64,1067,64,1120,101.3C1173.3,139,1227,213,1280,208C1333.3,203,1387,117,1413,74.7L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z",
            1: "M0,64L26.7,101.3C53.3,139,107,213,160,224C213.3,235,267,181,320,165.3C373.3,149,427,171,480,181.3C533.3,192,587,192,640,186.7C693.3,181,747,171,800,181.3C853.3,192,907,224,960,213.3C1013.3,203,1067,149,1120,112C1173.3,75,1227,53,1280,69.3C1333.3,85,1387,139,1413,165.3L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z",
            2: "M0,128L26.7,144C53.3,160,107,192,160,176C213.3,160,267,96,320,106.7C373.3,117,427,203,480,234.7C533.3,267,587,245,640,202.7C693.3,160,747,96,800,112C853.3,128,907,224,960,229.3C1013.3,235,1067,149,1120,144C1173.3,139,1227,213,1280,208C1333.3,203,1387,117,1413,74.7L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z",
          }[random]
        }
      />
    </Box>
  );
}

RandomWave.propTypes = {
  fillColor: PropTypes.string.isRequired,
};

export default RandomWave;
