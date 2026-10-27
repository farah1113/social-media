interface AuthRobotProps {
  mode: "login" | "register";
}

export default function AuthRobot({ mode }: AuthRobotProps) {
  return (
    <div className={`robot robot--${mode}`}>
      <div className="robot__antenna" />

      <div className="robot__head">
        <span className="robot__eye robot__eye--left" />
        <span className="robot__eye robot__eye--right" />
      </div>

      <div className="robot__body">
        <div className="robot__badge">F</div>
      </div>

      <div className="robot__arm robot__arm--left" />
      <div className="robot__arm robot__arm--right" />

      <div className="robot__leg robot__leg--left" />
      <div className="robot__leg robot__leg--right" />
    </div>
  );
}