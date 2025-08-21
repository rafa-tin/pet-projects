export default function RenderInfo({
  info,
  profileData,
}) {
  function renderInfo() {
    if (info == "about") {
      return (
        <div className="flex flex-col gap-5 m-auto">
          <h1>
            Full Name: {profileData.name} {profileData.surname}
          </h1>
          <h2>Number: {profileData.number}</h2>
          <h2>Gender: {profileData.gender}</h2>
          <h2>Age: {profileData.age}</h2>
          <h2>Adress: {profileData.country + ", " + profileData.city} </h2>
          <h2>Tariff: {profileData.tariff}</h2>
        </div>
      );
    } else if (info == "local") {
      return (
        <div className="flex flex-col gap-5">
          <h2>Mail: {profileData.mail}</h2>
          <h2>Password: {profileData.password}</h2>
        </div>
      );
    } else {
      return <div>Chose Option</div>;
    }
  }

  return <div className="ml-[20px]">{renderInfo()}</div>;
}
