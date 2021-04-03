import { Waypoint, Icon } from "zent";
import * as React from "react";

function JJWayPoint() {
  const [msg, setMsg] = React.useState("");
  const setEnterMsg = React.useCallback(() => setMsg("Waypoint 进入屏幕"), []);
  const setLeaveMsg = React.useCallback(() => setMsg("Waypoint 离开屏幕"), []);

  return (
    <>
    {msg}
    <div className="waypoint-demo-basic">
      <div className="waypoint-demo-basic__scrollable-parent">
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <div className="waypoint-demo-basic__waypoint-line" />
        <Waypoint onEnter={setEnterMsg} onLeave={setLeaveMsg} />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
      </div>
    </div>
    </>
  );
}

function Spacer() {
  return (
    <div className="waypoint-demo-basic__spacer">
      <Icon type="youzan" />
    </div>
  );
}

export default JJWayPoint
