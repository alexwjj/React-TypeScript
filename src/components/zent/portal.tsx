import { Portal, Button } from "zent";
import * as React from "react";

function JJPortal() {
  const [bodyPortalVisible, setBodyPortalVisible] = React.useState(false);
  const showBodyPortal = () => setBodyPortalVisible(true);
  const hideBodyPortal = () => setBodyPortalVisible(false);
  return (
    <div className="zent-doc-portal-container">
      <Button onClick={showBodyPortal}>添加带遮罩的Portal到body</Button>
      <Portal
        visible={bodyPortalVisible}
        onClose={hideBodyPortal}
        className="layer"
        style={{ background: "rgba(0, 0, 0, 0.2)" }}
        useLayerForClickAway
        closeOnClickOutside
        closeOnESC
        blockPageScroll
      >
        <div
          className="zent-doc-portal-content"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate3d(-50%, -50%, 0)",
            border: "1px solid #d3d3d3",
            borderRadius: "3px",
            padding: "50px",
            background: "white",
          }}
        >
          默认插入到body最后，并设置为拥有遮罩用于关闭
        </div>
      </Portal>
    </div>
  );
}

export default JJPortal;
