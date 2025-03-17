import logoImage from "../assets/logo_intranet.png";
import icono from "../assets/icon.ico";

const LogoIntranet = ({ collapsed, size }) => {
  return (
    <div >
      {collapsed || !size.lg ? (
        <img src={icono} alt="Logo" style={{
          borderRadius: '50%',
          width: '30px',
          height: '30px'
        }} />
      ) : (
        <img src={logoImage} alt="Logo" style={{ width: "100px", height: "auto" }} />
      )}
    </div>
  );
};
export default LogoIntranet;
