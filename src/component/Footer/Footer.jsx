import "./Footer.css";
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <>
      <Typography className="text-sm leading-6 text-slate-700 p-0">
        &#169; 2023 <span className="font-semibold">MFH</span>, All right reserved
      </Typography>
    </>
  );
};

export default Footer;
